import axios from "axios"
import { toast } from "react-toastify";


const getHeaders = () => {
    return {
        'Authorization': 'PRESTOMART_JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'Accept': "*"
    };
}

const urls = {
    REACT_APP_PROD_API_URL: "https://prestomart-api.onrender.com/",
    REACT_APP_DEV_API_URL: "http://localhost:5000/api/v1"
}
const axiosInstance_API_V1 = axios.create({
    baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? urls.REACT_APP_DEV_API_URL : urls.REACT_APP_PROD_API_URL,
    headers: getHeaders()
})



const sessionExpired = () => {
    toast(`Session expired, please login again`, {
        position: toast.POSITION.TOP_RIGHT
    })

    localStorage.removeItem('access_token')
    if (document.location.pathname !== "/login") document.location.href = "/login"
}

axiosInstance_API_V1.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            sessionExpired();
        }
    }
)

export default axiosInstance_API_V1
