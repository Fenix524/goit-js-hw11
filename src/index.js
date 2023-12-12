import { fatchImagesByTextQuery } from "./js/serverQquery";
import { showError, showMassage } from "./js/massages";

const refs = {
  searchForm: document.querySelector('.search-form'),  
  gallery: document.querySelector('.gallery'),  
  loadButton: document.querySelector('.load-button')  
}

// // Обробники подій --->

refs.searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();  
  loadImages(e.currentTarget, true)  
})

refs.loadButton.addEventListener("click", () => {
  loadImages(refs.searchForm) 
})

// Функції --->

async function loadImages(form, newQuery = false) {
  const searchQuery = form.elements.searchQuery.value;
  const data = await fatchImagesByTextQuery(searchQuery, newQuery);

  if(!data.totalHits){
    showError("Sorry, there are no images matching your search query. Please try again.")
    return
  }
  if(newQuery){
    refs.gallery.innerHTML = '';
  }

  refs.gallery.insertAdjacentHTML("beforeend", markupGaleri(data.hits)) 

  if (document.querySelectorAll('.photo-card').length >= data.totalHits) {
    // refs.loadButton.style.display = 'none';
    showMassage("We're sorry, but you've reached the end of search results.")
  } else {
    // refs.loadButton.style.display = 'none';
  }

}

function markupGaleri(data){
  return data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `
      <div class="photo-card">
        <img
          class="photo-card__img"
          src="${webformatURL}"
          alt="${tags}"
          data-url="${largeImageURL}"
          loading="lazy"
          height="100"
        />
        <ul class="photo-card__info info">
          <li class="info__item">
            <p class="info__title">Likes</p>
            <p class="info__desc">${likes}</p>
          </li>
          <li class="info__item">
            <p class="info__title">Views</p>
            <p class="info__desc">${views}</p>
          </li>
          <li class="info__item">
            <p class="info__title">Comments</p>
            <p class="info__desc">${comments}</p>
          </li>
          <li class="info__item">
            <p class="info__title">Downloads</p>
            <p class="info__desc">${downloads}</p>
          </li>
        </ul>
      </div>
    `
  }).join("")
}


