import {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

export default function CheckIfCartEmpty() {
    const location = useLocation();
    const state = useSelector(state => state)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (state.cart.cart.length === 0) {
            toast.error("Oops, looks like your cart is empty!")
            setRedirect(true)
        }
    }, [state.cart.cart]);

    return (
        <>
            {
                !redirect ?
                    null
                    :
                    <>
                        {
                            location.pathname === "/checkout"
                                ?
                                <Navigate to={"/user/orders"}/>
                                :
                                <Navigate to={"/"}/>
                        }
                    </>
            }
        </>
    );
}