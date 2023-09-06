import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {terminateSession} from "../store/reducers/authReducer";

const Logout = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_data")
        dispatch(terminateSession)

        window.location = "/login";
    }, [auth])

    return (
        <>
            Logging out...
        </>
    )
}

export default Logout