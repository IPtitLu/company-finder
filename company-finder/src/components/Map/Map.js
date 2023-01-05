import React from 'react';
import PropTypes from 'prop-types';
import styles from './Map.module.css';
import { MapContainer, TileLayer, useMap , Marker , Popup} from 'react-leaflet';


const Map = () => (
  <div>
    <MapContainer center={[47.218371,-1.553621]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[47.218371,-1.553621]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  </div>)
;

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
