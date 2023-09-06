import { PlainTextInput } from "../../../components/forms";
import { ChevronDownIcon, Cog6ToothIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { TransparentButton } from "../../../components/buttons";
import { fetchHistory, searchHistory } from "../../../store/actions/historyActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import { setOccurrence, updateHistory, updatePaginationProp } from "../../../store/reducers/historyReducer";

const HistoryManagement = () => {
  const state = useSelector(state => state.history)
  const dispatch = useDispatch()
  let timer;

  const setPage = (val) => {
    if (val > 0)
      dispatch(updatePaginationProp({ name: "page", value: val }))
  }

  const parseData = (data) => {
    if (!data) return ""
    if (data.length < 1) return ""
    if (data === "N/A") return data

    return JSON.stringify(JSON.parse(data), null, '\t')
  }

  useEffect(() => {
    if (state.occurrenceQuery.length === 0)
      fetchInitialData()
    else
      searchFor()
  }, [state.limit, state.page])

  const fetchInitialData = () => {
    toast.promise(fetchHistory(state.page, state.limit), {
      pending: "Fetching history",
      success: `Now showing ${state.limit} occurrences from page ${state.page} `
    })
      .then(
        result => {
          dispatch(updateHistory(result.data))
          dispatch(updatePaginationProp({ name: "searchLoadingState", value: false }))
        }
      )
  }

  const searchFor = () => {
    if (state.occurrenceQuery.length === 0)
      fetchInitialData()
    else
      searchHistory(state.occurrenceQuery, state.page, state.limit)
        .then((result) => {
          dispatch(updateHistory(result.data))
          dispatch(updatePaginationProp({ name: "searchLoadingState", value: false }))
        })
  }

  useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(searchFor, 2000)
    dispatch(updatePaginationProp({ name: "searchLoadingState", value: true }))

    return () => clearTimeout(timer)
  }, [state.occurrenceQuery])

  return (
    <>
      <div className={"mb-4"}>
        <h4>History</h4>

        <div className="w-full flex flex-row justify-end">
          <PlainTextInput containerClasses={"w-1/2 mx-auto"} className={'w-full '}
            placeholder={"Action or table"}
            onChange={(e) => {
              dispatch(updatePaginationProp({ name: "occurrenceQuery", value: e.target.value }))
            }}
            icon={<MagnifyingGlassIcon className={"h-5 w-5"} />} />
          <TransparentButton>
            <FunnelIcon className={"w-6 h-6 mr-1"} />
            <span className={"ml-1"}>View Filters</span>
            <ChevronDownIcon className={"w-5 h-5"} />
          </TransparentButton>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="relative col-span-2 border-r">
          {
            state.searchLoadingState ?
              <div className="flex flex-row justify-center w-full h-full absolute bg-gray-800 bg-opacity-50 top-0 left-0">
                <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />
              </div>
              :
              null
          }
          <div className="w-full mb-6">
            <table className="table-auto w-full">
              <thead>
                <tr className={"text-left border-b border-slate-800"}>
                  <th className={"pt-4 text-sm pr-2 pb-2 "}>ID</th>
                  <th className={"pt-4 text-sm pr-2 pb-2 "}>Actions</th>
                  <th className={"pt-4 text-sm pr-2 pb-2 "}>Affected Table</th>
                  <th className={"pt-4 text-sm pr-2 pb-2 "}>Admin User</th>
                  <th className={"pt-4 text-sm pr-2 pb-2 "}>Created At</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(state.history) ? (
                  state.history.map((occurrence, key) => (
                    <HistoryTableRow key={key} occurrence={occurrence} />
                  ))
                ) : (
                  <tr>
                    <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          <div className="w-full flex flex-row pr-2">
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

        </div>

        <div className="">
          <p>Old State:</p>
          <p dangerouslySetInnerHTML={{ __html: parseData(state.occurrence.old_state) }} />
          <br />
          <br />
          <p>New State:</p>
          <p dangerouslySetInnerHTML={{ __html: parseData(state.occurrence.new_state) }} />
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
    dispatch(updatePaginationProp({ name: "limit", value: val }))
  }

  return (
    <select onChange={e => setLimit(e.target.value)} value={state.limit} className={"py-2 px-4 outline-none"}
      name={"itemsPerPages"}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="60">60</option>
      <option value="100">100</option>
    </select>
  )
}

const PaginationInput = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.products)

  const setPage = (val) => {
    if (val > 0)
      dispatch(updatePaginationProp({ name: "page", value: val }))
  }

  return <input type="text" className={"w-8 bg-slate-200  p-2 outline-none"} onKeyDown={e => {
    if (e.keyCode === 13)
      setPage(e.target.value)
  }
  } />
}

const HistoryTableRow = ({ occurrence }) => {
  const dispatch = useDispatch()
  const mountOccurrence = () => {
    dispatch(setOccurrence(occurrence.history_id))
  }

  return (
    <tr className={"border-b border-slate-200 text-sm cursor-pointer"} onClick={mountOccurrence}>
      <td className={"py-4 pb-2 font-medium"}>{occurrence.history_id}</td>
      <td className="py-4 pb-2 pr-2">{occurrence.action}</td>
      <td className="py-4 pb-2 pr-2">{occurrence.table}</td>
      <td className="py-4 pb-2 pr-2">{occurrence.admin_user_id}</td>
      <td className="py-4 pb-2">{occurrence.created_at}</td>
    </tr>
  )
}

export default HistoryManagement