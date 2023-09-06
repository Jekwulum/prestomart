import React, { useEffect, useState } from "react";
import { ColoredSelect, ColoredTextInput } from "../../../components/forms";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../store/reducers/adminUserReducer";
import { Button } from "../../../components/buttons";
import { toast } from "react-toastify";
import { createAdminUser } from "../../../store/actions/adminUserActions";
import { Navigate } from "react-router-dom";

const NewUser = () => {
    const [redirect, setRedirect] = useState(false)
    const [adminTypeIdError, setAdminTypeIdError] = useState(true);
    const state = useSelector(state => state.user)
    const dispatch = useDispatch()

    const updateL1 = (n, v) => {
        dispatch(updateUserData({ name: n, value: v }))
    }

    const createNewUser = () => {
        if (state.user.admin_type_id === null) {
            setAdminTypeIdError(true);
            toast.error('Select admin type')
        }
        else {
            setAdminTypeIdError(false);
            toast.promise(createAdminUser(state.user), {
                pending: "Creating user...",
                success: "New user successfully created."
            })
                .then((resp) => {
                    setRedirect(true)
                })
        }
    }

    useEffect(() => {

    })
    return (
        <>
            {
                redirect && <Navigate to={"/admin/users"} />
            }
            <div className="py-12 px-4 max-w-xl mx-auto">
                <div className="mb-10 mt-8 ">
                    <ColoredTextInput label={"Email"} value={state.user.email} bgClass={"bg-gray-100"}
                        onChange={(e) => updateL1("email", e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="mb-10 mt-8 ">
                        <ColoredTextInput label={"First Name"} value={state.user.first_name} bgClass={"bg-gray-100"}
                            onChange={(e) => updateL1("first_name", e.target.value)} />
                    </div>
                    <div className="mb-10 mt-8 ">
                        <ColoredTextInput label={"Last Name"} value={state.user.last_name} bgClass={"bg-gray-100"}
                            onChange={(e) => updateL1("last_name", e.target.value)} />
                    </div>
                </div>

                <div className="mb-10 mt-8 ">
                    <ColoredTextInput label={"Password"} value={state.user.password} bgClass={"bg-gray-100"}
                        onChange={(e) => updateL1("password", e.target.value)} />
                </div>

                <div className="mb-10 mt-8 ">
                    <ColoredSelect label={"Admin Type"} value={state.user.admin_type_id} bgClass={"bg-gray-100"}
                        onChange={(e) => { updateL1("admin_type_id", e.target.value); setAdminTypeIdError(false) }}>
                        {state.adminTypes.map((i, k) =>
                            <option key={k} value={i.admin_type_id}>{i.admin_type}</option>
                        )}
                    </ColoredSelect>
                    <span className={adminTypeIdError ? '' : "hidden"}>Select admin type</span>
                </div>

                <Button text={"Create User"} color={"#fff"} bg={"#000"} size={"lg"} onClick={createNewUser} />
            </div>
        </>
    )
}

export default NewUser