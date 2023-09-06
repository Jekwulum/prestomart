import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {updateLocation} from "../../../store/reducers/adminReducer";
import {Outlet} from "react-router-dom";

const HistoryManagementLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateLocation("history"))
    }, [])
    return(
        <>
            <Outlet />
        </>
    )
}

export default HistoryManagementLayout