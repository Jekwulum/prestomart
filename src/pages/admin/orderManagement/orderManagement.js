import React, { useEffect } from "react";
import { PlainTextInput } from "../../../components/forms";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "../../../components/buttons";
import { LatestOrderRow, LatestOrdersComponent } from "../../../components/cards";

import { useDispatch } from "react-redux";
import { fetchOrdersOverview } from "../../../store/actions/adminUserActions";
import { updateOrderOverviewData } from "../../../store/reducers/adminDashboardReducer";

const OrderManagement = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchOrdersOverview()
            .then((res) => {
                console.log(res.data)
                dispatch(updateOrderOverviewData(res.data))
            })
    });

    return (
        <>
            <div className={"mb-4"}>
                <h4>Orders Overview</h4>

                <div className="w-full flex flex-row justify-end">
                    <PlainTextInput containerClasses={"w-1/2 mx-auto"} className={'w-full '}
                        placeholder={"Invoice number or address"}
                        icon={<MagnifyingGlassIcon className={"h-5 w-5"} />} />
                    {/*<TransparentButton>*/}
                    {/*    <FunnelIcon className={"w-6 h-6 mr-1"}/>*/}
                    {/*    <span className={"ml-1"}>View Filters</span>*/}
                    {/*    <ChevronDownIcon className={"w-5 h-5"}/>*/}
                    {/*</TransparentButton>*/}
                </div>
            </div>

            <div className="">
                <LatestOrdersComponent>
                    <LatestOrderRow
                        date={"2022-11-08 11:52:11PM"}
                        deliveryAddress={"26A, Adewale Kolawole Crescent, Lekki Phase 1"}
                        itemCount={"12"}
                        amount={"12000"}
                        status={"paid"}
                        paymentMethod={"Flutterwave"}
                        invoiceNumber={"inv-1234565432dfdfdd"}
                        flvInvNumber={"flv-inv-wedgfnfgdf2323232"}
                    />

                </LatestOrdersComponent>
            </div>

        </>
    )
}

export default OrderManagement