import React, { useEffect } from "react";
import { PlainTextInput } from "../../../components/forms";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "../../../components/buttons";
import { LatestOrderRow, LatestOrdersComponent } from "../../../components/cards";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { formatTimestamp } from "../../../utils/helpers";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersOverview, fetchAllOrders } from "../../../store/actions/adminUserActions";
import { updateOrderOverviewData, updateAllOrders } from "../../../store/reducers/adminDashboardReducer";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.adminDashboard.allOrders);

  const getItemCountAndPrice = (orders) => {
    return orders.cart_details.reduce(
      (result, cart_detail) => {
        result[0] += cart_detail.amount; // Add to itemCount
        result[1] += Number(cart_detail.product.price); // Add to total price
        return result;
      },
      [0, 0] // Initial values for itemCount and price
    );
  };

  useEffect(() => {
    fetchAllOrders()
      .then((res) => {
        dispatch(updateAllOrders(res.data))
      })

    // fetchOrdersOverview()
    //     .then((res) => {
    //         console.log(res.data)
    //         dispatch(updateOrderOverviewData(res.data))
    //     })
  }, []);

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
          {/* <LatestOrderRow
            date={"2022-11-08 11:52:11PM"}
            deliveryAddress={"26A, Adewale Kolawole Crescent, Lekki Phase 1"}
            itemCount={"12"}
            amount={"12000"}
            status={"paid"}
            paymentMethod={"Flutterwave"}
            invoiceNumber={"inv-1234565432dfdfdd"}
            flvInvNumber={"flv-inv-wedgfnfgdf2323232"}
          /> */}
          {Array.isArray(allOrders) ? (
            allOrders.map((i, k) => {
              const [itemCount, price] = getItemCountAndPrice(i);
              return (
                <LatestOrderRow
                  key={k}
                  date={formatTimestamp(i.created_at)}
                  deliveryAddress={`${i.address_line_1}, ${i.address_line_2} ${i.city} ${i.state}`}
                  itemCount={itemCount}
                  amount={price}
                  status={i.order_state}
                  paymentMethod={i.payment_method}
                  invoiceNumber={i.invoice_id}
                />)
            })
          ) : <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />}

        </LatestOrdersComponent>
      </div>

    </>
  )
}

export default OrderManagement