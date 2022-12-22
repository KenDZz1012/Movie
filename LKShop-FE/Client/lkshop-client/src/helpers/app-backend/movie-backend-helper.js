import { get, post, put, del, postWithFormData, putWithFormData } from '../api_helper'
import { spreadSearchQuery } from '../utilities'

const BASE_API_URL = `${process.env.REACT_APP_MOVIE_ENDPOINT}`
const BASE_SITE_API_URL = `${process.env.REACT_APP_SITE_ENDPOINT}`
const getListMovie = filter => {
    let q = spreadSearchQuery(filter)
    console.log(q)
    return get(`${BASE_API_URL}/GetAllMovie/?${q}`)
}

const searchMovie = filter => {
    let q = spreadSearchQuery(filter)
    console.log(process.env.REACT_APP_SITE_ENDPOINT)
    return get(`${BASE_SITE_API_URL}/GetMovieByMovieName/?${q}`)
}

const searchMovieByCategory = filter => {
    let q = spreadSearchQuery(filter)
    console.log(process.env.REACT_APP_SITE_ENDPOINT)
    return get(`${BASE_SITE_API_URL}/GetMovieByCategory/?${q}`)
}

const getMovieById = id => {
    return get(`${BASE_API_URL}/GetMovieById/${id}`)
}

const createMovie = userCreate => {
    return postWithFormData(`${BASE_API_URL}/CreateMovie`, userCreate)
}

const updateMovie = (UserId, userUpdate) => {
    return putWithFormData(`${BASE_API_URL}/UpdateMovie/${UserId}`, userUpdate)
}

const deleteMovie = id => {
    return del(`${BASE_API_URL}/DeleteMovie/${id}`)
}
export {
    getListMovie,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovie,
    searchMovieByCategory
}