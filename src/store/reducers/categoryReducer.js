import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        category: {},
        subcategory: {},
    },
    reducers: {
        updateCategories: (state, action) => {
            return {
                ...state,
                category: {},
                subcategory: {},
                categories: action.payload
            }
        },
        updateCategoryProp__L1: (state, action) => {
            return {
                ...state,
                category: {
                    ...state.category,
                    [action.payload.name]: action.payload.value
                }
            }
        },
        updateSubcategoryProp__L1: (state, action) => {
            return {
                ...state,
                subcategory: {
                    ...state.subcategory,
                    [action.payload.name]: action.payload.value
                }
            }
        },
        setCategory: (state, action) => {
            const index = state.categories.findIndex(category => category.product_category_id === action.payload)
            if (index === -1) return {...state, category: {}}
            else
                return {
                    ...state,
                    category: state.categories[state.categories.findIndex(category => category.product_category_id === action.payload)]
                }
        },
        setSubcategory: (state, action) => {
            const catIndex = state.categories.findIndex(category => category.product_category_id === action.payload.cat)
            if (catIndex === -1) {
                return {...state}
            }

            const index = state.categories[catIndex].subcategories.findIndex(subcategory => subcategory.product_subcategory_id === action.payload.subCat)
            if (index === -1) return {...state}
            else
                return {
                    ...state,
                    subcategory: state.categories[catIndex].subcategories[index]
                }
        },
        emptyCategory: (state, action) => {
            return {
                ...state,
                category: {}
            }
        },
        emptySubcategory: (state, action) => {
            return {
                ...state,
                subcategory: {}
            }
        }
    },
})

export const {
    updateCategories,
    updateCategoryProp__L1,
    setCategory,
    setSubcategory,
    emptyCategory,
    emptySubcategory,
    updateSubcategoryProp__L1
} = categorySlice.actions
export default categorySlice.reducer