import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {HorizontalTrackComponent} from "../../../components/track";
import SubcategoryCardComponent from "../../../components/cards/subcategoryCard.component";
import {HighlightItemViewComponent} from "../../../components/cards/highlightItemView.component";
import {MainItemView} from "../../../components/cards";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {updateLocation} from "../../../store/reducers/adminReducer";
import {fetchProducts} from "../../../store/actions/productActions";
import {updatePaginationProp, updateProducts, updateProductsOtherLists} from "../../../store/reducers/productReducer";
import {PaginationButton} from "../../../components/buttons";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";

const Subcategory = () => {
    const {category, subcategory} = useParams()
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [y, setY] = useState(0)

    useEffect(() => {
        dispatch(updateLocation("subcategory"))

        fetchProducts(state.products.page, 20, {
            subcategory: {
                filter: true,
                param: subcategory
            },
            order_by: "quantity"
        })
            .then(
                result => {
                    dispatch(updateProductsOtherLists({list: 1, products: result.data.products}))
                }
            )

        fetchProducts(state.products.page, 20, {
            subcategory: {
                filter: true,
                param: subcategory
            },
            order_by: "newest"
        })
            .then(
                result => {
                    dispatch(updateProductsOtherLists({list: 2, products: result.data.products}))
                }
            )

        fetchProducts(state.products.page, 20, {
            subcategory: {
                filter: true,
                param: subcategory
            },
            order_by: "popularity"
        })
            .then(
                result => {
                    dispatch(updateProductsOtherLists({list: 3, products: result.data.products}))
                }
            )
    }, [subcategory])

    useEffect(() => {
        fetchProducts(state.products.page, 70, {
            subcategory: {
                filter: true,
                param: subcategory
            },
            order_by: state.products.order
        })
            .then(
                result => {
                    dispatch(updatePaginationProp({name: "brands", value: result.data.brands}))
                    dispatch(updatePaginationProp({name: "categories", value: result.data.categories}))
                    dispatch(updatePaginationProp({name: "subcategories", value: result.data.subcategories}))
                    dispatch(updatePaginationProp({name: "count", value: result.data.count}))
                    dispatch(updateProducts(result.data.products))
                }
            )
    }, [state.products.page, subcategory])

    useEffect(() => {
        window.addEventListener("scroll", onScrollFunc)

        return () => {
            window.removeEventListener("scroll", onScrollFunc)
        }
    }, [])
    const onScrollFunc = () => {
        setY(window.innerHeight)
    }

    const setPage = (val) => {
        if (val > 0)
            dispatch(updatePaginationProp({name: "page", value: val}))
    }

    return (
        <>
            <div className={"px-2 mb-20 max-w-7xl mx-auto"}>
                <div className="">
                    <div className="text-center py-4 capitalize bg-[#D13D19] bg-opacity-20 lg:text-lg rounded-t-lg">
                        {subcategory} Subcategory
                    </div>
                    <div className="bg-white rounded-b-lg mb-2">
                        <HorizontalTrackComponent className={"py-0"}>
                            {
                                state.category.categories.filter(i => i.name.toLowerCase() === category)[0] &&
                                state.category.categories.filter(i => i.name.toLowerCase() === category)[0].subcategories
                                    .map(subcat =>
                                        <SubcategoryCardComponent category={category} subcategory={subcat}/>
                                    )
                            }
                        </HorizontalTrackComponent>
                    </div>

                    <div className="my-8">
                        <h4 className={"font-light py-2 text-white bg-[#D13D19] rounded-t-lg px-2"}>Limited Stock</h4>
                        <div className="bg-white rounded-none">
                            <HorizontalTrackComponent className={"py-4 px-2 rounded-none"}>
                                {
                                    state.products.products__1.map((i, k) =>
                                        <HighlightItemViewComponent path={`/categories/${category}/`} className={"mr-2"}
                                                                    key={k} item={i}/>
                                    )
                                }
                            </HorizontalTrackComponent>
                        </div>
                    </div>

                    <div className="my-8">
                        <h4 className={"font-light py-2 text-white bg-[#D13D19] rounded-t-lg px-2"}>New Items</h4>
                        <div className="bg-white rounded-none">
                            <HorizontalTrackComponent className={"py-4 px-2 rounded-none"}>
                                {
                                    state.products.products__2.map((i, k) =>
                                        <HighlightItemViewComponent path={`/categories/${category}/`} className={"mr-2"}
                                                                    key={k} item={i}/>
                                    )
                                }
                            </HorizontalTrackComponent>
                        </div>
                    </div>

                    <div className="my-8">
                        <h4 className={"font-light py-2 text-white bg-[#D13D19] rounded-t-lg px-2"}>Popular Items</h4>
                        <div className="bg-white rounded-none">
                            <HorizontalTrackComponent className={"py-4 px-2 rounded-none"}>
                                {
                                    state.products.products__3.map((i, k) =>
                                        <HighlightItemViewComponent path={`/categories/${category}/`} className={"mr-2"}
                                                                    key={k} item={i}/>
                                    )
                                }
                            </HorizontalTrackComponent>
                        </div>
                    </div>
                </div>


                <div className="flex lg:grid grid-cols-8 gap-2">
                    <div className="hidden lg:block col-span-2">
                        <div className="text-sm rounded-lg bg-white px-2 mt-4 lg:mt-0 divide-y">
                            <div className="pt-4 pb-2">
                                <h4>SUBCATEGORY</h4>
                                <h4 className={"py-2 capitalize"}>{subcategory}</h4>
                            </div>

                            {/*<div className="py-4">*/}
                            {/*    <h4>BRAND</h4>*/}

                            {/*</div>*/}
                            {/*<div className="py-4">*/}
                            {/*    <h4>PRICE</h4>*/}

                            {/*</div>*/}
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <div className="capitalize px-2">
                            <h4 className={"py-2 pb-4"}>
                                {subcategory} ({state.products.count})
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {
                                state.products.products.map((i, k) =>
                                    <MainItemView key={k} item={i}/>
                                )
                            }
                        </div>
                        <div className="flex flex-row justify-center w-full items-center py-4">
                            {
                                (state.products.page - 2) < 1 ? <></> :
                                    <PaginationButton
                                        onClick={() => {
                                            setPage(parseInt(state.products.page) - 2)
                                        }}
                                        icon={<ChevronDoubleLeftIcon className={"w-6 h-6"}/>}/>
                            }
                            {
                                (state.products.page - 1) < 1 ? <></> :
                                    <PaginationButton
                                        onClick={() => {
                                            setPage(parseInt(state.products.page) - 1)
                                        }}
                                        icon={<ChevronLeftIcon className={"w-6 h-6"}/>}/>
                            }
                            <PaginationButton icon={state.products.page}/>
                            <PaginationButton
                                onClick={() => {
                                    setPage(parseInt(state.products.page) + 1)
                                }}
                                icon={<ChevronRightIcon className={"w-6 h-6"}/>}/>
                            <PaginationButton
                                onClick={() => {
                                    setPage(parseInt(state.products.page) + 1)
                                }}
                                icon={<ChevronDoubleRightIcon className={"w-6 h-6"}/>}/>
                        </div>
                    </div>

                    <div className="col-span-6 bg-white rounded-lg py-4 px-2 divide-y hidden lg:block">
                        <div className="capitalize px-2 hidden lg:block">
                            <h4 className={"py-2 pb-4"}>
                                {subcategory} ({state.products.count})
                            </h4>
                        </div>
                        <div
                            className="hidden lg:grid grid-cols-3 xl:grid-cols-4 lg:gap-4 lg:py-2 xl:gap-2">
                            {
                                state.products.products.map((i, k) =>
                                    <MainItemView key={k} item={i}/>
                                )
                            }
                        </div>

                        <div className="flex flex-row justify-center w-full items-center py-4">
                            {
                                (state.products.page - 2) < 1 ? <></> :
                                    <PaginationButton
                                        onClick={() => {
                                            setPage(parseInt(state.products.page) - 2)
                                        }}
                                        icon={<ChevronDoubleLeftIcon className={"w-6 h-6"}/>}/>
                            }
                            {
                                (state.products.page - 1) < 1 ? <></> :
                                    <PaginationButton
                                        onClick={() => {
                                            setPage(parseInt(state.products.page) - 1)
                                        }}
                                        icon={<ChevronLeftIcon className={"w-6 h-6"}/>}/>
                            }
                            <PaginationButton icon={state.products.page}/>
                            <PaginationButton
                                onClick={() => {
                                    setPage(parseInt(state.products.page) + 1)
                                }}
                                icon={<ChevronRightIcon className={"w-6 h-6"}/>}/>
                            <PaginationButton
                                onClick={() => {
                                    setPage(parseInt(state.products.page) + 1)
                                }}
                                icon={<ChevronDoubleRightIcon className={"w-6 h-6"}/>}/>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="w-full divide-x flex flex-row text-center bg-[#2C2C2C] text-white py-1 text-sm uppercase fixed bottom-0 left-0 right-0 lg:hidden z-20">
                <div className="py-2 w-1/2 flex flex-row justify-center items-center">Popularity <ChevronDownIcon
                    className={"w-4 h-4 ml-1"}/></div>
                <div className="py-2 w-1/2">Filter</div>
            </div>
        </>
    )
}
export default Subcategory