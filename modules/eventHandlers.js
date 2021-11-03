import elements, { cleanCityName } from '../index.js'
import { cleanInvalidInput, renderPropertiesResult, setInvalidInput } from './componentFactory.js';
import { citiesInitialsDictionary } from './dictionaries/citiesInitialsDictionary.js';
import { citiesPerStateDictionary } from './dictionaries/citiesPerStateDictionary.js';

//this allows user search cities by initials
const getCityByInitial = (searchedCity) => {
    searchedCity = cleanCityName(searchedCity);

    const cityByInitialFound = Object.entries(citiesInitialsDictionary).find(([city, initial]) => {
        return searchedCity === initial;
    });
    if (cityByInitialFound) {
        return cityByInitialFound[0];
    } else {
        return searchedCity;
    }
}

//this find states by looking for a city in the dictionary
const findState = (searchedCity) => {
    const stateFound = Object.entries(citiesPerStateDictionary).find(([state, cities]) => {
        return cities.includes(searchedCity);
    });
    if (stateFound) {
        return stateFound[0];
    } else {
        return stateFound;
    }
}

//main search event
const searchEvent = (evt) => {
    const searchedCity = getCityByInitial(evt.target.value);
    const state = findState(searchedCity);

    state ? renderPropertiesResult(state, searchedCity) : setInvalidInput();
    evt.target.value = '';
}

//this run the listeners at the app start
export const runListeners = () => {
    let {searchInput} = elements;

    searchInput = document.addEventListener('focusout', (evt) => searchEvent(evt));
    searchInput = document.addEventListener('focusin', () => cleanInvalidInput());
}
