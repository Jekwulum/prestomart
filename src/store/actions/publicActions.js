import axiosInstance_API_V1 from "../axiosInstance_API_V1";
import {errorHandling} from "./helper";

export const registerVisit = () => {
    return axiosInstance_API_V1.post('/visitor', {iden: localStorage.getItem("iden")})
        .catch(err => errorHandling(err))
}

export const registerView = (slug) => {
    if (slug)
        axiosInstance_API_V1.post('/product-view/' + slug)
            .catch(err => errorHandling(err))
}

export const addToBookmarksServer = (slug) => {
    return axiosInstance_API_V1.post('/user/bookmark/' + slug)
        .catch(err => errorHandling(err))
}

export const removeFromBookmarksServer = (slug) => {
    return axiosInstance_API_V1.delete('/user/bookmark/' + slug)
        .catch(err => errorHandling(err))
}

export const fetchAllBookmarks = () => {
    return axiosInstance_API_V1.get("/user/bookmark/")
        .catch(err => errorHandling(err))
}

export const fetchUserAddresses = () => {
    return axiosInstance_API_V1.get("/user/user-address/")
        .catch(err => errorHandling(err))
}

export const sendUserAddress = (formData) => {
    return axiosInstance_API_V1.post("/user/user-address/", formData)
        .catch(err => errorHandling(err))
}

export const createPaymentDetailsEntry = (formData) => {
    return axiosInstance_API_V1.post("/user/payment-details/", formData)
        .catch(err => errorHandling(err))
}

export const placeOrder = (formData) => {
    return axiosInstance_API_V1.post("/carting/place-order/", formData)
        .catch(err => errorHandling(err))
}

export const usersOrders = () => {
    return axiosInstance_API_V1.get("/user/orders/")
        .catch(err => errorHandling(err))
}

export const fetchUserOrder = (id) => {
    return axiosInstance_API_V1.get("/user/orders/" + id)
        .catch(err => errorHandling(err))
}

export const fetchPubk = () => {
    return axiosInstance_API_V1.get("/user/orders-pubk")
        .catch(err => errorHandling(err))
}