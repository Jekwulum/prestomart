import React, { useEffect } from "react";
import { Banner, Categories, LandingCarousel, MainItemView, } from "../../components/cards";
import { useDispatch, useSelector } from "react-redux";
import { HorizontalTrackComponent } from "../../components/track";
import { fetchProducts, fetchProducts_Order } from "../../store/actions/productActions";
import { updateProducts, updateProductsOtherLists } from "../../store/reducers/productReducer";
import { updateLocation } from "../../store/reducers/adminReducer";
import { HighlightItemViewComponent } from "../../components/cards/highlightItemView.component";

const LandingPage = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateLocation("home"))

        fetchProducts(state.products.page, 20, { order_by: "newest" })
            .then(
                result => {
                    dispatch(updateProductsOtherLists({ list: 1, products: result.data.products }))
                }
            )
    }, [])

    useEffect(() => {
        fetchProducts(state.products.page, 20, { order_by: "popularity" })
            .then(
                result => {
                    dispatch(updateProducts(result.data.products))
                }
            )
    }, [state.products.limit, state.products.page])

    return (
        <>
            <div className="container max-w-7xl mx-auto">
                <div className="mt-4 flex flex-col-reverse md:grid grid-cols-9 gap-2">
                    <div className="col-span-2">
                        <Categories />
                    </div>

                    <div className="col-span-7 flex justify-center align-center">
                        <LandingCarousel />
                    </div>
                </div>

                <div className="py-4">
                    <h4 className="py-2 font-light">
                        New Items
                    </h4>

                    <HorizontalTrackComponent className={"bg-white"}>
                        {
                            state.products.products__1.map((i, k) =>
                                <HighlightItemViewComponent path={``} className={"mr-2"}
                                    key={k} item={i} />
                            )
                        }
                    </HorizontalTrackComponent>
                </div>

                <div className="flex justify-center items-center mt-12 px-4">
                    <Banner />
                </div>
                <div className="mt-12 px-2">
                    <h2 className={"md:text-xl font-light"}>Popular Items</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 lg:grid-cols-5 xl:gap-4 mt-8">
                        {
                            state.products.products.map((i, k) =>
                                <MainItemView key={k} item={i} />
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center my-12 px-4">
                <Banner />
            </div>
        </>
    );
};

export default LandingPage;
