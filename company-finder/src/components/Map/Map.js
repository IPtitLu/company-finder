import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import styles from './Map.module.css';
import { MapContainer, TileLayer, useMap , Marker , Popup} from 'react-leaflet';


const API_KEY = 'pk.8058fdcba7b155ff616c489eebe4dd20';

function Map() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLocation() {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&countrycodes=FR&postalcode=${postalCode}&format=json`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setLocation(data[0]);
      }
    }

    fetchLocation();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!location) {
    return <p>Loading...</p>;
  }

  return (
    <div className='mx-auto max-w-screen-xl flex justify-center items-center flex-wrap'>
    <div className='w-2/4 flex justify-center items-center mb-20'>
      <form className='flex flex-wrap column justify-center flex-col'>
        <label className='text-center mb-4'>
          Entre un code postal ci-dessous
        </label>
        <input className='border border-2 rounded-md p-2' type="text"/>
        <input className='bg-blur-2xl' type="submit" value="Rechercher" />
      </form>

    </div>
    
    <MapContainer center={[location.lat, location.lon]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lon]}>
      <Popup>
        Emplacement d'entreprise
      </Popup>
      </Marker>
    </MapContainer>
  </div>);
}

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
