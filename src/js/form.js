import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchPictures } from './fetchPictures';

const MSG =
  'Sorry, there are no images matching your search query. Please try again.';
const END_MSG = `We're sorry, but you've reached the end of search results.`;
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
let serchQuery = '';
let page = 1;
let hits = 40;
let totalhits = 1;

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onClick);

async function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  serchQuery = refs.form.search.value.trim();
  refs.loadBtn.classList.add('is-hidden');
  removeGallery();

  if (serchQuery === '') {
    return;
  }

  const imgSet = await fetchPictures(serchQuery, page);
  totalhits = imgSet.data.totalHits;
  if (imgSet.data.hits.length === 0) {
    Notiflix.Notify.info(MSG);
  }

  createGallery(imgSet);
  refs.loadBtn.classList.remove('is-hidden');

  refs.form.reset();
}

async function onClick() {
  page += 1;

  const newImgSet = await fetchPictures(serchQuery, page);
  createGallery(newImgSet);

  if (hits >= totalhits) {
    refs.loadBtn.classList.add('is-hidden');
    Notiflix.Notify.info(END_MSG);
    return;
  }
  hits = hits * 2;
}
// ___________________________________________________________________________________

function createGallery(data) {
  const mapedData = data.data.hits
    .map(function (picture) {
      return `<div class="photo-card">
  <img src="${picture.largeImageURL}" alt="${picture.tags}" loading="lazy" width="200px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${picture.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${picture.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${picture.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${picture.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', mapedData);
}
function removeGallery() {
  refs.gallery.innerHTML = '';
}
