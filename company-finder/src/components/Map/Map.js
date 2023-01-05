import React from 'react';
import PropTypes from 'prop-types';
import styles from './Map.module.css';
import { MapContainer, TileLayer, useMap , Marker , Popup} from 'react-leaflet';

const Map = () => (
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
    
    <MapContainer center={[47.218371,-1.553621]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[47.218371,-1.553621]}>
      <Popup>
        Emplacement d'entreprise
      </Popup>
    </Marker>
  </MapContainer>
  </div>)
;

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
