import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { NotFound } from "../../public/NotFound";
import { fetchUserOrder } from "../../../store/actions/publicActions";
import { toast } from "react-toastify";
import { addLeadingZeros, formatPrice } from "../../../utils/helpers";
import CartItemComponent from "../../../components/cards/cartItem.component";

export const UserOrder = () => {
  let { id } = useParams()
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserOrder(id.split("-")[1])
      .then(result => {

        if (result.data.http_code === 200) {
          setOrder(result.data.data)
          setLoading(false)
        } else if (result.data.http_code === 401) {
          setLoading(false)
          navigate("/")
          toast("You are not allowed to view that information!")
        }
        else {
          setLoading(false);
          toast("Oops, something went wrong!")
        }
      })
  }, [])

  return (
    <>
      {
        loading ?
          <>
            Loading...
          </>
          :
          <>
            {
              (!loading && Object.keys(order).length === 0)
                ?
                <NotFound />
                :
                <div className={"divide-y"}>
                  <div className="">
                    <h4 className={"font-medium mb-4"}>
                      <span className={"mr-1"}>Order No.</span>
                      <span>{new Date(order.created_at).toLocaleDateString(
                        'en-gb',
                        {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        }).replaceAll("/", "") + "-" + (order.order_session_id)}</span>
                    </h4>
                    <div className="font-light">
                      <h4>
                        <span className="mr-1">Placed on</span>
                        {new Date(order.created_at).toLocaleDateString(
                          'en-gb',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }
                        )}</h4>
                      <h4 className={"uppercase rounded bg-green-600 w-fit text-sm text-white py-1 px-2 my-1 font-normal"}>{order.order_status || "Confirmed"}</h4>

                      <h4>{order.cart_details.length} orders</h4>
                      <h4>
                        <span className="mr-1">Total:</span>
                        <span>
                          {
                            formatPrice(order.cart_details.map(
                              i =>
                                i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                                  (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                                  :
                                  i.product.price * i.amount
                            ).reduce((a, b) => a + b, 0))
                          }
                        </span>
                      </h4>

                    </div>
                  </div>
                  <div className="">
                    <h4 className={"py-4 font-light"}>ITEMS IN YOUR ORDER</h4>

                    {
                      order.cart_details.map((item, key) =>
                        <CartItemComponent item={item} key={key} orderHistory={true} />
                      )
                    }
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4">
                    <div className="border rounded px-2 py-4 divide-y">
                      <h4 className={"uppercase text-center"}>Payment Information</h4>
                      <div className="py-4">
                        <h4 className={"flex flex-row items-center"}>
                          <span className="mr-1">PAYMENT METHOD:</span>
                          <span className="mr-1 text-white uppercase rounded bg-green-600 py-1 px-2 text-xs">{order.payment_method.replaceAll("_", " ")}</span>
                        </h4>
                        <h4>
                          <span className="mr-1">RECEIPT:</span>
                          <span className="mr-1 font-light text-sm">{order.invoice_id}</span>
                        </h4>

                        <br />
                        <h4 className={"mb-4"}>Payment Details</h4>
                        <h4 className={"font-light mb-1"}>
                          <span className="mr-1">Items Total:</span>
                          <span className="mr-1">
                            {
                              formatPrice(order.cart_details.map(
                                i =>
                                  i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                                    (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                                    :
                                    i.product.price * i.amount
                              ).reduce((a, b) => a + b, 0))
                            }
                          </span>
                        </h4>
                        <h4 className={"font-light mb-2"}>
                          <span className="mr-1">Delivery Fee:</span>
                          <span className="mr-1">{formatPrice(order.delivery_cost)}</span>
                        </h4>
                        <h4>
                          <span className="mr-1">Total:</span>
                          <span className="mr-1">
                            {
                              formatPrice(order.cart_details.map(
                                i =>
                                  i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                                    (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                                    :
                                    i.product.price * i.amount
                              ).reduce((a, b) => a + b, 0) + order.delivery_cost)
                            }
                          </span>
                        </h4>
                      </div>
                    </div>
                    <div className="border rounded px-2 py-4 divide-y">
                      <h4 className={"uppercase text-center"}>Delivery Information</h4>
                      <div className="">
                        <div className={"px-2 py-2 mb-2"}>
                          <h4 className={"font-bold mb-2"}>{order.phone_number}</h4>
                          <h4 className={"font-light text-sm"}>{order.address_line_1 + " " + order.address_line_2}</h4>
                          <h4 className={"font-light text-sm"}>{order.city}</h4>
                          <h4 className={"font-light text-sm"}>{order.state}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </>
      }
    </>
  )
}