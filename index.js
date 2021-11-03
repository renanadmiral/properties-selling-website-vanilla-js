import { mountCitiesPerStateDictionary } from "./modules/dictionaries/citiesPerStateDictionary.js";
import { runListeners } from "./modules/eventHandlers.js"

//static DOM elements extracted from home page
export default {
    propertiesCardList: document.querySelector('#properties-card-list'),
    searchInputContainer: document.querySelector('#search-input-container'),
    searchInput: document.querySelector('#search-input'),
    resultFoundBox: document.querySelector('#result-found-box'),
}

//global function
export const cleanCityName = (dirtyCityName) => {
    return dirtyCityName
        .trim()
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll("'", '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    ;
}

//this mounts all Brazilian cities per state at the program start
mountCitiesPerStateDictionary();
runListeners();
