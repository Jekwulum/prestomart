import {CustomerSiteFooterComponent, CustomerSiteHeaderComponent} from "../../components/headers";
import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {fetchCategories} from "../../store/actions/categoryActions";
import {updateCategories} from "../../store/reducers/categoryReducer";
import {fetchProducts} from "../../store/actions/productActions";
import {updateProducts} from "../../store/reducers/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {registerVisit} from "../../store/actions/publicActions";

const PublicLayout = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {
        // registerVisit()
        //     .then(res => {
        //         if (typeof res.data.iden === 'string')
        //             localStorage.setItem("iden", res.data.iden)
        //     })

        fetchCategories()
            .then(res => {
                dispatch(updateCategories(res.data))
            })
    }, [])

    useEffect(() => {
        localStorage.setItem("cart_session", JSON.stringify(state.cart.cart))
    }, [state.cart.cart])

    return (
        <>
            <CustomerSiteHeaderComponent/>
            <div className="max-w-7xl mx-auto px-2">
                <Outlet/>
            </div>
            <CustomerSiteFooterComponent/>
        </>
    )
}

export default PublicLayout