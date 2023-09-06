import React, {useEffect, useState} from "react";
import {
    ArchiveBoxIcon,
    Bars3Icon,
    ChevronDownIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'

import {PlainTextInput} from "../forms/forms.component";
import {prestoMartLogo} from "../../assets";
import {useDispatch, useSelector} from "react-redux";
import {LinkButton} from "../buttons";
import {Link} from "react-router-dom";
import {updatePaginationProp} from "../../store/reducers/productReducer";
import {searchProduct} from "../../store/actions/productActions";
import {toggleMiniMenu, toggleMobileMenu} from "../../store/reducers/authReducer";

export const CustomerSiteHeaderComponent = () => {
    const [y, setY] = useState(0)
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    let timer;
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", onScrollFunc)

        return () => {
            window.removeEventListener("scroll", onScrollFunc)
        }
    }, [])

    const onScrollFunc = () => {
        setSearchResults([])
        setY(window.scrollY)
    }

    useEffect(() => {
        clearTimeout(timer)
        timer = setTimeout(searchFor, 500)

        return () => clearTimeout(timer)
    }, [state.products.productQuery])

    const searchFor = () => {
        if (state.products.productQuery.length === 0) {
            setSearchResults([0])
        } else
            searchProduct({
                query: state.products.productQuery,
                page: state.products.page,
                limit: 10
            })
                .then((result) => {
                    setSearchResults(result.data.products)
                })
    }

    return (
        <>
            <div className={"bg-[#D13D19] py-1"}>
                <ul className={"flex flex-row justify-end text-xs lg:text-sm text-white max-w-7xl mx-auto"}>
                    {/*<a href={"https://twitter.com/" + process.env.REACT_APP_CONTACT_TWITTER_ACCOUNT}>*/}
                    {/*    <img src={twitter} alt={process.env.REACT_APP_CONTACT_TWITTER_ACCOUNT + " On Twitter"} />*/}
                    {/*</a>*/}
                    {/*<li className="mx-1 lg:mx-2">*/}
                    {/*    <a href={"https://youtube.com/" + process.env.REACT_APP_CONTACT_YOUTUBE_ACCOUNT}>*/}
                    {/*        <FontAwesomeIcon icon="fa-brands fa-youtube"/>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li className="mx-1 lg:mx-2">
                        <a href={"mailto:" + process.env.REACT_APP_CONTACT_PHONE_NUMBER}>{process.env.REACT_APP_CONTACT_EMAIL_ADDRESS || "info@prestomart.ng"}</a>
                    </li>
                    <li className="mx-1 lg:mx-2">
                        <a href={"tel:" + process.env.REACT_APP_CONTACT_PHONE_NUMBER}>{process.env.REACT_APP_CONTACT_PHONE_NUMBER || "+2349091427926"}</a>
                    </li>
                </ul>
            </div>
            <nav
                className={"flex flex-wrap items-center justify-between px-2 bg-[#D13D19] mb-3 shadow-lg shadow-slate-300 pb-2 md:py-0 md:pb-2 z-50 " + (y > 55 ? "fixed top-0 left-0 right-0" : "relative")}>
                <div className="container max-w-7xl px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div
                        className="w-full relative flex items-center justify-between md:w-auto md:static md:block md:justify-start">
                        <Link
                            className="leading-relaxed  mr-4 flex flex-col justify-center"
                            to="/"
                        >
                            <img src={prestoMartLogo.img} className={"w-36"} alt={prestoMartLogo.alt}/>
                        </Link>

                        <div className="block md:hidden text-white flex flex-row items-center">
                            <LinkButton location={"/cart"} className={"relative mr-1"} color={"#000"}>
                                <span
                                    className="absolute text-white rounded-full bg-orange-500 text-xs px-1 top-2 left-2 aspect-square flex justify-center items-center">{state.cart.cart.map(i => i.amount).reduce((a, b) => a + b, 0)}</span>
                                <ShoppingCartIcon className={"w-6 h-6 text-white mr-1"}/>
                            </LinkButton>
                            <div className="">
                                <Bars3Icon className={"w-8 h-8"}
                                           onClick={() => dispatch(toggleMobileMenu(state.auth.publicSettings.mobileMenu))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-grow items-center flex-col md:flex-row relative"} id="admin-navbar">
                        <div className="w-full relative">
                            <form method={"get"} action={"/search"} autoComplete={"off"}
                                  className={"mx-auto w-full max-w-lg relative text-slate-800 my-1"}>
                                <PlainTextInput
                                    autoComplete={"off"}
                                    placeholder={"Looking for something"}
                                    name={"query"}
                                    onFocus={() => setSearch(true)}
                                    onBlur={(e) => {
                                        console.log(e)
                                        setSearch(false)
                                    }}
                                    onChange={(e) => {
                                        dispatch(updatePaginationProp({
                                            name: "productQuery",
                                            value: e.target.value
                                        }))
                                    }}
                                />
                                <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                <MagnifyingGlassIcon className={"h-5 w-5"}/>
                            </span>
                            </form>
                            {
                                state.admin.location === "search" ? null :
                                    <div
                                        className={"shadow-lg absolute divide-y bg-white rounded w-full max-w-5xl mx-auto " + (search ? "block" : "hidden")}>
                                        {
                                            searchResults.map((i, k) =>
                                                <Link to={"/product/" + i.slug}
                                                      className={"block py-2 text-sm px-2 lg:px-4 w-full font-light"}
                                                      key={k}>
                                                    {i.name}
                                                </Link>
                                            )
                                        }
                                        {
                                            searchResults.length === 0 ?
                                                <p className={"block py-2 text-sm px-2 lg:px-4 w-full font-light"}>
                                                    No Results
                                                </p>
                                                : null
                                        }
                                    </div>
                            }
                        </div>
                        <div
                            className="fixed  top-0  left-0  right-0  bottom-0 z-20 md:z-0 md:relative md:flex flex-col md:flex-row justify-center items-center list-none md:ml-auto text-slate-800 transform translate-x-full md:translate-x-0">
                            <div className={'mr-4 relative'}
                                 onClick={() => dispatch(toggleMiniMenu(state.auth.publicSettings.miniMenu))}>
                                <div className="cursor-pointer flex flex-row items-center justify-center text-white">
                                    <span><UserIcon className={"w-6 h-6 mr-1"}/></span>
                                    <span className={"mr-1 capitalize break-normal truncate"}>
                                            {
                                                !state.auth.auth.authenticated ? "Account" : "Hi " + state.auth.user_data.first_name
                                            }
                                    </span>
                                    <span><ChevronDownIcon className={"w-4 h-4"}/></span>
                                </div>

                                <div
                                    className={"shadow-lg absolute top-[36px] bg-white rounded px-2 divide-y right-0 w-44 " + (state.auth.publicSettings.miniMenu ? "block" : "hidden")}>
                                    {
                                        !state.auth.auth.authenticated ?
                                            <div className="py-2">
                                                <LinkButton location={"/login"} text={"Sign In"} bg={"#D13D19"}
                                                            size={"md"}/>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="flex flex-col py-2">
                                        <Link to={"/user/account"} className={"flex flex-row py-2 items-center"}>
                                            <span><UserIcon className={"w-5 h-5 mr-2"}/></span>
                                            <span className={"text-sm mr-1"}>My Account</span>
                                        </Link>
                                        <Link to={"/user/orders"} className={"flex flex-row py-2 items-center"}>
                                            <span><ArchiveBoxIcon className={"w-5 h-5 mr-2"}/></span>
                                            <span className={"text-sm mr-1"}>My Orders</span>
                                        </Link>
                                        <Link to={"/user/saved-items"} className={"flex flex-row py-2 items-center"}>
                                            <span><HeartIcon className={"w-5 h-5 mr-2"}/></span>
                                            <span className={"text-sm mr-1"}>Saved Items</span>
                                        </Link>
                                    </div>
                                    {
                                        state.auth.auth.authenticated ?
                                            <div className="py-2">
                                                <LinkButton location={"/logout"} text={"Sign Out"} bg={"#D13D19"}
                                                            size={"md"}/>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <div className={'flex flex-row items-center justify-center'}>
                                <LinkButton location={"/cart"} className={"relative flex flex-row items-center w-full"}
                                            color={"#000"}>
                                    <span
                                        className="absolute text-white rounded-full bg-orange-500 text-xs px-1 top-2 left-2 aspect-square flex justify-center items-center">{state.cart.cart.map(i => i.amount).reduce((a, b) => a + b, 0)}</span>
                                    <ShoppingCartIcon className={"w-6 h-6 mr-1 text-white"}/>
                                    <span className={"mr-1 text-white"}>Basket</span>
                                </LinkButton>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={"md:hidden fixed block top-0 left-0 right-0 bottom-0 bg-white h-screen w-full z-50 transition duration-300 " + (!state.auth.publicSettings.mobileMenu ? "translate-x-full" : "translate-x-0")}>
                <div className={"px-8"}>
                    <div className="py-8" onClick={() =>
                        dispatch(toggleMobileMenu(state.auth.publicSettings.mobileMenu))
                    }>
                        <XCircleIcon className={"w-8 h-8 mx-auto"}/>
                    </div>
                    <div className="mb-4">
                        <img src={prestoMartLogo.img} className={"w-36 mx-auto"} alt={prestoMartLogo.alt}/>
                    </div>
                    <div className="capitalize text-center text-2xl font-light py-4">
                        {
                            !state.auth.auth.authenticated ? null : "Hi " + state.auth.user_data.first_name
                        }
                    </div>
                    {
                        !state.auth.auth.authenticated ?
                            <div className="py-2">
                                <LinkButton location={"/login"} text={"Sign In"} bg={"#D13D19"}
                                            size={"md"}/>
                            </div>
                            :
                            null
                    }
                    <div className="flex flex-col items-center py-2">
                        <Link to={"/user/account"} className={"flex flex-row py-4 items-center"}>
                            <span><UserIcon className={"w-6 h-6 mr-2"}/></span>
                            <span className={"text-lg mr-1"}>My Account</span>
                        </Link>
                        <Link to={"/user/orders"} className={"flex flex-row py-4 items-center"}>
                            <span><ArchiveBoxIcon className={"w-6 h-6 mr-2"}/></span>
                            <span className={"text-lg mr-1"}>My Orders</span>
                        </Link>
                        <Link to={"/user/saved-items"} className={"flex flex-row py-4 items-center"}>
                            <span><HeartIcon className={"w-6 h-6 mr-2"}/></span>
                            <span className={"text-lg mr-1"}>Saved Items</span>
                        </Link>
                    </div>
                    {
                        state.auth.auth.authenticated ?
                            <div className="py-2">
                                <LinkButton location={"/logout"} text={"Sign Out"} bg={"#D13D19"}
                                            size={"md"}/>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
}