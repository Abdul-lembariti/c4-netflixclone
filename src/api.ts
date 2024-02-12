const API_KEY = 'da8c03a9442b17327dad86e101aceeef'
const BASE_PATH = 'https://api.themoviedb.org/3/'

export type TMDBRESULTS = {
  backdrop_path: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  name: string
  original_name: string
  first_air_date: string
  vote_average: number
  popularity: number
  original_language: string
  vote_count: number
  origin_country: string[]
}
export interface TMDBdata {
  dates: { maximum: string; minimum: string }
  page: number
  results: TMDBRESULTS[]
  total_pages: number
  total_results: number
}
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getPopularTV() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getTopRatedTV() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getAiringTodayTV() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getLatestTV() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function searchForMovies(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=true`
  ).then((response) => response.json())
}

export function searchForTvs(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&page=1&query=${keyword}&include_adult=true`
  ).then((response) => response.json())
}
