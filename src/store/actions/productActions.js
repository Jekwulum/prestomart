import axiosInstance_API_V1 from "../axiosInstance_API_V1";
import {toast} from "react-toastify";
import {errorHandling} from "./helper";

export const fetchProducts = (page, limit, conditions) => {
    return axiosInstance_API_V1.post('product/products/', {
        page: page,
        number_of_records: limit,
        conditions: JSON.stringify(conditions)
    })
        .catch((err) => {
            errorHandling(err)
        })
}

export const fetchProduct = (slug) => {
    return axiosInstance_API_V1.get(`product/${slug}`)
        .catch((err) => {
            errorHandling(err)
        })
}

export const updateProductTextDetailsServer = (data) => {
    return axiosInstance_API_V1.put(`product/${data.slug}`, data)
        .then((res) => {
            toast.success(res.data.message)
        })
        .catch((err) => {
            errorHandling(err)
        })
}

export const fetchProducts_Order = (page, limit, conditions) => {
    return axiosInstance_API_V1.post('product/products-order/', {
        page: page,
        number_of_records: limit,
        conditions: conditions
    })
        .catch((err) => {
            errorHandling(err)
        })
}

export const updateProductImagesServer = (slug, formData) => {
    return axiosInstance_API_V1.put(`product/update-images/${slug}`, formData)
        .catch((err) => {
            errorHandling(err)
        })
}

export const createDiscountServer = (slug, formData) => {
    return axiosInstance_API_V1.post(`product-discount/${slug}`, formData)
        .catch((err) => {
            errorHandling(err)
        })
}

export const deleteDiscountServer = (slug, id) => {
    return axiosInstance_API_V1.delete(`product-discount/${slug}/${id}`)
        .catch((err) => {
            errorHandling(err)
        })
}

export const toggleDiscountServer = (id) => {
    return axiosInstance_API_V1.put(`product-discount/${id}`)
        .catch((err) => {
            errorHandling(err)
        })
}

export const toggleProductActiveServer = (slug) => {
    return axiosInstance_API_V1.put(`product/toggle-active/${slug}`)
        .catch((err) => {
            errorHandling(err)
        })
}

export const deleteProductServer = (slug) => {
    return axiosInstance_API_V1.delete(`product/${slug}`)
        .catch((err) => {
            errorHandling(err)
        })
}

export const createNewProductServer = (formData) => {
    return axiosInstance_API_V1.post("product-admin/", formData)
        .catch((err) => {
            errorHandling(err)
        })
}

export const uploadProductImageServer = (formData) => {
    return axiosInstance_API_V1.post("product-image/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .catch((err) => {
            errorHandling(err)
        })
}

export const searchProduct = (formData) => {
    return axiosInstance_API_V1.post("product/query", formData)
        .catch((err) => {
            errorHandling(err)
        })
}