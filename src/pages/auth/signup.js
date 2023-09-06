import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {endAuthenticating} from "../../store/reducers/authReducer";
import axiosInstance_API_V1 from "../../store/axiosInstance_API_V1";
import {Link, Navigate} from "react-router-dom";
import {prestoMartLogo} from "../../assets";
import {ColoredTextInput} from "../../components/forms";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {Button} from "../../components/buttons";
import {toast} from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
    })
    const [redirect, setRedirect] = useState(false)

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleCreateUser = (e) => {
        e.preventDefault();
        // dispatch(startAuthenticating())

        axiosInstance_API_V1.post("user/signup/", formData)
            .then(
                result => {
                    switch (result.data.http_code) {
                        case 200:
                            toast.success("Account Successfully Created!")
                            setRedirect(true)
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
                    password: "",
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                })
            })
    }

    useEffect(() => {
        dispatch(endAuthenticating(""))
    }, [])

    return (
        <>
            {
                auth.auth.authenticated ?
                    <Navigate to={"/"} replace={true}/> : null
            }
            {
                redirect ?
                    <Navigate to={"/login"} replace={true}/> : null
            }

            <section className={"max-w-md mx-auto px-8 lg:px-4 bg-white  py-4 rounded-lg my-8"}>
                <img
                    className={"mx-auto w-full max-w-xs"}
                    src={prestoMartLogo.img}
                    alt={prestoMartLogo.alt}
                />

                <div style={{minHeight: "40px"}}
                     className={"my-2 rounded text-center transition duration-300 " + (auth.auth.loginError === "" ? "w-full" : "p-2 bg-red-200 text-red-800 ")}>
                    {auth.auth.loginError}
                </div>

                <form className={"relative mb-8"}>
                    <div className="my-6 lg:my-10">
                        <ColoredTextInput
                            label={"email"}
                            type={"text"}
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="my-6 lg:my-10">
                        <ColoredTextInput
                            label={"password"}
                            type={"password"}
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <div className="my-6 lg:my-10 grid md:grid-cols-2 gap-2">
                        <div className="my-3 md:my-0">
                            <ColoredTextInput
                                label={"first name"}
                                type={"text"}
                                value={formData.first_name}
                                onChange={e => setFormData({...formData, first_name: e.target.value})}
                            />
                        </div>

                        <div className="my-3 md:my-0">
                            <ColoredTextInput
                                label={"last name"}
                                type={"text"}
                                value={formData.last_name}
                                onChange={e => setFormData({...formData, last_name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="my-6 lg:my-10">
                        <ColoredTextInput
                            label={"phone number"}
                            type={"text"}
                            value={formData.phone_number}
                            onChange={e => setFormData({...formData, phone_number: e.target.value})}
                        />
                    </div>

                    <div>
                        <Button text={
                            (auth.auth && auth.auth.authenticating) ?
                                <Cog6ToothIcon className={"mx-auto animate-spin w-6 h-6"}/> : "Sign Up"
                        } bg={"#D13D19"} color={"#fff"} onClick={(e) => {
                            handleCreateUser(e)
                        }}/>
                    </div>
                </form>
                <div className="text-right text-xs flex flex-row justify-end">
                    <p className={"pr-1"}>Already have an account? </p>
                    <Link to={"/login"} className="underline">Login</Link>
                </div>
                <div className="text-right text-xs">
                    <Link to={"/"} className="underline">Return to Homepage</Link>
                </div>
            </section>
        </>
    )
}

export default Signup;