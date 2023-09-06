import {Link, useParams, useSearchParams} from "react-router-dom";
import {MainItemView} from "../../components/cards";
import {LinkButton, PaginationButton} from "../../components/buttons";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HorizontalTrackComponent} from "../../components/track";
import {searchProduct} from "../../store/actions/productActions";
import {updatePaginationProp, updateProducts} from "../../store/reducers/productReducer";
import {updateLocation} from "../../store/reducers/adminReducer";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    let timer;

    useEffect(() => {
        dispatch(updateLocation("search"))
    }, [])

    useEffect(() => {
        searchFor()
    }, [state.products.page])

    const searchFor = () => {
        searchProduct({
            query: state.products.productQuery.length === 0 ? searchParams.get("query") : state.products.productQuery,
            page: state.products.page,
            limit: state.products.limit,
            conditions: JSON.stringify({
                order: state.products.order
            })
        })
            .then((result) => {
                dispatch(updateProducts(result.data.products))
                dispatch(updatePaginationProp({name: "brands", value: result.data.brands}))
                dispatch(updatePaginationProp({name: "categories", value: result.data.categories}))
                dispatch(updatePaginationProp({name: "subcategories", value: result.data.subcategories}))
                dispatch(updatePaginationProp({name: "count", value: result.data.count}))
                dispatch(updatePaginationProp({name: "searchLoadingState", value: false}))
            })
            .catch(() => dispatch(updatePaginationProp({name: "searchLoadingState", value: false})))
    }

    const setPage = (val) => {
        console.log(val)
        if (val > 0)
            dispatch(updatePaginationProp({name: "page", value: val}))
    }

    useEffect(() => {
        clearTimeout(timer)
        timer = setTimeout(searchFor, 500)
        dispatch(updatePaginationProp({name: "searchLoadingState", value: true}))

        return () => clearTimeout(timer)
    }, [state.products.productQuery])

    return (
        <>
            <HorizontalTrackComponent
                className="py-3 flex flex-row w-full items-center px-2 text-sm font-light max-w-7xl mx-auto overflow-x-scroll">
                <Link to={"/home"} className="pr-1">Home</Link>

                <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                <span>All Products</span>

                <ChevronRightIcon className={"w-4 h-4 mr-1"}/>
                <span>{state.products.productQuery.length === 0 ? searchParams.get("query") : state.products.productQuery}</span>
            </HorizontalTrackComponent>

            <div className="flex lg:grid grid-cols-8 gap-2">
                <div className="hidden lg:block col-span-2">
                    <div className="text-sm rounded-lg bg-white px-2 mt-4 lg:mt-0 divide-y">
                        <div className="pt-4 pb-2">
                            <h4>CATEGORY</h4>
                            {/*{*/}
                            {/*    */}
                            {/*}*/}
                            {/*<h4 className={"py-2 capitalize"}>{category}</h4>*/}

                            {/*{*/}
                            {/*    state.category.categories.filter(i => i.name.toLowerCase() === category)[0] &&*/}
                            {/*    state.category.categories.filter(i => i.name.toLowerCase() === category)[0].subcategories*/}
                            {/*        .map(subcat =>*/}
                            {/*            <Link*/}
                            {/*                className={"block py-2 px-4"}*/}
                            {/*                to={`/categories/${category}/subcategories/${subcat.name.toLowerCase()}`}*/}
                            {/*            >{subcat.name}*/}
                            {/*            </Link>*/}
                            {/*        )*/}
                            {/*}*/}
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
                            Search Results ({state.products.count})
                        </h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
                        {
                            state.products.products.map((i, k) =>
                                <MainItemView key={k} item={i}/>
                            )
                        }
                        {
                            state.products.products.length === 0 ?
                                <div className={"bg-white lg:bg-transparent py-8 px-5 text-center font-light"}>
                                    <p className={"pb-2"}>There are no results
                                        for {state.products.productQuery.length === 0 ? searchParams.get("query") : state.products.productQuery}</p>
                                    <LinkButton location={"/"} bg={"#000"}>
                                        Go to Homepage
                                    </LinkButton>
                                </div> : null
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
                            Search Results ({state.products.count})
                        </h4>
                    </div>
                    <div
                        className="hidden lg:grid grid-cols-3 xl:grid-cols-4 lg:gap-4 lg:py-2 xl:gap-2">
                        {
                            state.products.products.map((i, k) =>
                                <MainItemView key={k} item={i}/>
                            )
                        }
                        {
                            state.products.products.length === 0 ?
                                <>
                                    <div
                                        className={"bg-white lg:bg-transparent py-8 px-5 text-center font-light flex justify-center items-center flex-col lg:h-[300px]"}>
                                        <p className={"pb-2"}>There are no results
                                            for {state.products.productQuery.length === 0 ? searchParams.get("query") : state.products.productQuery}</p>
                                        <LinkButton location={"/"} bg={"#000"}>
                                            Go to Homepage
                                        </LinkButton>
                                    </div>
                                </>
                                : null
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

            <div className="py-4 px-2">
                <h4 className="py-2 font-light text-lg ">
                    Recently Viewed
                </h4>

                <HorizontalTrackComponent className={"bg-white"}>

                </HorizontalTrackComponent>
            </div>
        </>
    )
}

export default Search