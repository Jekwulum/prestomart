import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        page: 1,
        limit: 30,
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
        },
        updateCustomersPaginationProp: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
    }
})

export const { updateUsers, updateAdminTypes, updateUserData, updateCustomers, updateCustomersPaginationProp } = userSlice.actions
export default userSlice.reducer