import { createSlice } from "@reduxjs/toolkit";

const adminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState: {
        visitorData: [],
        orderOverviewData: [],
        allOrders: []
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
        },
        updateAllOrders: (state, action) => {
            return {
                ...state,
                allOrders: action.payload
            }
        }
    }
})

export const { updateVisitors, updateOrderOverviewData, updateAllOrders } = adminDashboardSlice.actions
export default adminDashboardSlice.reducer