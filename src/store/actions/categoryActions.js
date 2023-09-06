import axiosInstance_API_V1 from "../axiosInstance_API_V1";
import {toast} from "react-toastify";
import {errorHandling} from "./helper";

export const fetchCategories = () => {
    return axiosInstance_API_V1.get('product-category/')
        .catch((err) => {
            errorHandling(err)
        })
}

export const uploadCategoryImageServer = (formData) => {
    return axiosInstance_API_V1.post("product-category-image/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .catch((err) => {
            errorHandling(err)
        })
}

export const createNewCategoryServer = (formData) => {
    return axiosInstance_API_V1.post("product-category/", formData,)
        .catch((err) => {
            errorHandling(err)
        })
}

export const updateCategoryServer = (formData, id) => {
    return axiosInstance_API_V1.put("product-category/"+ id, formData,)
        .catch((err) => {
            errorHandling(err)
        })
}

export const createNewSubcategoryServer = (formData, id) => {
    return axiosInstance_API_V1.post("product-category/subcategory/" + id, formData,)
        .catch((err) => {
            errorHandling(err)
        })
}

export const updateSubcategoryServer = (formData, id) => {
    return axiosInstance_API_V1.put("product-category/subcategory/"+ id, formData,)
        .catch((err) => {
            errorHandling(err)
        })
}

export const deleteCategoryServer = (id) => {
    return axiosInstance_API_V1.delete("product-category/"+ id)
        .catch((err) => {
            errorHandling(err)
        })
}

export const deleteSubcategoryServer = (id) => {
    return axiosInstance_API_V1.delete("product-category/subcategory/"+ id)
        .catch((err) => {
            errorHandling(err)
        })
}