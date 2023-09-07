import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateLocation } from "../../../store/reducers/adminReducer";
import { Outlet } from "react-router-dom";

const CustomerManagementLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateLocation("customers"))
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default CustomerManagementLayout;