import fetchData from './js/pixabay-api';
import {
  addMarkup,
  showLoader,
  closeLoader,
  showMessage,
  showLoadBtn,
  hideLoadBtn,
  scrollToGalleryItem,
} from './js/render-functions';

const form = document.querySelector('.input-container');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery-list');
const loadBtn = document.querySelector('.load-btn');

let currentPage = 1;
let searchQuery = '';
let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = form.elements.search.value.trim();

  if (searchQuery) {
    showLoader(loader);
    currentPage = 1;
    loadedImages = 0;
    gallery.insertAdjacentElement('beforebegin', loader);
    gallery.innerHTML = '';
    hideLoadBtn(loadBtn);

    try {
      const response = await fetchData(searchQuery, currentPage);
      const images = response.data.hits;
      totalHits = response.data.totalHits;
      form.elements.search.value = '';

      if (images.length === 0) {
        showMessage(`Sorry, no images found. Please try again!`);
        hideLoadBtn(loadBtn);
      } else {
        addMarkup(images);

        scrollToGalleryItem();

        currentPage += 1;
        loadedImages += images.length;

        if (loadedImages >= totalHits) {
          hideLoadBtn(loadBtn);
          showMessage(
            '',
            `We're sorry, but you've reached the end of search results.`
          );
        } else {
          showLoadBtn(loadBtn);
        }
      }
    } catch (error) {
      showMessage(
        'Sorry, there was an error fetching the images. Please try again!'
      );
      hideLoadBtn(loadBtn);
    } finally {
      closeLoader(loader);
    }
  } else {
    showMessage('Please enter a search query!');
  }
});

loadBtn.addEventListener('click', async e => {
  e.preventDefault();
  hideLoadBtn(loadBtn);
  showLoader(loader);
  gallery.insertAdjacentElement('afterend', loader);

  try {
    const response = await fetchData(searchQuery, currentPage);
    const images = response.data.hits;
    loadedImages += images.length;

    if (images.length > 0) {
      addMarkup(images);
      currentPage += 1;

      scrollToGalleryItem();
    }

    if (loadedImages >= totalHits) {
      hideLoadBtn(loadBtn);
      showMessage(
        '',
        `We're sorry, but you've reached the end of search results.`
      );
    } else {
      showLoadBtn(loadBtn);
    }
  } catch (error) {
    showMessage(
      'Sorry, there was an error fetching more images. Please try again!'
    );
  } finally {
    closeLoader(loader);
    if (loadedImages < totalHits) {
      showLoadBtn(loadBtn); // Показуємо кнопку, якщо ще є зображення
    }
  }
});
