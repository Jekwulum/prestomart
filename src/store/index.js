import authReducer from './reducers/authReducer';
import {configureStore} from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminReducer";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import historyReducer from "./reducers/historyReducer";
import user from "./reducers/adminUserReducer"
import cartReducer from "./reducers/cartReducer";
import adminDashboardReducer from "./reducers/adminDashboardReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        adminDashboard: adminDashboardReducer,
        products: productReducer,
        category: categoryReducer,
        history: historyReducer,
        user: user,
        cart: cartReducer
    }
})