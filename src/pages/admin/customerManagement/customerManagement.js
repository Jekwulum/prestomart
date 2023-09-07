import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { updateCustomers, updateCustomersPaginationProp } from '../../../store/reducers/adminUserReducer';
import { fetchAdminCustomers } from '../../../store/actions/adminUserActions';
import { Button, ButtonGroup, LinkButton, TransparentButton } from '../../../components/buttons';
import { PlainTextInput } from '../../../components/forms';

const CustomerManagement = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.user)

  useEffect(() => {
    fetchCustomers()
  }, [state.page, state.limit]);

  const fetchCustomers = () => {
    toast.promise(fetchAdminCustomers(state.page, state.limit), {
      pending: "Fetching all customers...",
      success: "Now displaying all customers"
    })
      .then(resp => {
        dispatch(updateCustomers(resp.data))
      });
  };

  const setPage = (val) => {
    if (val > 0)
      dispatch(updateCustomersPaginationProp({ name: "page", value: val }))
  }

  return (
    <>
      <div className={"mb-4"}>
        <h4>Customer Management</h4>

        <div className="w-full flex flex-row justify-end">
          <PlainTextInput containerClasses={"w-1/2 mr-2"} className={'w-full '}
            placeholder={"Name or role"}
            icon={<MagnifyingGlassIcon className={"h-5 w-5"} />} />
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
            <th className={"pt-4 text-sm pr-2 pb-2 "}></th>
            <th className={"pt-4 text-sm pr-2 pb-2 "}>ID</th>
            <th className={"pt-4 text-sm pr-2 pb-2 "}>First Name</th>
            <th className={"pt-4 text-sm pr-2 pb-2 "}>Last Name</th>
            <th className={"pt-4 text-sm pr-2 pb-2 "}>Email</th>
            <th className={"pt-4 text-sm pb-2 text-center"}>Active</th>
            <th className={"pt-4 text-sm pr-2 pb-2 "}>Actions</th>
          </tr>
        </thead>

        {Array.isArray(state.customers) ? (
          <tbody>
            {state.customers.map((i, k) => (
              <CustomerManagementRow key={k} user={i} />
            ))}
          </tbody>
        ) : (
          <div className="flex flex-row justify-center w-full h-full absolute bg-gray-800 bg-opacity-50 top-0 left-0">
            <Cog6ToothIcon className={"my-24 w-12 h-12 text-white animate-spin"} />
          </div>
        )}

      </table>

      <div className="w-full flex flex-row">
        <div className={"grid grid-cols-3 w-full justify-between items-center"}>
          <div className="flex flex-row justify-start items-center w-full">
            <span className={"mr-2"}>Go to:  </span>
            <PaginationInput vaue={state.page} />
          </div>

          <div className="flex flex-row justify-center w-full items-center">
            {
              (state.page - 5) < 1 ? <></> :
                <PaginationButton icon={<ChevronDoubleLeftIcon className={"w-6 h-6"} />}
                  onClick={() => setPage(parseInt(state.page) - 5)} />
            }
            {
              (state.page - 1) < 1 ? <></> :
                <PaginationButton icon={<ChevronLeftIcon className={"w-6 h-6"} />}
                  onClick={() => setPage(parseInt(state.page) - 1)} />
            }
            <PaginationButton icon={state.page} />
            <PaginationButton icon={<ChevronRightIcon className={"w-6 h-6"} />}
              onClick={() => setPage(parseInt(state.page) + 1)} />
            <PaginationButton icon={<ChevronDoubleRightIcon className={"w-6 h-6"} />}
              onClick={() => setPage(parseInt(state.page) + 5)} />
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

const CustomerManagementRow = ({ user }) => {
  const toggleProduct = () => {

  }
  const deleteUser = () => {

  }

  return (
    <tr className={"border-b border-slate-200 text-sm"}>
      <td className="py-4 pb-2 px-2">
        <input type="checkbox" className={"mx-auto"} />
      </td>
      <td className="py-4 pb-2">{user.user_id}</td>
      <td className="py-4 pb-2">{user.first_name}</td>
      <td className="py-4 pb-2">{user.last_name}</td>
      <td className="py-4 pb-2">{user.email}</td>
      <td className="py-4 pb-2 cursor-pointer" onClick={toggleProduct}>
        {
          user.active ?
            <CheckCircleIcon className={"w-8 h-8 mx-auto text-green-600"} /> :
            <XCircleIcon className={"w-8 h-8 mx-auto text-red-600"} />
        }
      </td>
      <td className="py-4 pb-2">
        <ButtonGroup borderRadius={"6px"}>
          <Button onClick={deleteUser} text={"Delete"} color={"white"} bg={"red"} size={"sm"} />
        </ButtonGroup>
      </td>
    </tr>
  )
};

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
    dispatch(updateCustomersPaginationProp({ name: "limit", value: val }))
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
      dispatch(updateCustomersPaginationProp({ name: "page", value: val }))
  }

  return <input type="text" className={"w-8 bg-slate-200  p-2 outline-none"} onKeyDown={e => {
    if (e.keyCode === 13)
      setPage(e.target.value)
  }
  } />
}

export default CustomerManagement;