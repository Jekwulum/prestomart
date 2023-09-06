import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SideNavComponent, TopNavComponent } from "../../components/headers";
import { useSelector } from "react-redux";

const AdminLayout = () => {
    const [width, setWidth] = useState(0);
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        setWidth(window.innerWidth)
        document.title = "PrestoMart Admin"
        window.addEventListener("resize", getWindowSize)

        return (() => {
            window.removeEventListener("resize", getWindowSize)
        })
    }, [])

    const getWindowSize = (e) => setWidth(window.innerWidth)

    return (
        <>
            {
                !auth.auth.authenticated || auth.user_data.admin_user_id === null ?
                    <Navigate to={"/login"} replace={true} /> : null
            }

            {width > 1200 ?
                <div>
                    <TopNavComponent />

                    <div className="h-screen grid grid-cols-[74px_1fr]">
                        <div className="relative h-full">
                            <SideNavComponent />
                        </div>
                        <div className="p-2">
                            <Outlet />
                        </div>
                    </div>
                </div>
                :
                <div className="h-screen w-screen flex justify-center items-center">
                    Device screen to small
                </div>
            }
        </>
    )
}

export default AdminLayout