import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import styles from './Map.module.css';
import { MapContainer, TileLayer, useMap , Marker , Popup} from 'react-leaflet';
import FormCity from '../FormCity/FormCity';



const API_KEY = 'pk.8058fdcba7b155ff616c489eebe4dd20';
const postalCode = 44000;

function Map() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const mapRef = useRef(null);


  const MyIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-glyphs/512/pin.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  const handleUpdateBusinesses = (newBusinesses) => {
    setBusinesses(newBusinesses);
  }

 
 

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
  }, [businesses.results]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof businesses.results !== 'undefined') {
    // myProperty a été définie et a donc été reçue
    setLocation({
      ...location,
      lat:  businesses.results[0].siege.latitude,
      lon: businesses.results[0].siege.longitude

    });
  };
    }, 1000);

    return () => clearInterval(interval);
  }, [location, businesses.results]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!location) {
    return <p>Loading...</p>;
  }

 
  
  

  return (
    <div className='mx-auto max-w-screen-xl flex justify-center items-center flex-wrap'>
    <FormCity businesses={businesses} onUpdateBusinesses={handleUpdateBusinesses}/>
    <MapContainer center={[location.lat, location.lon]} zoom={12} ref={location}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lon]}>
      </Marker>
      {typeof businesses.results !== 'undefined' ? ( businesses.results.slice(0,10).map(element => (
        <Marker key={element.nom_complet} position={[element.siege.latitude, element.siege.longitude]} icon={MyIcon}>
          <Popup>{element.nom_complet}</Popup>
        </Marker>
      ))) : (<div>Loading..</div>)
    };
      
      
    </MapContainer>

      
  </div>
  );
}

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
