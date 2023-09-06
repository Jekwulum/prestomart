import {toast} from "react-toastify";

export const errorHandling = (err) => {
    // console.log(err)
    toast.error("Oops! Something went wrong")
}