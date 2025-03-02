import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import pathIcon from '../img/error.svg';

export function showMessage(message1 = '', message2 = '') {
  if (message2) {
    iziToast.error({
      message: message2,
      position: 'topRight',
      maxWidth: '432px',
      iconUrl: pathIcon,
      iconColor: '#ffffff',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      messageSize: '16px',
      messageLineHeight: '24px',
    });
  }
  if (message1 && !message2) {
    iziToast.error({
      message: message1,
      position: 'topRight',
      maxWidth: '432px',
      iconUrl: pathIcon,
      iconColor: '#ffffff',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      messageSize: '16px',
      messageLineHeight: '24px',
    });
  }
}

export function addMarkup(images) {
  const generalEl = document.querySelector('.gallery-list');

  if (images.length === 0) {
    showMessage(
      `Sorry, there are no images matching your search query. Please try again!`
    );
    return;
  }

  const galleryList = images.map(image => {
    const galleryItems = document.createElement('li');
    galleryItems.classList.add('gallery-item');

    const galleryLinks = document.createElement('a');
    galleryLinks.classList.add('gallery-link');
    galleryLinks.href = image.largeImageURL;

    const galleryImg = document.createElement('img');
    galleryImg.classList.add('gallery-image');
    galleryImg.src = image.webformatURL;
    galleryImg.alt = image.tags;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    const infoItems = [
      { label: 'Likes', value: image.likes },
      { label: 'Views', value: image.views },
      { label: 'Comments', value: image.comments },
      { label: 'Downloads', value: image.downloads },
    ];

    infoItems.forEach(item => {
      const infoParagraph = document.createElement('p');
      infoParagraph.classList.add('par');
      infoParagraph.textContent = item.label;

      const infoValue = document.createElement('span');
      infoValue.classList.add('sub-par');
      infoValue.textContent = item.value;

      infoParagraph.append(infoValue);
      infoContainer.append(infoParagraph);
    });

    galleryItems.append(infoContainer);

    galleryItems.append(galleryLinks);

    galleryLinks.append(galleryImg);
    return galleryItems;
  });
  generalEl.append(...galleryList);

  const modal = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  modal.refresh();
}

export function showLoader(loader) {
  loader.classList.remove('hidden');
}

export function closeLoader(loader) {
  loader.classList.add('hidden');
}

export function showLoadBtn(loadBtn) {
  loadBtn.classList.remove('hidden');
}

export function hideLoadBtn(loadBtn) {
  loadBtn.classList.add('hidden');
}

export function scrollToGalleryItem() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
