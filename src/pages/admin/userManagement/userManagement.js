import { PlainTextInput } from "../../../components/forms";
import {
    CheckCircleIcon,
    ChevronDownIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { Button, ButtonGroup, LinkButton, TransparentButton } from "../../../components/buttons";
import { toast } from "react-toastify";
import { fetchAdminTypesServer, fetchAdminUsers } from "../../../store/actions/adminUserActions";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminTypes, updateUsers } from "../../../store/reducers/adminUserReducer";

const UserManagement = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.user)
    useEffect(() => {
        fetchAdminTypes()
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        toast.promise(fetchAdminUsers(), {
            pending: "Fetching all users...",
            success: "Now displaying all admin users"
        })
            .then(resp => {
                dispatch(updateUsers(resp.data))
            })
    }

    const fetchAdminTypes = () => {
        toast.promise(fetchAdminTypesServer(), {
            success: "Admin type data loaded"
        })
            .then(resp => {
                dispatch(updateAdminTypes(resp.data))
            })
    }

    return (
        <>
            <div className={"mb-4"}>
                <h4>User Management</h4>

                <div className="w-full flex flex-row justify-end">
                    <PlainTextInput containerClasses={"w-1/2 mr-2"} className={'w-full '}
                        placeholder={"Name or role"}
                        icon={<MagnifyingGlassIcon className={"h-5 w-5"} />} />
                    <LinkButton location={"/admin/users/new"} text={"New User"} size={"md"}
                        color={"#fff"} bg={"#000000"} />
                    <TransparentButton>
                        <FunnelIcon className={"w-6 h-6 mr-1"} />
                        <span className={"ml-1"}>View Filters</span>
                        <ChevronDownIcon className={"w-5 h-5"} />
                    </TransparentButton>
                </div>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr className={"text-left border-b border-slate-800"}>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}></th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>ID</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>First Name</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>Last Name</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>Email</th>
                        <th className={"pt-4 text-sm pb-2 text-center"}>Active</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>Admin Type</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>Created At</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>Last Login</th>
                        <th className={"pt-4 text-sm pr-2 pb-2 "}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {state.users.map((i, k) =>
                        <UserManagementRow key={k} user={i} />
                    )}
                </tbody>
            </table>
        </>
    )
}

const UserManagementRow = ({ user }) => {
    const state = useSelector(state => state.user)
    const toggleProduct = () => {

    }
    const deleteUser = () => {

    }

    return (
        <tr className={"border-b border-slate-200 text-sm"}>
            <td className="py-4 pb-2 px-2">
                <input type="checkbox" className={"mx-auto"} />
            </td>
            <td className="py-4 pb-2">{user.admin_user_id}</td>
            <td className="py-4 pb-2">{user.first_name}</td>
            <td className="py-4 pb-2">{user.last_name}</td>
            <td className="py-4 pb-2">{user.email}</td>
            <td className="py-4 pb-2 cursor-pointer" onClick={toggleProduct}>
                {
                    user.active ?
                        <CheckCircleIcon className={"w-8 h-8 mx-auto text-green-600"} /> :
                        <XCircleIcon className={"w-8 h-8 mx-auto text-red-600"} />
                }
            </td>
            <td className="py-4 pb-2">{state.adminTypes[state.adminTypes.findIndex(i => i.admin_type_id === user.admin_type_id)].admin_type}</td>
            <td className="py-4 pb-2">{user.created_at}</td>
            <td className="py-4 pb-2">{user.last_login}</td>
            <td className="py-4 pb-2">
                <ButtonGroup borderRadius={"6px"}>
                    <LinkButton location={"/admin/users/edit/" + user.admin_user_id}
                        text={"Edit"}
                        color={"white"}
                        bg={"blue"}
                        size={"sm"} />
                    <Button onClick={deleteUser} text={"Delete"} color={"white"} bg={"red"} size={"sm"} />
                </ButtonGroup>
            </td>
        </tr>
    )
}

export default UserManagement