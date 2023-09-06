import {errorHandling} from "./helper";
import axiosInstance_API_V1 from "../axiosInstance_API_V1";

export const fetchAdminUsers = () => {
    return axiosInstance_API_V1.get('admin/users')
        .catch(err => {
            errorHandling(err)
        })
}

export const fetchAdminTypesServer = () => {
    return axiosInstance_API_V1.get('admin/types')
        .catch(err => {
            errorHandling(err)
        })
}

export const createAdminUser = (formData) => {
    return axiosInstance_API_V1.post('admin-user/signup', formData)
        .catch(err => errorHandling(err))
}

export const fetchVisitorDetails = () => {
    return axiosInstance_API_V1.get('admin/visitors')
        .catch(err => errorHandling(err))
}

export const fetchOrdersOverview = () => {
    return axiosInstance_API_V1.get('admin/orders-overview')
        .catch(err => errorHandling(err))
}

export const fetchAllOrders = () => {
    return axiosInstance_API_V1.get('admin/all-orders')
        .catch(err => errorHandling(err))
}