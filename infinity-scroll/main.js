// Unsplash API
const photoCount = 5;
const apiKey = 'H1-rqDFT8AzLUhESN0B9zEcf0oQYLMU1oVJAPiGq0A4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Get photos from unsplash api
async function getAndDisplayPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    //console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //handle error
  }
}

//Helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    //like a map
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  //   console.log('image loaded');
  imagesLoaded++;
  ready = imagesLoaded === totalImages;
  loader.hidden = ready;
}

// Display photos
// create elements for links and photos, add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    //create link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //create image for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded);

    //put img inside link element, then put them in image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  //   console.log('scrolled');
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getAndDisplayPhotos();
  }
});

//on load
getAndDisplayPhotos();
