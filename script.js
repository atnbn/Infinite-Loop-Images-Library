const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let isInitialLoad = true;

// Unsplash APi
let imageCount = 5;
const apiKey = '18LFEwRpVUZEdsjd3DrBw0HmuT5dQTzrMI7ITLNxcTM';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount};`
// Check if all images were loaded


// Updates the Url imageCount 
function updateAPI(imageCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount};`
}

function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}



// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }


}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        })
        // Event Listener , check when each is finished loading
        img.addEventListener('load', imageLoaded())
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplashapi
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPI(30)
            isInitialLoad = false;
        }
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// onload
getPhotos(); 