import { getProperties } from "./httpRequests.js";
import elements from "../index.js";
import { amenitiesDictionary } from "./dictionaries/amenitiesDictionary.js";

//this function renders an error message while shows the API's status error
const renderResultNotFound = (status) => {
    const {resultFoundBox} = elements;
    const resultNotFoundDiv = document.createElement('div');
    const firstH1 = document.createElement('h1');
    const secondH1 = document.createElement('h1');
    const newH2 = document.createElement('h2');
    const thirdH1 = document.createElement('h1');

    resultNotFoundDiv.setAttribute('id', 'result-not-found-box');

    firstH1.innerText = 'Oooops!';
    secondH1.innerText = 'Algo deu errado na sua busca.';
    newH2.innerText = 'Status ' + status;
    thirdH1.innerText = 'Por favor, tente novamente.';

    resultNotFoundDiv.append(firstH1, secondH1, newH2, thirdH1);
    resultFoundBox.append(resultNotFoundDiv);
}

//thousands dot separators for numbers in general
const applyThousandsSeparators = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//this function renders info about the result found on the search
const renderResultFoundBox = (totalCount, city, state) => {
    const {resultFoundBox} = elements;
    state = state.toUpperCase();

    const newh1 = document.createElement('h1');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    newh1.setAttribute('id', 'result-title');
    newSpan.classList.add('bold');
    newBtn.setAttribute('id', 'cancel-searched-city');

    newSpan.innerText = totalCount;
    newh1.append(newSpan, ` Imóveis à venda em ${city} - ${state}`);

    newBtn.innerText = city + ' - ' + state +' x';
    newBtn.addEventListener('click', () => {
        cleanPreviousRender();
        cleanInvalidInput();
    });

    resultFoundBox.append(newh1, newBtn);
}

//this function generates all properties cards
const renderPropertiesCards = (propertiesArr, state) => {
    const {propertiesCardList} = elements;
    state = state.toUpperCase();

    propertiesArr.forEach((property) => {
        const newLi = document.createElement('li');
        newLi.classList.add('property-card');
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('property-img');
        const img = document.createElement('img');
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description-box');
        const h3Adress = document.createElement('h3');
        const h2Name = document.createElement('h2');
        const ulSpaces = document.createElement('ul');
        ulSpaces.classList.add('spaces-list');
        const h4Price = document.createElement('h4');
        const
            usableArea = document.createElement('li'),
            bedrooms = document.createElement('li'),
            bathrooms = document.createElement('li'),
            parkingSpaces = document.createElement('li')
        ;
        const
            spanUsableArea = document.createElement('span'),
            spanBedrooms = document.createElement('span'),
            spanBathrooms = document.createElement('span'),
            spanParkingSpaces = document.createElement('span')
        ;
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('card-btns-box', 'hide');
        const phoneBtn = document.createElement('button');
        const messageBtn = document.createElement('button');

        //property image
        img.src = property.medias[0].url;
        imgDiv.append(img);

        //property adress
        const adress = property.link.data;
        h3Adress.innerText =
            `${adress.street}, ${adress.streetNumber} - ${adress.neighborhood}, ${adress.city} - ${state}`
        ;

        h2Name.innerText = property.link.name;

        //This renders property spaces list
        const listing = property.listing;

        spanUsableArea.innerText = listing.usableAreas[0];
        usableArea.append(spanUsableArea, ' m²');
        spanBedrooms.innerText = listing.bedrooms[0];
        bedrooms.append(spanBedrooms, ' Quarto(s)');
        spanBathrooms.innerText = listing.bathrooms[0];
        bathrooms.append(spanBathrooms, ' Banheiro(s)');
        spanParkingSpaces.innerText = listing.parkingSpaces[0];
        parkingSpaces.append(spanParkingSpaces, ' Vaga(s)');
        ulSpaces.append(usableArea, bedrooms, bathrooms, parkingSpaces);

        descriptionDiv.append(h3Adress, h2Name, ulSpaces);

        //property amenities list
        if (listing.amenities[0]) {
            const amenitiesList = document.createElement('ul');
            amenitiesList.classList.add('amenities-list');

            listing.amenities.forEach((amenity) => {
                const liAmenity = document.createElement('li');
                const translatedAmenity = Object.entries(amenitiesDictionary).find(([translation, amenityListed]) => {
                    return amenity === amenityListed;
                });
                translatedAmenity ? liAmenity.innerText = translatedAmenity[0] : liAmenity.innerText = amenity;
                amenitiesList.append(liAmenity);
            });

            descriptionDiv.append(amenitiesList);
        }

        //property price
        h4Price.innerText = `R$ ${applyThousandsSeparators(listing.pricingInfos[0].price)}`;

        descriptionDiv.append(h4Price);

        //property Condo fee
        if (listing.pricingInfos[0].monthlyCondoFee) {
            const h5CondoPrice = document.createElement('h5');
            const h5Span = document.createElement('span');
            h5Span.classList.add('bold');

            h5Span.innerText = 'R$ ' + listing.pricingInfos[0].monthlyCondoFee;

            h5CondoPrice.append('Condomínio: ', h5Span);
            descriptionDiv.append(h5CondoPrice);
        }

        //contact buttons
        phoneBtn.innerText= 'Telefone';
        messageBtn.innerText = 'Enviar Mensagem';
        buttonsDiv.append(phoneBtn, messageBtn);
        descriptionDiv.append(buttonsDiv);


        newLi.append(imgDiv, descriptionDiv);
        propertiesCardList.append(newLi);
    });
}

//this function cleans previous render before a new search
const cleanPreviousRender = () => {
    const {resultFoundBox, propertiesCardList} = elements;

    while (resultFoundBox.firstChild) {
        resultFoundBox.removeChild(resultFoundBox.firstChild);
    }

    while (propertiesCardList.firstChild) {
        propertiesCardList.removeChild(propertiesCardList.firstChild);
    }
}

//this function cleans invalid input before a new search
export const cleanInvalidInput = () => {
    const {searchInput} = elements;
    const alertP = document.querySelector('#search-input-container p');

    searchInput.classList.remove('invalid-input-border');
    searchInput.classList.remove('invalid-input-text');
    alertP && alertP.remove();
}

//this function marks search bar as a invalid input
export const setInvalidInput = () => {
    const {searchInputContainer, searchInput} = elements;

    searchInput.classList.add('invalid-input-border');
    searchInput.classList.add('invalid-input-text');
    const alertP = document.createElement('p');
    alertP.innerText = '* Cidade Inválida';
    alertP.classList.add('invalid-input-text');
    searchInputContainer.append(alertP);
}

//this function renders all results from the search
export const renderPropertiesResult = async (state, city) => {
    try {
        cleanPreviousRender();

        const properties = await getProperties(state, city);
        const wholeCityName = properties.search.result.listings[0].link.data.city;

        renderResultFoundBox(properties.search.totalCount, wholeCityName, state);

        renderPropertiesCards(properties.search.result.listings, state);
    } catch (error) {
        renderResultNotFound(error);
    }
}
