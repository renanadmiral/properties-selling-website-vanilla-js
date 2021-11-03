//http request to IBGE's API
export const getCities = async () => {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

//properties API
export const getProperties = async (state, city) => {
    let responseStatus;
    try {
        const response = await fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`);
        if (!response.ok) {
            throw response.status;
        } else {
            return await response.json();
        }
    } catch (error) {
        throw error;
    }
}
