import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { HorizontalTrackComponent } from "../../../components/track";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../store/reducers/adminReducer";
import { toast } from "react-toastify";
import { fetchCategories } from "../../../store/actions/categoryActions";
import { updateCategories } from "../../../store/reducers/categoryReducer";
import { fetchProducts } from "../../../store/actions/productActions";
import { updateProducts, updatePaginationProp } from "../../../store/reducers/productReducer";

const ContentManagementLayout = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {
        dispatch(updateLocation("content"))
    }, [])


    useEffect(() => {
        toast.promise(fetchCategories(), {
            pending: "Fetching categories...",
            success: "Now showing all categories...",
            error: "Oops, something went wrong!"
        })
            .then(res => {
                dispatch(updateCategories(res.data))
            })
    }, [])

    useEffect(() => {
        toast.promise(fetchProducts(state.products.page, state.products.limit), {
            pending: "Fetching products",
            success: `Now showing ${state.products.limit} products from page ${state.products.page} `
        })
            .then(
                result => {
                    dispatch(updateProducts(result.data.products));
                    dispatch(updatePaginationProp({ name: "searchLoadingState", value: false }))
                }
            )
    }, [state.products.limit, state.products.page])

    return (
        <div className={"relative"}>
            <HorizontalTrackComponent className={""}>
                <Link className={"px-4 py-2 border-b"} to={"/admin/content/products"}>Products Management</Link>
                <Link className={"px-4 py-2 border-b"} to={"/admin/content/categories"}>Categories Management</Link>
            </HorizontalTrackComponent>

            <Outlet />
        </div>
    )
}

export default ContentManagementLayout