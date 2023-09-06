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
import { useDispatch } from "react-redux";
import { updateLocation } from "../../../store/reducers/adminReducer";
import { fetchOrdersOverview, fetchVisitorDetails } from "../../../store/actions/adminUserActions";
import { updateOrderOverviewData, updateVisitors } from "../../../store/reducers/adminDashboardReducer";

const Dashboard = () => {
  const div1 = { gridArea: "1 / 1 / 2 / 5" },
    div2 = { gridArea: "2 / 1 / 4 / 3" },
    div3 = { gridArea: "2 / 3 / 4 / 5 " },
    div4 = { gridArea: "1 / 5 / 4 / 7 " },
    div5 = { gridArea: "4 / 1 / 6 / 7 " },
    div6 = { gridArea: "6 / 1 / 8 / 7 " }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateLocation("dashboard"))

    fetchVisitorDetails()
      .then((res) => {
        dispatch(updateVisitors(res.data))
      })

    fetchOrdersOverview()
      .then((res) => {
        dispatch(updateOrderOverviewData(res.data))
      })
  }, [])

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