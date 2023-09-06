import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { FunnelIcon } from "@heroicons/react/24/outline";
import { TransparentButton } from "../buttons";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const state = useSelector(state => state.adminDashboard)
  const [filter, setFilter] = useState("month")
  const [data, setData] = useState({
    labels: ["Success", "Pending", "Cancelled"],
    datasets: []
  });

  const parseOrderData = (data, filter) => {
    let res = {
      Success: 0,
      Pending: 0,
      Cancelled: 0,
    }

    if (Array.isArray(data)) {
      switch (filter) {
        case "month":
          data.filter(entry => new Date(entry.created_at) > new Date(Date.now() - 12 * 4 * 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            if (entry.order_state === "placed")
              res.Pending = res.Pending += 1
            if (entry.order_state === "Cancelled")
              res.Cancelled = res.Cancelled += 1
            if (entry.order_state === "delivered")
              res.Success = res.Success += 1
          })
          break
        case "day":
          data.filter(entry => new Date(entry.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            if (entry.order_state === "placed")
              res.Pending = res.Pending += 1
            if (entry.order_state === "Cancelled")
              res.Cancelled = res.Cancelled += 1
            if (entry.order_state === "delivered")
              res.Success = res.Success += 1
          })
          break
        case "week":
          data.filter(entry => new Date(entry.created_at) > new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            if (entry.order_state === "placed")
              res.Pending = res.Pending += 1
            if (entry.order_state === "Cancelled")
              res.Cancelled = res.Cancelled += 1
            if (entry.order_state === "delivered")
              res.Success = res.Success += 1
          })
          break
      }
    }
    return res
  }

  useEffect(() => {
    let temp = parseOrderData(state.orderOverviewData, filter)

    setData({
      labels: Object.keys(temp),
      datasets: [
        {
          data: Object.values(temp),
          borderColor: ["#18C06C", "#FFC630", "#F03434"],
          backgroundColor: ["#18C06C", "#FFC630", "#F03434"],
        }
      ]
    })
  }, [state.orderOverviewData, filter])

  return (
    <div
      className={"h-full flex justify-center items-center flex-col border border-slate-400 px-6 py-4 rounded shadow-xl"}>
      <div className="flex flex-row w-full justify-between">
        <div className="font-bold mb-6">
          <h4>Order Status</h4>
          <h6 className={"font-light text-sm"}>View website total earnings</h6>
        </div>

        <div className="">
          <TransparentButton>
            <FunnelIcon className={"w-6 h-6 mr-1"} />
            <select onChange={e => setFilter(e.target.value)} name="filter" id="filter"
              className={"bg-transparent px-1/2 py-1 outline-none"}>
              <option value="month">View Filters</option>
              <option value="day">Last 7 Days</option>
              <option value="week">Last Month</option>
              <option value="month">Last Year</option>
            </select>
          </TransparentButton>
        </div>
      </div>

      <div className="w-full  flex flex-row items-center">
        <div className="w-1/2 mx-auto">
          <Doughnut
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
            }}
            data={data}
          />
        </div>

        <div className="hidden flex justify-center items-center">
          <table>
            <tbody>
              <tr>
                <td className={"px-4 text-[#18C06C] font-bold"}>Success</td>
                <td>75%</td>
              </tr>
              <tr>
                <td className={"px-4 text-[#FFC630] font-bold"}>Pending</td>
                <td>25%</td>
              </tr>
              <tr>
                <td className={"px-4 text-[#F03434] font-bold"}>Cancelled</td>
                <td>0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <div className="flex flex-row w-full justify-center pt-8 pb-2">
        <h6 className={"px-4 text-[#18C06C] font-bold"}>Success: {(data.datasets[0] || { data: [] }).data[0]}</h6>
        <h6 className={"px-4 text-[#FFC630] font-bold"}>Pending: {(data.datasets[0] || { data: [] }).data[1]}</h6>
        <h6 className={"px-4 text-[#F03434] font-bold"}>Cancelled: {(data.datasets[0] || { data: [] }).data[2]}</h6>
      </div>
    </div>
  )
}