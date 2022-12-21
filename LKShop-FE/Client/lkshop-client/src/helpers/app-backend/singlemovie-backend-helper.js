import { get, post, put, del, postWithFormData, putWithFormData } from '../api_helper'
import { spreadSearchQuery } from '../utilities' 
const BASE_API_URL = `${process.env.REACT_APP_SINGLE_MOVIE_ENDPOINT}`

const getListSingleMovie = filter => {
    let q = spreadSearchQuery(filter)
    console.log(q)
    return get(`${BASE_API_URL}/getListSingleMovie/?${q}`)
}

const getSingleMovieById = id => {
    return get(`${BASE_API_URL}/GetSingleMovieById/${id}`)
}

const createSingleMovie = userCreate => {
    return postWithFormData(`${BASE_API_URL}/createSingleMovie`, userCreate)
}

const updateSingleMovie = (UserId, userUpdate) => {
    return putWithFormData(`${BASE_API_URL}/updateSingleMovie/${UserId}`, userUpdate)
}

const deleteSingleMovie = id => {
    return del(`${BASE_API_URL}/deleteSingleMovie/${id}`)
}


//video

const getVideo = () => {
    return get(`${BASE_API_URL}/GetVideo`)
}
export {
    getListSingleMovie,
    getSingleMovieById,
    createSingleMovie,
    updateSingleMovie,
    deleteSingleMovie,
    getVideo
}