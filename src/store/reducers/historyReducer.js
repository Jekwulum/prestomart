import {createSlice} from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: "history",
    initialState: {
        page: 1,
        limit: 20,
        occurrenceQuery: "",
        searchLoadingState: false,
        history: [],
        occurrence: {}
    },
    reducers: {
        updateHistory: (state, action) => {
            return {
                ...state,
                occurrence: {},
                history: action.payload
            }
        },
        updatePaginationProp: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        setOccurrence: (state, action) => {
            const index = state.history.findIndex(history => history.history_id === action.payload)
            if (index === -1) return {...state, occurrence: {}}
            else
                return {
                    ...state,
                    occurrence: state.history[index]
                }
        },
    }
})

export const {
    updateHistory,
    updatePaginationProp,
    setOccurrence
} = historySlice.actions
export default historySlice.reducer