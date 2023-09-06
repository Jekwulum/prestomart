import React, {useEffect} from "react";
import {BellIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon} from "@heroicons/react/24/solid";
import {prestoMartLogo} from "../../assets";
import {useDispatch, useSelector} from "react-redux";
import {LinkButton} from "../buttons";
import {toggleMinimenu} from "../../store/reducers/adminReducer";

export const TopNavComponent = () => {
    const topNavStyle = {height: "74px"}
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    return (
    <>
        <nav className="fixed z-50 flex flex-wrap items-center justify-between px-2 py-2 bg-gray-50 w-screen border-b"
             style={topNavStyle}>
            <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
                <div
                    className="w-full relative flex items-center justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a
                        className="leading-relaxed inline-block mr-4 flex flex-col justify-center"
                        href="https://prestomart.ng"
                    >
                        <img src={prestoMartLogo.img} className={"w-36"} alt={prestoMartLogo.alt}/>
                    </a>
                </div>
                <div className={"flex flex-grow items-center"} id="admin-navbar">
                    <div className={"mx-auto w-full max-w-lg relative text-slate-800"}>
                        <input
                            className={"w-full outline-none max-w-7xl pl-4 pr-12 py-1 rounded border border-slate-300"}
                            type="text"
                            placeholder={"Looking for something"}
                        />
                        <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                <MagnifyingGlassIcon className={"h-5 w-5"}/>
                            </span>
                    </div>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto text-slate-800">
                        <li className={'flex flex-row items-center justify-center mr-4'}>
                                <span className={"rounded-full bg-slate-300 p-2"}>
                                    <BellIcon className={"h-8 w-8"}/>
                                </span>
                        </li>
                        <li className={'flex flex-row items-center justify-center'}>
                                <span className={"rounded-full bg-slate-300 p-2 mr-4"}>
                                    <UserIcon className={"h-8 w-8"}/>
                                </span>
                            <span className={"flex flex-col"}>
                                    <span className={"font-bold text-sm mr-2"}>Good morning <span className="capitalize">{state.auth.user_data.first_name + " " + state.auth.user_data.last_name}</span></span>
                                    <span className={"text-sm flex flex-row items-center cursor-pointer"} onClick={() => dispatch(toggleMinimenu(state.admin.miniMenu))}>
                                        <span className={"mr-2"}>Welcome to your Dashboard</span>
                                        <span className={"mt-1 transition duration-300 " +  (state.admin.miniMenu ? "rotate-180" : "rotate-0")}><ChevronDownIcon className={"w-4 h-4"}/></span>
                                    </span>
                                </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div style={topNavStyle}/>

        <div className={"max-w-xl absolute right-28 top-20 bg-white border py-2 px-2 z-50 "  + (state.admin.miniMenu ? "block" : "hidden")}>
            <LinkButton location={"/logout"} text={"Logout"}  color={"black"} />
        </div>
    </>
    );
};