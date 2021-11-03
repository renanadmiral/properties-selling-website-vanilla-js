import { getCities } from "../httpRequests.js"
import { cleanCityName } from "../../index.js";

export let citiesPerStateDictionary;

//this function consults all Brazilian cities and list them by their states
export const mountCitiesPerStateDictionary = async () => {
    try {
        const allCitiesArr = await getCities();

        citiesPerStateDictionary = allCitiesArr.reduce((acc, city) => {
            const cityName = cleanCityName(city.nome);
            const state = (city.microrregiao.mesorregiao.UF.sigla).toLowerCase();

            !acc[state] && (acc = { ...acc, [state]: [] });
            acc[state].push(cityName);

            return {...acc};
        }, {})
    } catch (error) {
        alert("IBGE's API is not working, try again later. " + error);
    }
}
