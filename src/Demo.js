import React from "react";
import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer,Marker,Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
                    <MapContainer style={{ width: "100vw", height: "100vh" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <table>
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