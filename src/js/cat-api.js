import Notiflix from "notiflix";
import Select from "slim-select";
import { chooseBreed } from "../index";
import { loader } from "../index";
const key = "live_466QNpsfYyYFqj8eFi1djkL2AYXcmoFP461jZDFnQh8DW5fEId9WwC7lRV6d9HfA"

export function fetchBreeds() {
    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${key}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.status);
        }
        return resp.json();})
        
    .catch(error => console.log(error));
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');

};
export function getInformation() {
    loader.style.display = 'block';
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${chooseBreed}&api_key=${key}`).then(resp => {
        if (!resp.ok) {
           throw new Error(resp.status);
        }
        return resp.json();
    }).catch(error => console.log(error));
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}




