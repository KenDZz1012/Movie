import { get, post, put, del } from '../api_helper'

const BASE_API_URL = `${process.env.REACT_APP_BILL_ENDPOINT}`

const getListBill = filter => {
    return get(`${BASE_API_URL}/GetListBill`, filter)
}

const getBillById = id => {
    return get(`${BASE_API_URL}/GetBillById/${id}`)
}

const createBill = userCreate => {
    return post(`${BASE_API_URL}/createBill`, userCreate)
}

const updateBill = (UserId, userUpdate) => {
    return put(`${BASE_API_URL}/updateBill/${UserId}`, userUpdate)
}

const deleteBill = id => {
    return del(`${BASE_API_URL}/deleteBill/${id}`)
}
export {
    getListBill,
    getBillById,
    createBill,
    updateBill,
    deleteBill
}