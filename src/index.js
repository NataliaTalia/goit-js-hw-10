import './css/styles.css';

import {fetchCountries} from './fetchCountries.js';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// 1. Create a mark up and add it to DOM???
// 2. Add event listener to input field


const searchRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;




searchRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))


function onInput (e) {
    const searchQuery = e.target.value.trim();

    if(searchQuery.length === 0) {
        return;
    }

    fetchCountries(searchQuery)
    .then (countries => {
        renderMarkup(countries)
    })
    .catch(error => console.error(error));

}


function renderMarkup(countries) {
  console.log(countries)

  if(countries.length === 0 || countries.message) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    listRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
    


  } else if (countries.length > 2 && countries.length < 10) {

    //i have to write function here for addilg lists
    
    addingListOfCountries(countries);
    countryInfoRef.innerHTML = '';
    
    

  } else if (countries.length > 10) {

    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    listRef.innerHTML = '';
    countryInfoRef.innerHTML = '';

  } else {
    listRef.innerHTML = '';
    addingMatchingCountry (countries);
    console.log(listRef)
    
    
    //i have to write a function that will add a mark up of a one necessary country
  }


  }


  function addingListOfCountries (countries) {
    const markup = countries.map(({name: {official}, flags: {svg}}) => {
        return `
        <li class="list-item"> <img src="${svg}" width ="40px", height="20px">
        <span class="country-name">${official}</span></li>
        `
    }).join('');
    listRef.insertAdjacentHTML('beforeend', markup)
    countryInfoRef.innerHTML = '';
  }


  function addingMatchingCountry (countries) {
    const markup = countries.map(({name: {official}, flags: {svg}, capital, population, languages}) => {
        const lang = Object.values(languages).join(", ");
        
        
        return `
        <h1 class="country-item"> <img src="${svg}" width ="80px", height="40px">
        <span class="country-name">${official}</span></h1>
        <p class="country-item">Capital:${capital}</p>
        <p class="country-item">Population:${population}</p>
        <p class="country-item">Languages:${lang}</p>
        `
    }).join('')
    countryInfoRef.insertAdjacentHTML('afterbegin', markup)

   
    
  }