import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownTrayIcon, ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Button, TransparentButton } from "../buttons";
import { formatTimestamp } from "../../utils/helpers";

export const LatestOrdersComponent = ({ children }) => {


  return (
    <div className={"w-full rounded border border-slate-300 py-4 px-6 shadow-lg "}>
      <div className="flex flex-row justify-between">
        <h4 className={"font-bold"}>Latest Orders</h4>

        <div className="flex flex-row">
          <Button text={"View All Orders"} bg={"#000000"} size={"md"} className={"mr-2"} />
          <TransparentButton>
            <FunnelIcon className={"w-6 h-6 mr-1"} />
            <span className={"ml-1"}>View Filters</span>
            <ChevronDownIcon className={"w-5 h-5"} />
          </TransparentButton>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className={"text-left border-b border-slate-800"}>
            <th className={"pt-4 pb-2 "}>Date</th>
            <th className={"pt-4 pb-2 "}>Delivery Address</th>
            <th className={"pt-4 pb-2 "}>Item Count</th>
            <th className={"pt-4 pb-2 "}>Amount</th>
            <th className={"pt-4 pb-2 "}>Status</th>
            <th className={"pt-4 pb-2 "}>Payment Method</th>
            <th className={"pt-4 pb-2 "}>Invoice Number</th>
            <th className={"pt-4 pb-2 "}>Flutterwave Invoice Number</th>
            <th className={"pt-4 pb-2 "}>Invoice</th>
            <th className={"pt-4 pb-2 "}>Action</th>
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export const LatestOrderRow = ({
  order_session_id,
  date,
  deliveryAddress,
  itemCount,
  amount,
  status,
  paymentMethod,
  invoiceNumber,
  flvInvNumber,
}) => {

  const navigate = useNavigate();
  const orderSessionId = new Date(date).toLocaleDateString(
    'en-gb',
    { year: 'numeric', month: 'numeric', day: 'numeric' })
    .replaceAll("/", "") + "-" + order_session_id;

  return (
    <tr className={"border-b border-slate-200"}>
      <td className={"py-4 pb-2 font-medium"}>{formatTimestamp(date)}</td>
      <td className={"py-4 pb-2"}>{deliveryAddress}</td>
      <td className={"py-4 pb-2"}>{itemCount}</td>
      <td className={"py-4 pb-2"}>₦{amount}</td>
      <td className={`py-4 pb-2 ${status ? 'text-green-500' : 'text-red-500'}`}>{status ? "paid" : "not paid"}</td>
      <td className={"py-4 pb-2"}>{paymentMethod}</td>
      <td className={"py-4 pb-2"}>{invoiceNumber}</td>
      <td className={"py-4 pb-2"}>{flvInvNumber}</td>
      <td className={"py-4 pb-2"}>
        <ArrowDownTrayIcon className={"mx-auto w-5 h-5"} />
      </td>
      <td className={"py-4 pb-2"}>
        <button
          onClick={() => navigate(`/admin/orders/${orderSessionId}`)}
          className="h-8 w-full text-white bg-green-500 rounded-md hover:bg-gray-600 transition-all ease-in-out delay-150">view</button>
      </td>
    </tr>
  )
}