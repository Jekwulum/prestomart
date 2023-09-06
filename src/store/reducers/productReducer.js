import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        page: 1,
        limit: 50,
        order: "popularity",
        productQuery: "",
        searchLoadingState: true,
        brands: [],
        count: 0,
        categories: [],
        subcategories: [],
        products: [],
        products__1: [],
        products__2: [],
        products__3: [],
        product: {},
        discount: {},
        description: { details: '', key_features: '', box_details: '', specifications: '' }
    },
    reducers: {
        updateProducts: (state, action) => {
            return {
                ...state,
                product: {},
                products: action.payload
            }
        },
        updateProductsOtherLists: (state, action) => {
            switch (action.payload.list) {
                case 1:
                    return {
                        ...state,
                        products__1: action.payload.products
                    }
                    break
                case 2:
                    return {
                        ...state,
                        products__2: action.payload.products
                    }
                    break
                case 3:
                    return {
                        ...state,
                        products__3: action.payload.products
                    }
                    break
                default:
                    return state
                    break
            }
        },
        updatePaginationProp: (state, action) => {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        },
        setProduct: (state, action) => {
            const index = state.products.findIndex(product => product.slug === action.payload)
            if (index === -1) return { ...state, product: {} }
            else
                return {
                    ...state,
                    product: state.products[state.products.findIndex(product => product.slug === action.payload)]
                }
        },
        overrideSetProduct: (state, action) => {
            return {
                ...state,
                product: action.payload
            }
        },
        updateProductProp__L1: (state, action) => {
            return {
                ...state,
                product: {
                    ...state.product,
                    [action.payload.name]: action.payload.value
                }
            }
        },
        emptyProduct: (state, action) => {
            return {
                ...state,
                product: {}
            }
        },
        setDiscount: (state, action) => {
            return {
                ...state,
                discount: {
                    ...state.discount,
                    [action.payload.name]: action.payload.value
                }
            }
        },
        updateDiscounts: (state, action) => {
            return {
                ...state,
                product: {
                    ...state.product,
                    discount: action.payload
                }
            }
        },
        emptyDiscount: (state, action) => {
            return {
                ...state,
                discount: {
                    desc: ""
                }
            }
        }
    }
})

export const {
    updateProducts,
    setProduct,
    overrideSetProduct,
    updateProductProp__L1,
    emptyProduct,
    setDiscount,
    emptyDiscount,
    updateProductsOtherLists,
    updatePaginationProp,
    updateDiscounts
} = productSlice.actions
export default productSlice.reducer