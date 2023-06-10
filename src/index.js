
import Notiflix from "notiflix";
import SlimSelect from "slim-select";
import Notiflix from "notiflix";
import SlimSelect from 'slim-select';
import  { fetchBreeds, getInformation } from "./js/cat-api";
import debounce from "lodash.debounce";
const DEBOUNCE_DELAY = 300;

export const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
export const loader = document.querySelector('.loader');
loader.style.display = 'none';
const Breeds = [];
export let chooseBreed = '';

fetchBreeds()
    .then(nameId => {
        nameId.map(name => {
            Breeds.push(name);
        })
        addSelectOption(Breeds);
    })
    .catch(error => {
        console.log(error);
    }
    );
function addSelectOption() {
    select.innerHTML = `<option value="null">Choose breed</option`;
    const element = Breeds.map(el => {

        return `<option value="${el.id}">${el.name}</option>`;
    }).join('');

    select.insertAdjacentHTML('beforeend', element);
    new SlimSelect({
        select: select,})
};

function addItem(event) {
    if (event.target.value === "null") {
        catInfo.innerHTML = '';
        return;
    }
    chooseBreed = event.target.value;
    getInformation(chooseBreed)
        .then(markup)
        .catch(error => {
           console.log(error);
           Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
       }
       );
};
function markup(el) {
    loader.style.display = 'none';
    catInfo.innerHTML = `<div class="thumb">
        <img class= "cat-image" src="${el[0].url}" alt="" />
      </div>
      <div class="cat-info">
       <h2 class="name">${el[0].breeds[0].name}</h2>
        <p>${el[0].breeds[0].description}</p>
        <p class="temperament"><b>Temperament:</b>${el[0].breeds[0].temperament}</p>
         </div>`
}
select.addEventListener("change", debounce(addItem, 300));









