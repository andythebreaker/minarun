import React, { useState, useMemo } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import './css/map_gps.css'
import { homepageUrl } from './home_url_change.js';
import localForage from 'localforage';
import { useIndexedDB, AccessDB } from 'react-indexed-db-hook';
import { calculateDistance } from './calculateDistance.js';


const customIcon = L.icon({
    iconUrl: `${homepageUrl}/logo192.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: `${homepageUrl}/logo192.png`,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
});

const innerBounds = [
    [49.505, -2.09],
    [53.505, 2.09],
]
const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
]

/*const storeLocationData = (coords) => {
    const timestamp = new Date();
    localForage.getItem('locationData').then((data) => {
        const locationData = data || [];
        const { latitude, longitude, altitude, heading, speed } = coords;
        const locationObj = { latitude, longitude, altitude, heading, speed };
        locationData.push({
            coords: locationObj,
            timestamp,
        });
        localForage.setItem('locationData', locationData);
    });
    localForage.getItem('locationLast').then((data_locationLast) => {localForage.getItem('distDiff').then((data_distDiff) => {
        const { latitude, longitude, altitude, heading, speed } = coords;
        const dist_diff = (data_locationLast)?calculateDistance(data_locationLast.coords.latitude,data_locationLast.coords.longitude,latitude,longitude) : 0;
        const locationObj = { latitude, longitude, altitude, heading, speed };
        localForage.setItem('locationLast', {
            coords: locationObj,
            timestamp,
        });
        localForage.setItem('distDiff', (data_distDiff||0)+dist_diff);
    });});
};*/
//const findNewest = async () => {//gpt
    // Usage example:
// You can call the findNewest function to get the newest 2 records like this:
//findNewest().then((newestRecords) => {
//    console.log(newestRecords);
//});
    //const data = await localForage.getItem('locationData');
    //if (!data || data.length === 0) {
    //    return []; // Return an empty array if no data is available or the data array is empty
    //}

    // Sort the locationData array in descending order based on timestamps
    //data.sort((a, b) => b.timestamp - a.timestamp);

    // Return the two most recent records (or less if there are fewer than 2 records)
    //return data.slice(0, 2);
//};




const redColor = { color: 'red' }
const whiteColor = { color: 'white' }
function SetBoundsRectangles() {
    const [bounds, setBounds] = useState(outerBounds)
    const map = useMap()

    const innerHandlers = useMemo(
        () => ({
            click() {
                setBounds(innerBounds)
                map.fitBounds(innerBounds)
            },
        }),
        [map],
    )
    const outerHandlers = useMemo(
        () => ({
            click() {
                setBounds(outerBounds)
                map.fitBounds(outerBounds)
            },
        }),
        [map],
    )

    return (
        <>
            <Rectangle
                bounds={outerBounds}
                eventHandlers={outerHandlers}
                pathOptions={bounds === outerBounds ? redColor : whiteColor}
            />
            <Rectangle
                bounds={innerBounds}
                eventHandlers={innerHandlers}
                pathOptions={bounds === innerBounds ? redColor : whiteColor}
            />
        </>
    )
}
const Demo = (props) => {
    // const { add, deleteRecord, getByID } = useIndexedDB('gps');
    //const { add_km, deleteRecord, getByID } = useIndexedDB('gps');
     const [km, set_km] = useState(0);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: props.myValue,
                maximumAge: 0,
                timeout: Infinity,
            },
            userDecisionTimeout: 5000,
            watchPosition: props.watchPositionCtrl,
            suppressLocationOnMount: false,
            //geolocationProvider: navigator.geolocation,
            isOptimisticGeolocationEnabled: true,
        });

    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    } else if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    } else if (coords) {
        /*storeLocationData(coords);*/const timestamp = new Date();
    localForage.getItem('locationData').then((data) => {
        const locationData = data || [];
        const { latitude, longitude, altitude, heading, speed } = coords;
        const locationObj = { latitude, longitude, altitude, heading, speed };
        locationData.push({
            coords: locationObj,
            timestamp,
        });
        localForage.setItem('locationData', locationData);
    });
    localForage.getItem('locationLast').then((data_locationLast) => {//localForage.getItem('distDiff').then((data_distDiff) => {
        const { latitude, longitude, altitude, heading, speed } = coords;
        const dist_diff = (data_locationLast)?calculateDistance(data_locationLast.coords.latitude,data_locationLast.coords.longitude,latitude,longitude) : 0;
        const locationObj = { latitude, longitude, altitude, heading, speed };
        localForage.setItem('locationLast', {
            coords: locationObj,
            timestamp,
        });
        /*localForage.setItem('distDiff', */set_km((/*data_distDiff*/km||0)+dist_diff);
    });//});
// try {
//             add({ time:new Date(),latitude: coords.latitude, longitude: coords.longitude })
//                 .then(event0 => {
//                     //console.log('ID Generated:', event0);
//                     if (event0 - 2 >= 0) {
//                         getByID(event0 - 1)
//                             .then(gpsLAST => {
//                                 deleteRecord(event0 - 2)
//                                     .then(event1 => {
//                                         //console.log('Deleted!', event1);
//                                         //console.log("fuck", gpsLAST);
//                                         var tmp_skm = calculateDistance(gpsLAST.latitude, gpsLAST.longitude, coords.latitude, coords.longitude);
//                                         var txx=(km.length === 0)?JSON.stringify({t:gpsLAST.time,k:tmp_skm}):JSON.stringify({t:gpsLAST.time,k:JSON.parse(km).k+tmp_skm});
//                                         console.log('km...', txx);
//                                         Skm(txx);
//                                     })
//                                     .catch(error => {
//                                         console.error('Error in getByID:', error);
//                                     });
//                             })
//                             .catch(error => {
//                                 console.error('Error in deleteRecord:', error);
//                             });
//                     } else {
//                         console.log('NOTHINGTODEL!');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error in add:', error);
/*------------------------------------
        add({ latitude: coords.latitude, longitude: coords.longitude }).then(
            event0 => {
              console.log('ID Generated[issue]: ', event0);
              if (event0 - 2 >= 0) {
                deleteRecord(event0 - 2).then(event1 => {
                  console.log('Deleted!');
              if(getById(event0 - 1)){    getById(event0 - 1).then(gpsLAST => {
                    Skm(calculateDistance(gpsLAST.latitude, gpsLAST.longitude, coords.latitude, coords.longitude));
                  });    }else{console.log("getById(event0 - 1) is null !!! (https://github.com/andythebreaker/minarun/edit/main/src/Demo.js@row118)");}
------------------------------main*/
        //         });
        // } catch (error) {
        //     console.error('Unhandled error:', error);
        // }

        return (
            <div>
                <MapContainer style={{ width: "100vw", height: "100vh" }} center={[coords.latitude, coords.longitude]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[coords.latitude, coords.longitude]} icon={customIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <SetBoundsRectangles />
                </MapContainer>
                <table className="ld-float">
                    <tbody>
                        <tr>
                            <td>km</td>
                            <td>{km}</td>
                        </tr>
                        <tr><td>-</td></tr><tr><td>-</td></tr>
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <div>Getting the location data&hellip; </div>;
    }

};

export default Demo;
