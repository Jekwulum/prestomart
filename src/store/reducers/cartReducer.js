import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart_session")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart.findIndex(entry => entry.product.product_id === action.payload.product.product_id)
            if (index >= 0)
                return state
            else
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }
        },
        incrementCartItem: (state, action) => {
            const index = state.cart.findIndex(entry => entry.product.product_id === action.payload)
            const temp = state.cart[index].amount

            return {
                ...state,
                cart: state.cart.map((entry, i) =>
                    i === index ? {...entry, amount: temp + 1} : entry)
            }
        },
        decrementCartItem: (state, action) => {
            const index = state.cart.findIndex(entry => entry.product.product_id === action.payload)
            const temp = state.cart[index]
            if (temp.amount === 1) {
                return {
                    ...state,
                    cart: [...state.cart.filter(i => i.product.product_id !== temp.product.product_id)]
                }
            } else {
                return {
                    ...state,
                    cart: state.cart.map((entry, i) =>
                        i === index ? {...entry, amount: temp.amount - 1} : entry)
                }
            }
        },
        removeItem: (state, action) => {
            return {
                ...state,
                cart: [...state.cart.filter(i => i.product.product_id !== action.payload)]
            }
        },
        emptyCart: (state, action) => {
            localStorage.removeItem("cart_session")

            return {
                ...state,
                cart: []
            }
        }
    }
})

export const {addToCart, incrementCartItem, decrementCartItem, removeItem, emptyCart} = cartSlice.actions
export default cartSlice.reducer