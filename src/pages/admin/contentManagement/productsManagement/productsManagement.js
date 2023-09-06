import React, { useEffect } from "react";
import { PlainTextInput } from "../../../../components/forms";
import { Button, ButtonGroup, LinkButton } from "../../../../components/buttons";
import { CheckCircleIcon, Cog6ToothIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePaginationProp, updateProducts } from "../../../../store/reducers/productReducer";
import {
  deleteProductServer,
  fetchProducts,
  searchProduct,
  toggleProductActiveServer
} from "../../../../store/actions/productActions";
import { toast } from "react-toastify";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import { formatPrice } from "../../../../utils/helpers";


const ProductsManagement = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.products)
  let timer;

  const setPage = (val) => {
    if (val > 0)
      dispatch(updatePaginationProp({ name: "page", value: val }))
  }

  const searchFor = () => {
    if (state.productQuery.length === 0) {
      console.log("state: ", state)
      console.log("body: ", state.page, state.limit);
      toast.promise(fetchProducts(state.products.page, state.products.limit), {
        pending: "Fetching products",
        success: `Now showing ${state.products.limit} products from page ${state.products.page} `
      })
        .then(
          result => {
            dispatch(updateProducts(result.data.products))
          }
        )
    }
    else
      searchProduct({
        query: state.productQuery,
        page: state.page,
        limit: state.limit
      })
        .then((result) => {
          dispatch(updateProducts(result.data.products))
          dispatch(updatePaginationProp({ name: "searchLoadingState", value: false }))
        })
        .catch(() => {
          dispatch(updatePaginationProp({ name: "searchLoadingState", value: false }))
        })
  }

  useEffect(() => {
    clearTimeout(timer)
    // timer = setTimeout(searchFor, 2000)
    // // dispatch(updatePaginationProp({ name: "searchLoadingState", value: true }))

    // return () => clearTimeout(timer)
    fetchProducts(state.page, state.limit)
      .then(
        result => {
          dispatch(updateProducts(result.data.products))
        }
      )
  }, [state.productQuery])

  return (
    <>
      <Outlet />
      <div className={""}>
        <div className={"mb-4"}>
          <h4>Product Overview</h4>

          <div className="w-full flex flex-row justify-end">
            <PlainTextInput containerClasses={"w-1/2 mr-2"} className={'w-full '}
              placeholder={"Product name or SKU"}
              onChange={(e) => {
                dispatch(updatePaginationProp({
                  name: "productQuery",
                  value: e.target.value
                }))
              }}
              icon={<MagnifyingGlassIcon className={"h-5 w-5"} />} />
            <LinkButton location={"/admin/content/products/new"} text={"Create New Product"} size={"md"}
              color={"#fff"} bg={"#000000"} />
            {/*<TransparentButton>*/}
            {/*    <FunnelIcon className={"w-6 h-6 mr-1"}/>*/}
            {/*    <span className={"ml-1"}>View Filters</span>*/}
            {/*    <ChevronDownIcon className={"w-5 h-5"}/>*/}
            {/*</TransparentButton>*/}
          </div>
        </div>

        <div className="w-full mb-6 relative">
          {
            state.searchLoadingState ?
              <div
                className="flex flex-row justify-center w-full h-full absolute bg-gray-800 bg-opacity-50 top-0 left-0">
                <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />
              </div>
              :
              null
          }
          <table className="table-auto w-full">
            <thead>
              <tr className={"text-left border-b border-slate-800"}>
                <th className={"pt-4 text-sm pr-2 pb-2 "}></th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>ID</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Name</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Store Quantity</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Warehouse Quantity</th>
                <th className={"pt-4 text-sm pr-2 pb-2 text-center"}>Active</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Price</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Discounts</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Discount Price</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>View Count</th>
                <th className={"pt-4 text-sm pr-2 pb-2 "}>Actions</th>
              </tr>
            </thead>

            {Array.isArray(state.products) ? <tbody>
              {
                state.products?.map((_product, key) =>
                  <ProductManagementTableRow key={key}
                    product_id={_product.product_id}
                    name={_product.name}
                    created_at={_product.created_at}
                    store_quantity={_product.store_quantity}
                    warehouse_quantity={_product.warehouse_quantity}
                    active={_product.active}
                    admin_active={_product.admin_active}
                    price={Number(_product.price)}
                    slug={_product.slug}
                    discount={_product.discount}
                  />)
              }
            </tbody> : <Cog6ToothIcon className={"my-12 w-12 h-12 text-white animate-spin"} />}
          </table>
        </div>

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
      </div>
    </>
  )
}

const ProductManagementTableRow = ({
  product_id,
  name,
  store_quantity,
  warehouse_quantity,
  active,
  price,
  slug,
  discount
}) => {


  const dispatch = useDispatch()
  const state = useSelector(state => state.products)

  const toggleProduct = () => {
    toast.promise(toggleProductActiveServer(slug), {
      pending: `Toggling product ${name}...`,
      success: `Active state toggles on ${name}!`
    })
      .then(() => {
        fetchProducts(state.page, state.limit)
          .then(
            result => {
              dispatch(updateProducts(result.data.products))
            }
          )
      }
      )
  }

  const deleteProduct = () => {
    if (window.confirm(`Are you sure you want to do this?\n\nYou are deleting ${name} from the database, consider setting inactive instead.\n\n\nThis process is likely irreversible!`))
      toast.promise(deleteProductServer(slug), {
        pending: `Irreversibly deleting ${name}`,
        success: `${name} has been irreversibly deleted!`
      }).then(() => {
        fetchProducts(state.page, state.limit)
          .then(
            result => {
              dispatch(updateProducts(result.data.products))
            }
          )
      })
    else {
      window.alert("Consider setting the product inactive!")
    }

  }

  return (
    <tr className={"border-b border-slate-200 text-sm"}>
      <td className="py-4 pb-2 px-2">
        <input type="checkbox" className={"mx-auto"} />
      </td>
      <td className={"py-4 pb-2 font-medium"}>{product_id}</td>
      <td className="py-4 pb-2 pr-2" style={{ maxWidth: "550px" }}>
        {name}
      </td>
      <td className="py-4 pb-2">{store_quantity}</td>
      <td className="py-4 pb-2">{warehouse_quantity}</td>
      <td className="py-4 pb-2 cursor-pointer" onClick={toggleProduct}>
        {active ? <CheckCircleIcon className={"w-8 h-8 mx-auto text-green-600"} /> : <XCircleIcon className={"w-8 h-8 mx-auto text-red-600"} />}
      </td>
      <td className="py-4 pb-2">{formatPrice(price)}</td>
      <td className="py-4 pb-2">{discount.length}</td>
      <td className="py-4 pb-2">{
        formatPrice(
          discount.sort(i => i.discount_active)[0].discount_active === 1 ?
            (1 - (parseInt(discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * price
            :
            price
        )
      }</td>
      <td className="py-4 pb-2">112</td>
      <td className={""}>
        <ButtonGroup borderRadius={"6px"}>
          <LinkButton location={"/admin/content/products/edit-details/" + slug} text={"Details"}
            color={"white"}
            bg={"blue"}
            size={"sm"} />
          <LinkButton location={"/admin/content/products/edit-marketing/" + slug} text={"Marketing"}
            color={"white"}
            bg={"blue"}
            size={"sm"} />
          <Button onClick={deleteProduct} text={"Delete"} color={"white"} bg={"red"} size={"sm"} />
        </ButtonGroup>
      </td>
    </tr>
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

export default ProductsManagement;