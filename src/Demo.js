import React, { useState, useMemo } from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import './css/map_gps.css'

const customIcon = L.icon({
    iconUrl: "./minarun/logo192.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: "./minarun/logo192.png",
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
const Demo = () => {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    } else if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    } else if (coords) {
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
                            <td>latitude</td>
                            <td>{coords.latitude}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{coords.longitude}</td>
                        </tr>
                        <tr>
                            <td>altitude</td>
                            <td>{coords.altitude}</td>
                        </tr>
                        <tr>
                            <td>heading</td>
                            <td>{coords.heading}</td>
                        </tr>
                        <tr>
                            <td>speed</td>
                            <td>{coords.speed}</td>
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