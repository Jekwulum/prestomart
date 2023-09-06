import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {usersOrders} from "../../../store/actions/publicActions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setOrders} from "../../../store/reducers/authReducer";

export const UserOrderLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        usersOrders()
            .then(result => {
                switch (result.data.http_code) {
                    case 200:
                        dispatch(setOrders(result.data.data))
                        break;
                    default:
                        toast.error("Oops, looks like something went wrong. Please try again or contact support!")
                        break
                }
            })
    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
}