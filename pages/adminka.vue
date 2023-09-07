<template>
  <div class="kinopoisk">
    <h1>Форма добавления фильма</h1>
    <form class="form" @submit.prevent="fetchMovieData">
      <div class="form__input">
        <label>
          <input
            v-model="nameMovie"
            class="input"
            type="text"
            placeholder="Название фильма"
          />
        </label>
      </div>
      <p v-if="exists">Фильм уже существует в базе данных</p>
      <b-button type="submit">Сохранить</b-button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import getPersonsByProfession from "~/utils/getPersonsByProfession";
import convertToString from "~/utils/convertToString";
import { ref } from "vue";


let nameMovie = "";
const exists = ref(false);


const fetchMovieData = async () => {
  const config = useRuntimeConfig();
  const apiKey = config.public.kinopoiskToken;
  const searchUrl = `https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=1&query=${nameMovie}`;
  try {
    const searchResponse = await axios.get(searchUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Accept: "application/json",
      },
    });

    // console.log("searchResponse", searchResponse.data);

    const movieId = searchResponse.data.docs[0].id;
    const movieUrl = `https://api.kinopoisk.dev/v1.3/movie/${movieId}`;
    const movieResponse = await axios.get(movieUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Accept: "application/json",
      },
    });

    console.log("movieResponse", movieResponse.data);

    const response = await axios.get("http://127.0.0.1:8000/get-csrf-token/");
    const token = response.data.csrfToken;

    const movieData = movieResponse.data;

    // Проверка, существует ли фильм в базе данных
    const existingMovieResponse = await axios.get(
      `http://127.0.0.1:8000/api/v1/movies/${movieData.id}/`
    );
    if (existingMovieResponse.status === 200) {
      console.log("Фильм уже существует в базе данных");
      exists.value = true;
      return; // Выход, если фильм уже существует
    }
    const actors = getPersonsByProfession(movieData.persons, "actor", 6);
    const composers = getPersonsByProfession(movieData.persons, "composer", 1);
    const producers = getPersonsByProfession(movieData.persons, "produser", 1);
    const directors = getPersonsByProfession(movieData.persons, "director", 1);

    const personsList = [actors, composers, producers, directors];

    const dbData = {
      id: movieData.id,
      kinopoisk_id: movieData.id,
      name: movieData.name || movieData.names[0].name,
      age_rating: movieData.ageRating,
      countries: convertToString(movieData.countries),
      description: movieData.description,
      movie_length: movieData.movieLength,
      budget: movieData.budget,
      genres: convertToString(movieData.genres),
      persons: personsList,
      premiere: movieData.premiere,
      rating: movieData.rating,
      year: movieData.year,
      videos: movieData.videos,
      votes: movieData.votes,
      poster: movieData.poster,
    };

    console.log("dbData", dbData);
    await axios.post("http://127.0.0.1:8000/api/v1/movies/create/", dbData, {
      headers: {
        "X-CSRFToken": token,
      },
    });

    nameMovie = "";
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="sass" scoped>
.kinopoisk
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  padding: 32px
  & h1
    margin-bottom: 12px
  & p
    position: relative
    bottom: 8px
.popup
  width :100vw
  height: 100vh
  position: fixed
  left: 0
  top: 0
  &:after
    content: ''
    position: absolute
    background: $orange
    left: 0
    top: 0
    right: 0
    bottom: 0
    z-index: 8
    opacity: .5
  &__content
    max-width: 1280px
    width: 100%
    max-height: 880px
    height: 100%
    background: $dark
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 9
    display: flex
    justify-content: space-between
  &__close
    padding: 12px
    position: absolute
    right: 12px
    top: 12px
    @include hover
      cursor: pointer
      color: $orange
.form
  &__input
    width: 300px
    margin-bottom: 32px
  & .input
    width: 100%
    // border 2px solid $white
    border: none
    border-radius: 48px
    color: $white
    @include font-size-lh(16, 26)
    font-weight: 500
    text-transform: uppercase
    height: 48px
    padding: 0 24px
    outline: none
    background: $dark
    @include transition(all)
    &:focus
      border-color: $white
    @include hover
      &::placeholder
        color: rgba($white, 1)
        @include transition(all)
    &::placeholder
      color: rgba($white, 0.5)
      @include transition(all)
</style>
