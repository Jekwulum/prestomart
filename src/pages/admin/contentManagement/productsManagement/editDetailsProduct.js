import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { HorizontalTrackComponent } from "../../../../components/track";
import { ProductDetailsForm, ProductOverviewForm } from "./forms";
import { Button, ButtonGroup, LinkButton } from "../../../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { emptyProduct, setProduct, updateProducts } from "../../../../store/reducers/productReducer";
import { fetchProducts, updateProductTextDetailsServer } from "../../../../store/actions/productActions";
import { ProductInventoryForm } from "./forms/productInventory";

export const EditDetailsProduct = () => {
    const { slug } = useParams()
    const state = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setProduct(slug))
    }, [])

    const updateProductTextDetails = () => {
        updateProductTextDetailsServer(state.product).then(() => {
            fetchProducts(state.page, state.limit)
                .then(
                    result => {
                        dispatch(updateProducts(result.data))
                        dispatch(emptyProduct)
                        return <Navigate to={"/admin/content/products"} />
                    }
                )
        })
    }

    return (
        <div
            className={"h-screen w-full bg-slate-300 fixed bg-opacity-50 z-50 transform -translate-x-3 -translate-y-20 flex justify-center items-center"}>
            {
                (Object.entries(state.product).length === 0) ?
                    <Navigate to={'/admin/content/products'} /> : null
            }
            <div className="w-fit">
                <Tabs className={"max-w-2xl transform -translate-y-20"}
                    style={{ minWidth: "656px", height: "678px", maxHeight: "678px" }}>
                    <TabList>
                        <HorizontalTrackComponent className={"py-0 "}>
                            <Tab
                                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Overview</Tab>
                            <Tab
                                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Inventory</Tab>
                            <Tab
                                className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl mr-auto"}
                                selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Details</Tab>
                        </HorizontalTrackComponent>
                    </TabList>

                    <TabPanel
                        className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
                        style={{ maxHeight: "615px" }}>
                        <ProductOverviewForm />
                    </TabPanel>
                    <TabPanel
                        className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
                        style={{ maxHeight: "615px" }}>
                        <ProductInventoryForm />
                    </TabPanel>
                    <TabPanel
                        className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
                        style={{ maxHeight: "615px" }}>
                        <ProductDetailsForm />
                    </TabPanel>

                    <div className="w-full px-4 pb-2 bg-white">
                        <ButtonGroup className={"justify-end"}>
                            <LinkButton location={"/admin/content/products"} size={"sm"} text={"Close"} bg={"red"}
                                color={"white"} />
                            <Button size={"sm"} text={"Save"} bg={"blue"} color={"white"}
                                onClick={updateProductTextDetails} />
                        </ButtonGroup>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}