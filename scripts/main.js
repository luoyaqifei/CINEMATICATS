import OmdbAPI from "./omdb-api.js";
import CatApi from "./cat-api.js";
import { CatAPIKey, OmdbAPIKey, topTitles } from "./consts.js";
import { createElementAndAppendToParent } from "./utils.js";

let catApi;
let omdbApi;

document.addEventListener("DOMContentLoaded", async (e) => {
    catApi = new CatApi(CatAPIKey);
    omdbApi = new OmdbAPI(OmdbAPIKey);
    document
        .getElementById("generate-btn")
        .addEventListener("click", async (e) => {
           generate()
        });
    document
        .getElementById("generate-btn-1")
        .addEventListener("click", async (e) => {
           generate()
        });

    // document.getElementById("share").addEventListener("click", () => {
        
    // });
    
});

async function generate() {
    const catImageEl = document.getElementById("cat-image");
    await replaceRandomCat(catImageEl);
    const movieCardEl = document.getElementById("movie-card");
    await generateMovieCard(movieCardEl);
}

async function replaceRandomCat(catImageEl) {
    catImageEl.src = await catApi.getRandomCatImgUrl();
    catImageEl.alt = "a new cat or multiple new cats?";
}

async function generateMovieCard(cardEl) {
    const movieObj = await retrieveRandomMovie();
    /**
     * {"Title":"The Godfather",
     * "Year":"1972",
     * "Rated":"R",
     * "Released":"24 Mar 1972",
     * "Runtime":"175 min",
     * "Genre":"Crime, Drama",
     * "Director":"Francis Ford Coppola",
     * "Writer":"Mario Puzo, Francis Ford Coppola",
     * "Actors":"Marlon Brando, Al Pacino, James Caan",
     * "Plot":"Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son, Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
     * "Language":"English, Italian, Latin",
     * "Country":"United States",
     * "Awards":"Won 3 Oscars. 31 wins & 31 nominations total",
     * "Poster":"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
     * "Ratings":[{"Source":"Internet Movie Database","Value":"9.2/10"},{"Source":"Rotten Tomatoes","Value":"97%"},{"Source":"Metacritic","Value":"100/100"}],"Metascore":"100","imdbRating":"9.2","imdbVotes":"2,031,306","imdbID":"tt0068646","Type":"movie","DVD":"N/A","BoxOffice":"$136,381,073","Production":"N/A","Website":"N/A","Response":"True"}
     */
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Ratings } = movieObj;
    const imgEl = document.getElementById("movie-poster");
    imgEl.src = Poster;
    const titleEl = document.getElementById("movie-title");
    titleEl.innerText = Title;
    const descriptionEl = document.getElementById("movie-description");
    descriptionEl.innerText = Plot;
    // createElementAndAppendToParent("p", Plot, null, descriptionEl);
    const ratingEl = document.getElementById("movie-rating");
    ratingEl.innerText = (Ratings?.[0]?.Value ?? 0);
    // const tags = createTags({Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Language, Country, Awards, Ratings});
    // const tagsEl = createElementAndAppendToParent("div", null, "card__tags", cardEl);
    // tags.forEach(tag => {
    //     const tagEl = createElementAndAppendToParent("div", null, "card__tag", tagsEl);
    //     createElementAndAppendToParent("span", tag.label + ": ", "card__tag-label", tagEl);
    //     createElementAndAppendToParent("span", tag.value, "card__tag-value", tagEl);
    // })
}

async function retrieveRandomMovie() {
    const randomMovieIndex = Math.round(Math.random() * 100);
    const randomMovieId = topTitles[randomMovieIndex];
    const movieObj = await omdbApi.getMovieById(randomMovieId);
    return movieObj;
}

function createTags(properties) {
    return Object.keys(properties).flatMap(key => {
        if(key === "Ratings") {
            return properties[key].map(({Source, Value}) => ({
                label: Source,
                value: Value
            }));
        }
        else {
            return {
                label: key,
                value: properties[key]
            }
        }
    })
}