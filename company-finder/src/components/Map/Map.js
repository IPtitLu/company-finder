import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import CompanyList from "../CompanyList/CompanyList";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Map({ token }) {
    const [error, setError] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [cityName, setCityName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [position, setPosition] = useState({
        lat: 98.699739,
        lng: 52.338097,
    });
    const [map, setmap] = useState(null);

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        async function fetchCityName() {
            if (cityName.length > 0) {
                // const response = await fetch(
                //     `http://localhost:3000/cities/${cityName}`
                // );
                // const data = await response.json();

                // if (data.error) {
                //     setError(data.error);
                // } else {
                //     setPostalCode(data.results.postalCode);
                // }
                const response = await fetch(
                    `http://localhost:3000/cities/${cityName}`,
                    {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setPostalCode(data.postalCode);
                }
            }
        }

        fetchCityName();
    }, [cityName]);

    useEffect(() => {
        async function fetchBusinesses() {
            if (postalCode !== "") {
                const response = await fetch(
                    `https://recherche-entreprises.api.gouv.fr/search?code_postal=${postalCode}`
                );
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    setBusinesses(data.results);
                }
            }
        }

        fetchBusinesses();
    }, [postalCode]);

    useEffect(() => {
        if (businesses.length > 0) {
            setPosition({
                lat: businesses[0].matching_etablissements[0].latitude,
                lng: businesses[0].matching_etablissements[0].longitude,
            });
        }
    }, [businesses]);

    if (error) {
        return <p>{error}</p>;
    }

    const Recenter = ({ lat, lng }) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng]);
        return null;
    };

    return (
        <div className="mx-auto max-w-screen-xl flex justify-center items-center flex-wrap">
            <div className="w-2/4 flex justify-center items-center mb-20">
                <form className="flex flex-wrap column justify-center flex-col">
                    <label className="text-center mb-4">
                        Entre un code postal ci-dessous
                    </label>
                    <input
                        className="border border-2 rounded-md p-2"
                        type="text"
                        id="cityId"
                    />
                    <input
                        className="w-full h-max px-4 py-3 bg-black cursor-pointer text-white mt-8 mb-5 font-semibold drop-shadow-lg hover:bg-white hover:text-black ease-in-out duration-200 login-btn"
                        type="submit"
                        value="Rechercher"
                        onClick={(e) => {
                            e.preventDefault();
                            const cityInput = document.getElementById("cityId");
                            setCityName(cityInput.value);
                        }}
                    />
                </form>
            </div>
            {businesses.length > 0 ? (
                <MapContainer
                    center={position}
                    zoom={14}
                    className="mb-10"
                    whenCreated={setmap}
                >
                    <Recenter lat={position.lat} lng={position.lng} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {businesses.length > 0 ? (
                        businesses.map((business) => (
                            <Marker
                                key={business.nom_complet}
                                position={[
                                    business.matching_etablissements[0]
                                        .latitude,
                                    business.matching_etablissements[0]
                                        .longitude,
                                ]}
                            >
                                <Popup>{business.nom_complet}</Popup>
                            </Marker>
                        ))
                    ) : (
                        <div>Loading..</div>
                    )}
                    {};
                </MapContainer>
            ) : (
                <MapContainer
                    center={[47.218371, -1.553621]}
                    zoom={12}
                    className=" mb-10"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            )}
            <CompanyList businessesArray={businesses} />
        </div>
    );
}

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
