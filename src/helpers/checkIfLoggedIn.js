import {useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {toggleMobileMenu} from "../store/reducers/authReducer";
import {toast} from "react-toastify";

export default function CheckIfLoggedIn() {
    const state = useSelector(state => state)

    useEffect(() => {
       if (!state.auth.auth.authenticated)
           toast.error("You need to be signed in to access this page.")
    }, []);

    return (
        <>
            {
                state.auth.auth.authenticated ?
                    null
                    :
                    <Navigate to={"/login"}/>
            }
        </>
    );
}