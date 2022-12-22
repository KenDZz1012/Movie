import { get, post, put, del, postWithFormData, putWithFormData } from '../api_helper'
import { spreadSearchQuery } from '../utilities'
const BASE_API_URL = `${process.env.REACT_APP_SITE_ENDPOINT}`


const payment = filter => {
    return post(`${BASE_API_URL}/PayBundle`, filter)
}

export {
    payment
}