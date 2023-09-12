import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endAuthenticating, logAdminUser, logPublicUser, startAuthenticating } from "../../store/reducers/authReducer";
import axiosInstance_API_V1 from "../../store/axiosInstance_API_V1";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { prestoMartLogo } from "../../assets";
import { ColoredTextInput } from "../../components/forms";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/buttons";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    let location = useLocation();
    let navigate = useNavigate();
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const buttonText = (auth.auth && auth.auth.authenticating) ? (<Cog6ToothIcon className={"mx-auto animate-spin w-6 h-6"} />) : ("Login");

    const handleLoginAdmin = (e) => {
        e.preventDefault();
        dispatch(startAuthenticating())

        axiosInstance_API_V1.post("admin-user/login/", formData)
            .then(
                result => {
                    switch (result.data.http_code) {
                        case 200:
                            toast.success("Login Successful")
                            dispatch(logAdminUser({
                                token: result.data.data.token,
                                user: result.data.data.user
                            }))
                            break
                        case 400:
                            dispatch(endAuthenticating(result.data.error))
                            break
                        case 500:
                            dispatch(endAuthenticating(result.data.error))
                            break
                        default:
                            dispatch(endAuthenticating("Something went wrong, please try again"))
                            break;
                    }
                })
            .catch(error => {
                dispatch(endAuthenticating())
            })
            .finally(() => {
                setFormData({
                    email: "",
                    password: ""
                })
            })
    }

    const handleLoginUser = (e) => {
        e.preventDefault();
        dispatch(startAuthenticating());

        axiosInstance_API_V1.post("user/login/", formData)
            .then(
                result => {
                    switch (result.data.http_code) {
                        case 200:
                            toast.success("Login Successful")
                            dispatch(logPublicUser({
                                token: result.data.data.token,
                                user: result.data.data.user
                            }))
                            break
                        case 400:
                            dispatch(endAuthenticating(result.data.error))
                            break
                        case 500:
                            dispatch(endAuthenticating(result.data.error))
                            break
                        default:
                            dispatch(endAuthenticating("Something went wrong, please try again"))
                            break;
                    }
                })
            .finally(() => {
                setFormData({
                    email: "",
                    password: ""
                })
            })
    }

    useEffect(() => {
        dispatch(endAuthenticating(""))
    }, [])

    useEffect(() => {
        localStorage.clear();
        if (!auth.auth.authenticated)
            return

        if (location.pathname === "/auth")
            navigate("/admin")
        if (location.pathname === "/login")
            navigate("/")

    }, [auth.auth.authenticated])

    return (
        <>
            <section className={"max-w-md mx-auto px-8 lg:px-4 bg-white  py-4 rounded-lg my-8"}>
                <img
                    className={"mx-auto w-full max-w-xs"}
                    src={prestoMartLogo.img}
                    alt={prestoMartLogo.alt}
                />

                <div style={{ minHeight: "40px" }}
                    className={"my-2 rounded text-center transition duration-300 " + (auth.auth.loginError === "" ? "w-full" : "p-2 bg-red-200 text-red-800 ")}>
                    {auth.auth.loginError}
                </div>

                <form className={"relative mb-8"}>
                    <div className="my-6 lg:my-10">
                        <ColoredTextInput
                            label={"email"}
                            type={"text"}
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="my-6 lg:my-10">
                        <ColoredTextInput
                            label={"password"}
                            type={"password"}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <Button text={buttonText} bg={"#D13D19"} color={"#fff"} onClick={(e) => {
                            if (document.location.pathname === "/auth")
                                handleLoginAdmin(e)
                            else
                                handleLoginUser(e)
                        }} />
                    </div>
                </form>
                <div className="text-right text-xs flex flex-row justify-end">
                    <p className={"pr-1"}>Don't have an account? </p>
                    <Link to={"/signup"} className="underline" href="https://prestomart.ng/">Create One</Link>
                </div>
                <div className="text-right text-xs">
                    <Link to={"/"} className="underline" href="https://prestomart.ng/">Return to Homepage</Link>
                </div>
            </section>
        </>
    )
}

export default Login;