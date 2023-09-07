import React, { useEffect } from "react";
import { PlainTextInput } from "../../../components/forms";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "../../../components/buttons";
import { LatestOrderRow, LatestOrdersComponent } from "../../../components/cards";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { fetchPaginatedOrders } from "../../../store/actions/adminUserActions";
import { updateAllOrdersPaginationProp, updateAllOrders } from "../../../store/reducers/adminDashboardReducer";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.adminDashboard.allOrders);
  const adminDashboard = useSelector(state => state.adminDashboard);

  const setPage = (val) => {
    if (val > 0)
      dispatch(updateAllOrdersPaginationProp({ name: "page", value: val }))
  }

  const getItemCountAndPrice = (orders) => {
    return orders.cart_details.reduce(
      (result, cart_detail) => {
        result[0] += cart_detail.amount;
        result[1] += Number(cart_detail.product.price);
        return result;
      }, [0, 0]);
  };

  useEffect(() => {
    fetchPaginatedOrders(adminDashboard.page, adminDashboard.limit)
      .then((res) => {
        dispatch(updateAllOrders(res.data))
      })
  }, [adminDashboard.page, adminDashboard.limit]);

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
          {Array.isArray(allOrders) ? (
            allOrders.map((i, k) => {
              const [itemCount, price] = getItemCountAndPrice(i);
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
                />)
            })
          ) : <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />}
        </LatestOrdersComponent>
      </div>

      <div className="w-full flex flex-row">
        <div className={"grid grid-cols-3 w-full justify-between items-center"}>
          <div className="flex flex-row justify-start items-center w-full">
            <span className={"mr-2"}>Go to:  </span>
            <PaginationInput vaue={adminDashboard.page} />
          </div>

          <div className="flex flex-row justify-center w-full items-center">
            {
              (adminDashboard.page - 5) < 1 ? <></> :
                <PaginationButton icon={<ChevronDoubleLeftIcon className={"w-6 h-6"} />}
                  onClick={() => setPage(parseInt(adminDashboard.page) - 5)} />
            }
            {
              (adminDashboard.page - 1) < 1 ? <></> :
                <PaginationButton icon={<ChevronLeftIcon className={"w-6 h-6"} />}
                  onClick={() => setPage(parseInt(adminDashboard.page) - 1)} />
            }
            <PaginationButton icon={adminDashboard.page} />
            <PaginationButton icon={<ChevronRightIcon className={"w-6 h-6"} />}
              onClick={() => setPage(parseInt(adminDashboard.page) + 1)} />
            <PaginationButton icon={<ChevronDoubleRightIcon className={"w-6 h-6"} />}
              onClick={() => setPage(parseInt(adminDashboard.page) + 5)} />
          </div>

          <div className="flex flex-row justify-end w-full items-center">
            <span className={"mr-2"}>Items per page: </span>
            <PaginationSelect />
          </div>
        </div>
      </div>

    </>
  )
}

const PaginationButton = ({ icon, onClick }) => {
  return (
    <button className={"bg-slate-300 p-2 mx-1"} onClick={onClick} style={{ minWidth: "40px" }}>
      {icon}
    </button>
  )
}

const PaginationSelect = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.products)

  const setLimit = (val) => {
    dispatch(updateAllOrdersPaginationProp({ name: "limit", value: val }))
  }

  return (
    <select onChange={e => setLimit(e.target.value)} value={state.limit} className={"py-2 px-4 outline-none"}
      name={"ordersPerPages"}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="60">60</option>
      <option value="100">100</option>
    </select>
  )
};

const PaginationInput = () => {
  const dispatch = useDispatch()

  const setPage = (val) => {
    if (val > 0)
      dispatch(updateAllOrdersPaginationProp({ name: "page", value: val }))
  }

  return <input type="text" className={"w-8 bg-slate-200  p-2 outline-none"} onKeyDown={e => {
    if (e.keyCode === 13)
      setPage(e.target.value)
  }
  } />
}
export default OrderManagement;