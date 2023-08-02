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

const storeLocationData = (coords) => {
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

};

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
    const { add, deleteRecord, getByID } = useIndexedDB('gps');
    const [km, Skm] = useState(0.0);

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
        storeLocationData(coords);
        add({ latitude: coords.latitude, longitude: coords.longitude }).then(
            event0 => {
              console.log('ID Generated[???]: ', event0);
              if (event0.target.result - 2 >= 0) {
                deleteRecord(event0.target.result - 2).then(event1 => {
                  console.log('Deleted!');
                  getById(event0.target.result - 1).then(gpsLAST => {
                    Skm(calculateDistance(gpsLAST.latitude, gpsLAST.longitude, coords.latitude, coords.longitude));
                  });
                });
              } else {
                console.log("NOTHINGTODEL!");
              }
            },
            error => {
              console.log(error);
            }
          );          
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
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <div>Getting the location data&hellip; </div>;
    }

};

export default Demo;
