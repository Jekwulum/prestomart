import axiosInstance_API_V1 from "../axiosInstance_API_V1";
import {errorHandling} from "./helper";

export const fetchHistory = (page, limit) => {
    return axiosInstance_API_V1.post("history", {
        page: parseInt(page),
        number_of_records: parseInt(limit)
    })
        .catch((err) => {
            errorHandling(err)
        })
}

export const searchHistory = (query, page, limit) => {
    return axiosInstance_API_V1.post('history/query/', {
        query: query,
        page: page,
        limit: limit
    })
        .catch((err) => {
            errorHandling(err)
        })
}