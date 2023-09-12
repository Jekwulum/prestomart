import React, { useEffect } from "react";
import {
  CustomerReviewsComponent,
  HighlightComponent,
  LatestOrderRow,
  LatestOrdersComponent,
  ProductStatisticsComponent
} from "../../../components/cards";
import { DoughnutChart, LineChart } from "../../../components/charts";
import { HorizontalTrackComponent } from "../../../components/track";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../store/reducers/adminReducer";
import { fetchOrdersOverview, fetchVisitorDetails, fetchPaginatedOrders } from "../../../store/actions/adminUserActions";
import { updateOrderOverviewData, updateVisitors } from "../../../store/reducers/adminDashboardReducer";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";


const Dashboard = () => {
  const div1 = { gridArea: "1 / 1 / 2 / 5" },
    div2 = { gridArea: "2 / 1 / 4 / 3" },
    div3 = { gridArea: "2 / 3 / 4 / 5 " },
    div4 = { gridArea: "1 / 5 / 4 / 7 " },
    div5 = { gridArea: "4 / 1 / 6 / 7 " },
    div6 = { gridArea: "6 / 1 / 8 / 7 " }

  const dispatch = useDispatch();
  dispatch(updateLocation("dashboard"));

  const orderOverviewData = useSelector(state => state.adminDashboard.orderOverviewData);
  const adminDashboard = useSelector(state => state.adminDashboard);
  console.log("overview: ", orderOverviewData);

  useEffect(() => {

    fetchPaginatedOrders(adminDashboard.page, adminDashboard.limit - 15)
      .then((res) => {
        dispatch(updateOrderOverviewData(res.data))
      })

    // fetchVisitorDetails()
    //   .then((res) => {
    //     dispatch(updateVisitors(res.data))
    //   })

    // fetchOrdersOverview()
    //   .then((res) => {
    //     dispatch(updateOrderOverviewData(res.data))
    //   })
  }, [adminDashboard.page, adminDashboard.limit]);

  const getItemCountAndPrice = (orders) => {
    return orders.cart_details.reduce(
      (result, cart_detail) => {
        result[0] += cart_detail.amount;
        result[1] += Number(cart_detail.product.price);
        return result;
      }, [0, 0]);
  };

  return (
    <div className={"grid grid-cols-[repeat(6,_1fr)] grid-rows-[repeat(7_1fr)]"}>
      <div style={div1} className={"w-full px-2 py-4"}>
        <div className="font-light">This Month's Highlights</div>
        <HorizontalTrackComponent>
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
          <HighlightComponent title={"22.5%"} subtitle={"Monthly Growth"} />
        </HorizontalTrackComponent>
      </div>
      <div style={div2} className={"px-2 py-4"}>
        <LineChart />
      </div>
      <div style={div3} className={"px-2 py-4"}>
        <DoughnutChart />
      </div>
      <div style={div4} className={"py-12 px-8"}>
        <CustomerReviewsComponent />
      </div>
      <div style={div5} className={"px-2"}>
        <LatestOrdersComponent>
          {(Array.isArray(orderOverviewData) && orderOverviewData.length > 0) ? (
            orderOverviewData.map((i, k) => {
              const [itemCount, price] = getItemCountAndPrice(i);
              let flutterwaveInvoiceId = i.external_invoice_id.startsWith("PMART") ? "nil" : JSON.parse(i.external_invoice_id).flw_ref;
              return (
                <LatestOrderRow
                  key={k}
                  order_session_id={i.order_session_id}
                  date={i.created_at}
                  deliveryAddress={`${i.address_line_1}, ${i.address_line_2} ${i.city} ${i.state}`}
                  itemCount={itemCount}
                  amount={price}
                  status={i.order_state}
                  paymentMethod={i.payment_method}
                  invoiceNumber={i.invoice_id}
                  flvInvNumber={flutterwaveInvoiceId}
                />)
            })
          ) : <div className="flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50 m-auto">
            <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />
          </div>}
        </LatestOrdersComponent>
      </div>
      <div style={div6} className={"px-2 py-4"}>
        <HorizontalTrackComponent>
          <ProductStatisticsComponent />
          <ProductStatisticsComponent />
          <ProductStatisticsComponent />
        </HorizontalTrackComponent>
      </div>
    </div>
  )
}

export default Dashboard;