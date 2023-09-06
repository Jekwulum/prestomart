import CheckIfLoggedIn from "./checkIfLoggedIn";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const BookmarkProduct =  () => {
    const {slug} = useParams()
    useEffect(() => {

    })

    return(
        <>
        <CheckIfLoggedIn />
        </>
    )
}

export default BookmarkProduct