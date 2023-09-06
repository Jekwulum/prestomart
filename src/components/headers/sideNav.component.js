import React, {useEffect} from "react";
import {
    ArchiveBoxIcon,
    ChartPieIcon,
    ClockIcon,
    ReceiptPercentIcon,
    RectangleGroupIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const SideNavComponent = () => {
    const sideNavStyle = {width: "70px"}
    const state = useSelector(state => state.admin)

    return (
        <>
            <nav
                className="py-8 bg-gray-50 flex justify-center items-center border-r h-full top-0 left-0 absolute"
                style={sideNavStyle}>
                <ul className="mx-auto w-full flex flex-col items-center justify-center fixed top-[25%] "
                    style={sideNavStyle}>
                    <li className={'flex flex-col w-full items-center justify-center'}>
                    <span className={"font-medium p-2 w-full text-center"}>
                        MENU
                    </span>
                    </li>
                    <li className="w-full">
                        <Link to="/admin"
                              className={"block bg-transparent py-4 px-2 w-full hover:bg-orange-600 hover:text-white transition duration-300 " + (state.location === "dashboard" ? " bg-orange-600  shadow-xl shadow-inner shadow-black text-white" : "")}>
                            <RectangleGroupIcon className={"h-8 w-8 mx-auto"}/>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/coming-soon"
                              className={"block bg-transparent py-4 px-2 w-full hover:bg-orange-600 hover:text-white transition duration-300 " + (state.location === "" ? " bg-orange-600  shadow-xl shadow-inner shadow-black text-white" : "")}>
                            <ChartPieIcon className={"h-8 w-8 mx-auto"}/>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/admin/content/"
                              className={"block bg-transparent py-4 px-2 w-full hover:bg-orange-600 hover:text-white transition duration-300 " + (state.location === "content" ? " bg-orange-600  shadow-xl shadow-inner shadow-black text-white" : "")}>
                            <ArchiveBoxIcon className={"h-8 w-8 mx-auto"}/>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/admin/orders"
                              className={"block bg-transparent py-4 px-2 w-full hover:bg-orange-600 hover:text-white transition duration-300 " + (state.location === "orders" ?  "bg-orange-600  shadow-xl shadow-inner shadow-black text-white" : "")}>
                            <ReceiptPercentIcon className={"h-8 w-8 mx-auto"}/>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/admin/users"
                              className={"block bg-transparent py-4 px-2 w-full hover:bg-orange-600 hover:text-white transition duration-300 " + (state.location === "users" ? " bg-orange-600  shadow-xl shadow-inner shadow-black text-white" : "")}>
                            <UserGroupIcon className={"h-8 w-8 mx-auto"}/>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/admin/history"
                              className={"block bg-transparent py-4 px-2 w-full hover:bg-orange-600 hover:text-white transition duration-300 " + (state.location === "history" ? " bg-orange-600  shadow-xl shadow-inner shadow-black text-white" : "")}>
                            <ClockIcon className={"h-8 w-8 mx-auto"}/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}