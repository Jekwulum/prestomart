import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {HorizontalTrackComponent} from "../../../../components/track";
import {ProductDiscounts, ProductImagesForm} from "./forms";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {setProduct} from "../../../../store/reducers/productReducer";

export const EditMarketingProduct = () => {
    const {slug} = useParams()
    const dispatch = useDispatch()
    const state = useSelector(state => state.products.product)

    useEffect(() => {
        dispatch(setProduct(slug))
    }, [])

    return (
        <div
            className={"h-screen w-full bg-slate-300 fixed bg-opacity-50 z-50 transform -translate-x-3 -translate-y-20 flex justify-center items-center"}>
            {/*{*/}
            {/*    Object.keys(state).length === 0 ?*/}
            {/*        <Navigate to={"/admin/contentManagement/products"}/>*/}
            {/*        :*/}
                    <div className="w-fit">
                        <Tabs className={"max-w-2xl transform -translate-y-20"}
                              style={{minWidth: "656px", height: "678px", maxHeight: "678px"}}>
                            <TabList>
                                <HorizontalTrackComponent className={"py-0 "}>
                                    <Tab
                                        className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                                        selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Images</Tab>
                                    <Tab
                                        className={"outline-none cursor-pointer px-4 py-2 border-t border-l border-r rounded-t bg-gray-300 font-light border-slate-500 shadow-inner shadow-xl"}
                                        selectedClassName={"shadow-lg border-none bg-white-important shadow-none"}>Discounts</Tab>
                                </HorizontalTrackComponent>
                            </TabList>

                            <TabPanel
                                className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
                                style={{maxHeight: "615px"}}>
                                <ProductImagesForm/>
                            </TabPanel>
                            <TabPanel
                                className={" bg-white-important px-4 py-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300"}
                                style={{maxHeight: "615px"}}>
                                <ProductDiscounts/>
                            </TabPanel>
                        </Tabs>
                    </div>
            {/*}*/}
        </div>
    )
}