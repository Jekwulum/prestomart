import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        location: "dashboard",
        miniMenu: false
    },
    reducers: {
        updateLocation: (state, action) => {
            return {
                ...state,
                location: action.payload
            }
        },
        toggleMinimenu: (state, action) => {
            return {
                ...state,
                miniMenu: !(action.payload)
            }
        }
    }
})

export const {updateLocation, toggleMinimenu} = adminSlice.actions
export default adminSlice.reducer