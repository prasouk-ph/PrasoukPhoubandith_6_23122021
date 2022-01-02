let totalLikes = 0;

async function init() {
    // Récupère les datas des photographes        
    const currentPhotographerId = location.search.slice(4); // location search allows to get the url parameter, slice allow to keep only the id number
    const { photographers } = await getPhotographers(); // collect every key/value from the key photographers
    const { media } = await getMedia(); // collect every key/value from the key media
    // filter allows to collect every key and value from every array including key: photograph.id with value corresponding to the const photographerId
    // or
    // filter allows to collect all data from array when the array has the same photographId as the current photographer id
    const currentPhotographerData = photographers.filter((photograph) => photograph.id == currentPhotographerId) ;
    const { name } = currentPhotographerData[0];
    const photographerMediaData = media.filter((media) => media.photographerId == currentPhotographerId); 
    displayPhotographerData(currentPhotographerData[0]);
    displayMedia(photographerMediaData, name);
};

async function getPhotographers() {
    // import data from json
    const response = await fetch('data/photographers.json'); 
    // convert json to js object
    const result = await response.json();
    return ({
        // .photographers allow to select every data from key photographers of json file
        photographers: [...result.photographers]
    }) 
}

async function getMedia() {
    // import data from json
    const response = await fetch('data/photographers.json'); 
    // convert json to js object
    const result = await response.json();
    return ({
        // .media allow to select data from key media of json file
        media: [...result.media]
    }) 
}

async function displayPhotographerData(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const photographHeader = document.querySelector(".photograph-header");
    const photographData = document.createElement( 'div' );
    photographData.classList.add("photograph-data")
    photographHeader.appendChild(photographData);
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const modalLabel = document.querySelector(".modal_label");
    modalLabel.innerHTML = `Contactez-moi <br>${name}`;
    photographData.appendChild(h2);
    const h3 = document.createElement( 'h3' );
    h3.textContent = `${city}, ${country}`;
    photographData.appendChild(h3);
    const slogan = document.createElement( 'p' );
    slogan.textContent = tagline;
    photographData.appendChild(slogan);
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture)
    img.classList.add("photograph-portrait")
    photographHeader.appendChild(img);
    const main = document.querySelector("main");
    const extraBox = document.createElement( 'div' );
    extraBox.classList.add("photographer-extras");
    main.appendChild(extraBox);
    const p = document.createElement( 'p' );
    p.textContent = `${price}€ / jour`;
    extraBox.appendChild(p);
};

async function displayMedia(data, key) {
    // to generate new section tag
    const gallery = document.querySelector(".section-gallery");
    const cardContainer = document.createElement( 'div' );
    cardContainer.classList.add("card-container");
    gallery.appendChild(cardContainer);
    const icon = document.createElement( 'i' );
    icon.classList.add("fas", "fa-heart", "heart-icon", "total-likes");
    icon.setAttribute("count", totalLikes);
    document.querySelector(".photographer-extras").appendChild(icon);

    data.forEach(media => {
        const { date, image, likes, title, video } = media;
        // to create a new media card
        const card = document.createElement( 'div' );
        card.classList.add("card");
        cardContainer.appendChild(card);

        // to display media ressource
        const picture = `assets/media/${key}/${image}`; 
        const preview = `assets/media/${key}/${video}`;
        switch (true) { 
            case (media.hasOwnProperty('image')): // when (data has key 'image') is true
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            card.appendChild(img);
            break;
            case (media.hasOwnProperty('video')): // when (data has key 'video') is true
            const cardVideo = document.createElement( 'video' );
            // cardVideo.setAttribute("controls", "controls"); // without controls can't be played
            const sourceVideo = document.createElement( 'source' );
            sourceVideo.setAttribute("src", preview);
            sourceVideo.setAttribute("type", 'video/mp4');
            cardVideo.appendChild(sourceVideo);
            card.appendChild(cardVideo);        
            break;
        };

        // to display card content
        const cardContent = document.createElement( 'div' );
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        cardContent.appendChild(h2);
        const icon = document.createElement( 'i' );
        icon.classList.add("fas", "fa-heart", "heart-icon");
        icon.setAttribute("count", likes);
        totalLikes += (parseInt(icon.getAttribute("count")));
        document.querySelector(".total-likes").setAttribute("count", totalLikes);
        icon.addEventListener("click", addLike);
        cardContent.appendChild(icon);

        function addLike() {
            let likesCount = icon.getAttribute("count");
            let newCount = parseInt(likesCount) + 1;
            totalLikes ++;
            icon.setAttribute("count", newCount);
            document.querySelector(".total-likes").setAttribute("count", totalLikes);
        }
    });
};

init();

function lightbox() {

}

function sortMedia() {

}