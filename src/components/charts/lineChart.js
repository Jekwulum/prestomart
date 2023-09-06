import React, { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CircleStackIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { TransparentButton } from "../buttons";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = () => {
  const state = useSelector(state => state.adminDashboard)
  const [filter, setFilter] = useState("month")
  const [visitorType, setVisitorType] = useState("new")

  const parseVisitorData = (data, filter) => {
    let res = {}

    switch (filter) {
      case "month":
        if (Array.isArray(data)) {
          data.filter(entry => new Date(entry.created_at) > new Date(Date.now() - 12 * 4 * 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            let temp = new Date(entry.created_at).toLocaleDateString(
              'en-gb',
              {
                month: 'short',
              })

            if (Object.keys(res).includes(temp))
              res[temp] = res[temp] + 1
            else
              res[temp] = 1
          });
        }
        break;
      case "day":
        if (Array.isArray(data)) {
          data.filter(entry => new Date(entry.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            let temp = new Date(entry.created_at).toLocaleDateString(
              'en-gb',
              {
                weekday: 'short',
              })

            if (Object.keys(res).includes(temp))
              res[temp] = res[temp] + 1
            else
              res[temp] = 1
          })
        }
        break
      case "week":
        if (Array.isArray(data)) {
          data.filter(entry => new Date(entry.created_at) > new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            let temp = new Date(entry.created_at).toLocaleDateString(
              'en-gb',
              {
                day: 'numeric',
              })

            const currDate = new Date().toLocaleDateString(
              'en-gb',
              {
                day: 'numeric',
              })

            if (parseInt(temp) > parseInt(currDate) && parseInt(temp) <= (parseInt(currDate) + 7)) {
              if (Object.keys(res).includes("Week 1"))
                res["Week 1"] = res["Week 1"] + 1
              else
                res["Week 1"] = 1
            } else if (parseInt(temp) > (parseInt(currDate) + 7) && parseInt(temp) <= (parseInt(currDate) + 14)) {
              if (Object.keys(res).includes("Week 2"))
                res["Week 2"] = res["Week 2"] + 1
              else
                res["Week 2"] = 1
            } else if (parseInt(temp) > (parseInt(currDate) + 14) && parseInt(temp) <= (parseInt(currDate) + 21)) {
              if (Object.keys(res).includes("Week 3"))
                res["Week 3"] = res["Week 3"] + 1
              else
                res["Week 3"] = 1
            } else if (parseInt(temp) > (parseInt(currDate) + 21)) {
              if (Object.keys(res).includes("Week 4"))
                res["Week 4"] = res["Week 4"] + 1
              else
                res["Week 4"] = 1
            }
          })
        }
        break
    }

    return res
  }

  const parseUniqueVisitorData = (data, filter) => {
    let res = {}

    if (Array.isArray(data)) {
      switch (filter) {
        case "month":
          data.filter((v, i, s) =>
            i === s.findIndex(t => t.visitor_identifier === v.visitor_identifier)
          ).forEach(entry => {
            let temp = new Date(entry.created_at).toLocaleDateString(
              'en-gb',
              {
                month: 'short',
              })

            if (Object.keys(res).includes(temp))
              res[temp] = res[temp] + 1
            else
              res[temp] = 1
          })
          break
        case "day":
          data.filter((v, i, s) =>
            i === s.findIndex(t => t.visitor_identifier === v.visitor_identifier)
          ).filter(entry => new Date(entry.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            let temp = new Date(entry.created_at).toLocaleDateString(
              'en-gb',
              {
                weekday: 'short',
              })

            if (Object.keys(res).includes(temp))
              res[temp] = res[temp] + 1
            else
              res[temp] = 1
          })
          break
        case "week":
          data.filter((v, i, s) =>
            i === s.findIndex(t => t.visitor_identifier === v.visitor_identifier)
          ).filter(entry => new Date(entry.created_at) > new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000)).forEach(entry => {
            let temp = new Date(entry.created_at).toLocaleDateString(
              'en-gb',
              {
                day: 'numeric',
              })

            const currDate = new Date().toLocaleDateString(
              'en-gb',
              {
                day: 'numeric',
              })

            if (parseInt(temp) > parseInt(currDate) && parseInt(temp) <= (parseInt(currDate) + 7)) {
              if (Object.keys(res).includes("Week 1"))
                res["Week 1"] = res["Week 1"] + 1
              else
                res["Week 1"] = 1
            } else if (parseInt(temp) > (parseInt(currDate) + 7) && parseInt(temp) <= (parseInt(currDate) + 14)) {
              if (Object.keys(res).includes("Week 2"))
                res["Week 2"] = res["Week 2"] + 1
              else
                res["Week 2"] = 1
            } else if (parseInt(temp) > (parseInt(currDate) + 14) && parseInt(temp) <= (parseInt(currDate) + 21)) {
              if (Object.keys(res).includes("Week 3"))
                res["Week 3"] = res["Week 3"] + 1
              else
                res["Week 3"] = 1
            } else if (parseInt(temp) > (parseInt(currDate) + 21)) {
              if (Object.keys(res).includes("Week 4"))
                res["Week 4"] = res["Week 4"] + 1
              else
                res["Week 4"] = 1
            }
          })
          break
      }
    }

    console.log(res)
    return res
  }

  useEffect(() => {
    let temp;

    if (visitorType === "new")
      temp = parseVisitorData(state.visitorData, filter)
    else
      temp = parseUniqueVisitorData(state.visitorData, filter)

    setData({
      labels: Object.keys(temp),
      datasets: [
        {
          data: Object.values(temp),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    })
  }, [state.visitorData, filter, visitorType])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
  };

  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar"],
    datasets: []
  });

  return (
    <div
      className={"h-full flex justify-center items-center flex-col border border-slate-400 px-6 pt-6 pb-5 rounded w-full shadow-xl"}>
      <div className="w-full flex flex-row justify-between">
        <div className="font-bold mb-6">
          <h4>Website Visitor Performance</h4>
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

      <div className="text-sm flex flex-row justify-around py-4">
        <div className="cursor-pointer flex items-center flex-row mr-6" onClick={() => setVisitorType("new")}>
          <CircleStackIcon className={"mr-2 text-blue-400 h-4 w-4"} />
          New Visitors
        </div>
        <div className="cursor-pointer flex items-center flex-row" onClick={() => setVisitorType("returning")}>
          <CircleStackIcon className={"mr-2 text-blue-900 h-4 w-4"} />
          Returning Visitors
        </div>
      </div>

      <div className="w-full  flex flex-row items-center">
        <Line
          options={options}
          data={data}
        />
      </div>
    </div>
  )
}