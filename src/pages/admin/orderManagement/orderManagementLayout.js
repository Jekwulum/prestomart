import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {updateLocation} from "../../../store/reducers/adminReducer";
import {Outlet} from "react-router-dom";

const OrderManagementLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateLocation("orders"))
    }, [])

    return(
        <div className={"relative"}>
            <Outlet />
        </div>
    )
}

export default OrderManagementLayout