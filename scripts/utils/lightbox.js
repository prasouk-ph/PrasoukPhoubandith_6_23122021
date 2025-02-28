/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function openLightboxWithKeyboard(event) {
    if (event.key == "Enter") {
        openLightbox(event);
    }
}

function openLightbox(event) {
    // to prevent opening when sort menu is open
    let result = sortValue.getAttribute("aria-expanded");
    
    if (result == "true") {
        return // stop openLightbox function
    }

    
    const header = document.querySelector("header");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");

    const lightbox = document.createElement( "div" );
    lightbox.classList.add("lightbox");
    main.after(lightbox);

    const lightboxTitle = document.createElement( "h2" );
    lightboxTitle.setAttribute("aria-label", "Galerie");
    lightboxTitle.classList.add("hidden-for-at");
    lightboxTitle.textContent = "Galerie";

    const lightboxCloseButton = document.createElement( "img" );
    lightboxCloseButton.classList.add("lightbox__close");
    lightboxCloseButton.setAttribute("src", "assets/icons/redclose.svg");
    lightboxCloseButton.tabIndex = 0;

    const lightboxNextButton = document.createElement( "button" );
    lightboxNextButton.classList.add("lightbox__next");
    lightboxNextButton.textContent = String.fromCharCode(10095); // unicode for next sign

    const lightboxPreviousButton = document.createElement( "button" );
    lightboxPreviousButton.classList.add("lightbox__prev");
    lightboxPreviousButton.textContent = String.fromCharCode(10094); // unicode for previous sign

    const lightboxContainer = document.createElement( "div" );
    lightboxContainer.classList.add("lightbox__container");
    lightbox.append(lightboxTitle, lightboxCloseButton, lightboxNextButton, lightboxPreviousButton, lightboxContainer);
    let currentIndex = event.target.getAttribute("index");

    // event
    lightboxCloseButton.addEventListener("click", closeLightbox);
    lightboxNextButton.addEventListener("click", nextMedia);
    lightboxPreviousButton.addEventListener("click", previousMedia);
    document.addEventListener("keydown", lightboxNavigationWithKeyboard);

    // Appearance
    lightbox.style.display = "flex";
    lightboxCloseButton.focus();

    displayMediaInLightbox();
    

    function closeLightbox() {
        lightbox.remove();
        document.removeEventListener("keydown", lightboxNavigationWithKeyboard);

        // focus management
        currentValue.tabIndex = 0;
        optionPopularity.tabIndex = 0;
        optionDate.tabIndex = 0;
        optionTitle.tabIndex = 0;
        sortButtons.tabIndex = 0;
        logoLink.tabIndex = 0;
        contactButton.tabIndex = 0;
        allMedia.forEach(media => media.tabIndex = 0);
        mediaVideos.forEach(media => media.tabIndex = 0);
        likesCount.forEach(media => media.tabIndex = 0);
    }
    

    function nextMedia() {
        currentIndex++;

        if (currentIndex > allMedia.length - 1) {
            currentIndex = 0;
        }

        displayMediaInLightbox();
    }


    function previousMedia() {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = allMedia.length - 1;
        }

        displayMediaInLightbox();
    }


    function lightboxNavigationWithKeyboard(event) {
        switch (true) {
            case (event.key == "Escape"):
                closeLightbox();
                break
            case (event.key == "Enter" && event.target.className.includes("lightbox__close")):
                closeLightbox();
                break
            case (event.key == "ArrowLeft"):
                previousMedia();
                break
            case (event.key == "ArrowRight"):
                nextMedia();
                break
        }
    }


    function displayMediaInLightbox() {
        lightboxContainer.innerHTML = "";

        if (allMedia[currentIndex].tagName == "IMG") {
            let currentMedia = document.createElement( "img" );
            currentMedia.setAttribute("src", allMedia[currentIndex].src);
            currentMedia.setAttribute("alt", allMedia[currentIndex].alt);
            lightboxContainer.appendChild(currentMedia);
        }

        if (allMedia[currentIndex].tagName == "VIDEO") {
            let currentMedia = document.createElement( "video" );
            currentMedia.setAttribute("src", allMedia[currentIndex].firstChild.src);
            currentMedia.setAttribute("type", "video/mp4");
            currentMedia.setAttribute("controls", "controls");
            currentMedia.setAttribute("title", allMedia[currentIndex].firstChild.src);
            lightboxContainer.appendChild(currentMedia);
        }

        const mediaTitle = document.createElement( "h2" );
        const titleAttr = allMedia[currentIndex].getAttribute("title")
        mediaTitle.classList.add("media-title");
        mediaTitle.textContent = titleAttr;
        lightboxContainer.appendChild(mediaTitle);

        // focus management
        currentValue.tabIndex = -1;
        options.tabIndex = -1;
        optionPopularity.tabIndex = -1;
        optionDate.tabIndex = -1;
        optionTitle.tabIndex = -1;
        sortButtons.tabIndex = -1;
        logoLink.tabIndex = -1;
        contactButton.tabIndex = -1;
        allMedia.forEach(media => media.tabIndex = -1);
        mediaVideos.forEach(media => media.tabIndex = -1);
        likesCount.forEach(media => media.tabIndex = -1);
    }
}