import PropTypes from 'prop-types';
import styles from './FormCity.module.css';
import React, { useState, useEffect } from 'react';


function FormCity(props) {
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const { businesses, onUpdateBusinesses } = props;
  async function fetchPostalCode(cityNameParam) {
    // Définissez l'URL de l'API et le nom de ville à rechercher
    const apiUrl = 'https://geo.api.gouv.fr/communes';
    const cityName = cityNameParam;

    // Envoyez une requête GET à l'API en incluant le nom de ville dans l'URL de la requête
    const response = await fetch(`${apiUrl}?nom=${cityName}`);

    // Vérifiez si la requête a réussi (code HTTP 200)
    if (response.ok) {
      // La requête a réussi, traitez les données de réponse
      const cities = await response.json();
      
      if(cities!=undefined) {
      setPostalCode(cities[0].codesPostaux[0]);
      console.log(cities[0].codesPostaux[0])}
    } else {
      // La requête a échoué, affichez l'erreur
      console.error(`Erreur API: ${response.status}`);
    }
  }

  async function fetchBusinesses(postalCode) {
    // Définissez l'URL de l'API et le code postal à rechercher
    const apiUrl = 'https://recherche-entreprises.api.gouv.fr/search';
    const searchPostalCode = postalCode;
  
    // Envoyez une requête GET à l'API en incluant le code postal dans l'URL de la requête
    const response = await fetch(`${apiUrl}?code_postal=${searchPostalCode}`);
  
    // Vérifiez si la requête a réussi (code HTTP 200)
    if (response.ok) {
      // La requête a réussi, traitez les données de réponse
      const businesses = await response.json();
      onUpdateBusinesses(businesses);
      console.log(businesses.results[0].siege.latitude)
      return businesses;
    } else {
      // La requête a échoué, affichez l'erreur
      console.error(`Erreur API: ${response.status}`);
    }
  }

  



  const allFetch = async(city) => {
    
    await fetchPostalCode(city);
    await fetchBusinesses(postalCode);
  }
  

  

 return(
  <div className='w-2/4 flex justify-center items-center mb-20'>
      <form className='flex flex-wrap column justify-center flex-col' >
        <label className='text-center mb-4'>
          Entre un code postal ci-dessous
        </label>
        <input className='border border-2 rounded-md p-2' type="text" id='cityId' />
        <input className='bg-blur-2xl' type="submit" value="Rechercher" onClick={e => {
    e.preventDefault();
    const cityInput = document.getElementById('cityId');
    setCity(cityInput.value);
    allFetch(city);
  }}  />
      </form>
      <div>
      Code postal: {postalCode} <br/> Ville : {city} <br/> Nombre d'entreprises trouvées: {businesses.total_pages}
    </div>

    </div>
);
}
FormCity.propTypes = {};

FormCity.defaultProps = {};

export default FormCity;
