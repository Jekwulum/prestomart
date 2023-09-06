import {createSlice} from "@reduxjs/toolkit";

const adminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState: {
        visitorData: [],
        orderOverviewData: []
    },
    reducers: {
        updateVisitors: (state, action) => {
            return {
                ...state,
                visitorData: action.payload
            }
        },
        updateOrderOverviewData: (state, action) => {
            return {
                ...state,
                orderOverviewData: action.payload
            }
        }
    }
})

export const {updateVisitors, updateOrderOverviewData} = adminDashboardSlice.actions
export default adminDashboardSlice.reducer