    async function getPhotographers() {
        const response = await fetch('./data/photographers.json'); // import data from json
        const result = await response.json(); // convert json to js object
        console.log(result);
        return ({
            photographers: [...result.photographers]}) // .photographers allow to select data from key photographers of json file
    }
      
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes        
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();