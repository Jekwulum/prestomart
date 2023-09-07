import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            admin_type_id: null
        },
        users: [],
        adminTypes: [],
        customers: []
    },
    reducers: {
        updateUsers: (state, action) => {
            return {
                ...state,
                users: action.payload
            }
        },
        updateAdminTypes: (state, action) => {
            return {
                ...state,
                adminTypes: action.payload
            }
        },
        updateUserData: (state, action) => {
            console.log("admin id: ", action.payload.value)
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value
                }
            }
        },
        updateCustomers: (state, action) => {
            return {
                ...state,
                customers: action.payload
            }
        }
    }
})

export const { updateUsers, updateAdminTypes, updateUserData, updateCustomers } = userSlice.actions
export default userSlice.reducer