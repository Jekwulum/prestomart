import { createSlice } from "@reduxjs/toolkit";

const adminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState: {
        page: 1,
        limit: 20,
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
        },
        updateAllOrdersPaginationProp: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
    }
})

export const { updateVisitors, updateOrderOverviewData, updateAllOrders, updateAllOrdersPaginationProp } = adminDashboardSlice.actions
export default adminDashboardSlice.reducer