import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    access: localStorage.getItem('access_token'),
    auth: {
        authenticated: (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined),
        authenticating: false,
        loginError: '',
    },
    user_data: JSON.parse(localStorage.getItem("user_data")) || {
        admin_user_id: null,
        admin_type_id: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        email: null,
        email_verification: null,
        is_email_verified: null,
        account_validation: null,
        active: null,
        admin_active: null,
        created_at: null,
        updated_at: null,
        deleted_at: null
    },
    publicSettings: {
        miniMenu: false,
        mobileMenu: false
    },
    bookmarked_items: JSON.parse(localStorage.getItem("bookmarked_items")) || [],
    orders: []
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logAdminUser: (state, action) => {
            localStorage.setItem('access_token', action.payload.token)
            localStorage.setItem('user_data', JSON.stringify(action.payload.user))
            return {
                ...state,
                access: action.payload.token,
                auth: {
                    ...state.auth,
                    ...{
                        authenticated: true,
                        authenticating: false,
                        loginError: ""
                    }
                },
                user_data:
                    {
                        ...state.user_data,
                        ...action.payload.user
                    }
            }
        },
        logPublicUser: (state, action) => {
            localStorage.setItem('access_token', action.payload.token)
            localStorage.setItem('user_data', JSON.stringify(action.payload.user))
            return {
                ...state,
                access: action.payload.token,
                auth: {
                    ...state.auth,
                    ...{
                        authenticated: true,
                        authenticating: false,
                        loginError: ""
                    }
                },
                user_data:
                    {
                        ...state.user_data,
                        ...action.payload.user
                    }
            }
        },
        startAuthenticating: (state, action) => {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    authenticating: true
                }
            }
        },
        endAuthenticating: (state, action) => {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    authenticating: false,
                    authenticated: false,
                    loginError: action.payload
                }
            }
        },
        terminateSession: (state, action) => {
            return {
                ...state,
                ...initialState,
                authenticated: false
            }
        },
        toggleMiniMenu: (state, action) => {
            return {
                ...state,
                publicSettings: {
                    ...state.publicSettings,
                    miniMenu: !(action.payload)
                }
            }
        },
        toggleMobileMenu: (state, action) => {
            return {
                ...state,
                publicSettings: {
                    ...state.publicSettings,
                    mobileMenu: !(action.payload)
                }
            }
        },
        updateBookmarks: (state, action) => {
            localStorage.setItem("bookmarked_items", JSON.stringify(action.payload))

            return {
                ...state,
                bookmarked_items: action.payload
            }
        },
        setOrders: (state, action) => {
            return {
                ...state,
                orders: action.payload
            }
        }
    }
})

export const {
    logAdminUser,
    logPublicUser,
    toggleMobileMenu,
    startAuthenticating,
    endAuthenticating,
    terminateSession,
    toggleMiniMenu,
    updateBookmarks,
    setOrders
} = authSlice.actions
export default authSlice.reducer