import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {updateLocation} from "../../../store/reducers/adminReducer";
import {Outlet} from "react-router-dom";

const UserManagementLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateLocation("users"))
    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}

export default UserManagementLayout;