import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CheckIfLoggedIn from "../../../helpers/checkIfLoggedIn";
import CheckIfCartEmpty from "../../../helpers/checkIfCartEmpty";
import CartItemComponent from "../../../components/cards/cartItem.component";
import {
  createPaymentDetailsEntry,
  fetchPubk,
  fetchUserAddresses,
  placeOrder,
  sendUserAddress
} from "../../../store/actions/publicActions";
import { Button, LinkButton } from "../../../components/buttons";
import { creditCardVector, map, nairaVector } from "../../../assets";
import Modal from 'react-modal';
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ColoredTextArea, ColoredTextInput } from "../../../components/forms";
import { toast } from "react-toastify";
import { generateFlutterwaveConfig, formatPrice } from "../../../utils/helpers";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { emptyCart } from "../../../store/reducers/cartReducer";


export const Checkout = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [addyLoading, setAddyLoading] = useState(true)
  const [addresses, setAddresses] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [newUserAddressFormData, setNewUserAddressFormData] = useState({
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "Enugu"
  })
  const [orderFormData, setOrderFormData] = useState({
    delivery_details: "",
    user_address_id: -1,
    delivery_cost: 0.00,
    payment_detail_id: -1
  })
  const [deliveryFee, setDeliveryFee] = useState(500);
  const [pubk, setPubk] = useState("");
  const [paymentDetailsFormData, setPaymentDetailsFormData] = useState({
    external_invoice_id: "",
    payment_method: "pay_online"
  })

  useEffect(() => {

    init();
    if (orderFormData.payment_detail_id === -1)
      return

    placeOrder({ ...orderFormData, cart_details: JSON.stringify(state.cart.cart) })
      .then(
        resp => {
          switch (resp.data.http_code) {
            case 200:
              dispatch(emptyCart())
              if (paymentDetailsFormData.payment_method === "pay_online")
                toast.success("Payment Successful, you are being redirected!")
              else
                toast.success("Order placed successfully, you are being redirected!")

              break;
            default:
              toast.error("Oops, looks like something went wrong. Please try again or contact support!")
              break
          }
        }
      );

  }, [orderFormData.payment_detail_id]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  const updateFormData = (n, v) => {
    setNewUserAddressFormData({ ...newUserAddressFormData, [n]: v })
  }

  const submitAddress = (e) => {
    e.preventDefault();

    sendUserAddress(newUserAddressFormData)
      .then((result) => {
        switch (result.data.http_code) {
          case 200:
            toast.success(result.data.message)
            break
          default:
            toast.error(result.data.error || "Looks like something went wrong!")
            break
        }

        setOpenModal(false)
        init()
      })
  }

  const init = () => {
    fetchUserAddresses()
      .then(result => {
        setAddresses(result.data.data)
      })
      .finally(() => {
        setAddyLoading(false)
      });

    fetchPubk().then(
      resp => {
        if (resp.data.status === "SUCCESS") setPubk(resp.data.key)
      }
    )
  }


  const amount = (state.cart.cart.map(
    i =>
      i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
        (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
        :
        i.product.price * i.amount
  ).reduce((a, b) => a + b, 0) + deliveryFee);

  const config = generateFlutterwaveConfig(state.auth.user_data, amount, pubk);

  const handleFlutterPayment = useFlutterwave(config);
  const handlePaymentRequest = () => {

    handleFlutterPayment({
      callback: (response) => {
        if (response.status === "successful") {
          createPaymentDetailsEntry({
            ...paymentDetailsFormData,
            external_invoice_id: JSON.stringify({
              flw_ref: response.flw_ref,
              transaction_id: response.transaction_id,
              tx_ref: response.tx_ref,
              payment_method: "pay_online"
            })
          })
            .then(
              result => {
                switch (result.data.http_code) {
                  case 200:
                    setOrderFormData({ ...orderFormData, payment_detail_id: result.data.data, order_state: true })
                    break;
                  default:
                    toast.error("Oops, looks like something went wrong. Please try again or contact support!")
                    break
                }
              }
            )
        }
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => { },
    })
  };

  return (
    <>
      <CheckIfLoggedIn />
      <CheckIfCartEmpty />

      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={customStyles}
        contentLabel="Adding Address"
      >
        <button className={"block ml-auto"} onClick={() => setOpenModal(false)}>
          <XMarkIcon className={"w-6 h-6 "} />
        </button>

        <div className="rounded my-2 border p-4">
          <form>
            <div className="mb-8">
              <ColoredTextInput type="text"
                label={"Phone Number"}
                value={newUserAddressFormData.phone_number}
                onChange={(e) => updateFormData("phone_number", e.target.value)} />
            </div>

            <div className="mb-8">
              <ColoredTextInput type="text"
                label={"Address Line 1"}
                value={newUserAddressFormData.address_line_1}
                onChange={(e) => updateFormData("address_line_1", e.target.value)} />
            </div>

            <div className="mb-8">
              <ColoredTextInput type="text"
                label={"Address Line 2"}
                value={newUserAddressFormData.address_line_2}
                onChange={(e) => updateFormData("address_line_2", e.target.value)} />
            </div>


            <div className="mb-8">
              <ColoredTextInput type="text"
                label={"City"}
                value={newUserAddressFormData.city}
                onChange={(e) => updateFormData("city", e.target.value)} />
            </div>


            <div className="mb-8">
              <ColoredTextInput type="text"
                value={newUserAddressFormData.state}
                label={"State"} disabled={true}
                onChange={(e) => updateFormData("state", e.target.value)} />
            </div>

            <Button onClick={(e) => submitAddress(e)} text={"Submit Address"} bg={"#D13D19"} />
          </form>
        </div>
      </Modal>

      <div className="lg:hidden ">
        <h4 className={"uppercase py-4 text-slate-500"}>Order Summary</h4>
        <div className="divide-y bg-white rounded p-4 ">
          <div className="uppercase pb-2">
            Your Order ({state.cart.cart.map(i => i.amount).reduce((a, b) => a + b, 0)} Items)
          </div>
          <div className="divide-y">
            {
              state.cart.cart.map((i, k) =>
                <>
                  <CartItemComponent key={k} item={i} checkout={true} />
                </>
              )
            }
          </div>
          <div className="">
            <div className={"w-full py-4 flex flex-row justify-between items-center"}>
              <span>
                Subtotal
              </span>
              <span>
                {
                  formatPrice(
                    state.cart.cart.map(
                      i =>
                        i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                          (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                          :
                          i.product.price * i.amount
                    ).reduce((a, b) => a + b, 0))
                }
              </span>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <span>Delivery Fee</span>
              <span>  {formatPrice(deliveryFee)}</span>
            </div>
          </div>
          <div className="">
            <div className={"w-full py-2 flex flex-row justify-between items-center"}>
              <span className={"font-bold"}>
                Total
              </span>
              <span>
                {
                  formatPrice(
                    state.cart.cart.map(
                      i =>
                        i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                          (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                          :
                          i.product.price * i.amount
                    ).reduce((a, b) => a + b, 0) + deliveryFee)
                }
              </span>
            </div>
          </div>
          <div className="pt-2">
            <LinkButton location={"/cart"} text={"Modify Cart"} bg={"#000"} size={"md"} />
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-lg  justify-center md:grid grid-cols-9 gap-1 lg:gap-4 py-2 px-2">
        <div className="col-span-5 lg:col-span-6 w-full rounded">
          <h4 className={"uppercase py-2 text-slate-500"}>Checkout</h4>

          <div className="divide-y bg-white rounded p-4 mb-8 ">
            <div className="">
              <div className="flex flex-row justify-between items-center">
                <h4 className={"uppercase font-bold text-sm"}>Address Details</h4>
                <PlusCircleIcon onClick={() => setOpenModal(true)} className={"w-8 h-8"} />
              </div>
              {
                (addyLoading === false && addresses.length === 0) ?
                  <div className={"pt-2 pb-4"}>
                    <img src={map.img} alt={map.alt} className={"mx-auto w-24 py-8"} />
                    <h4 className="text-center">Looks like you haven't added any addresses, add one
                      now</h4>
                    <br />
                    <Button className={"mx-auto block"} text={"Add an Address"} bg={"#000"}
                      size={"md"} onClick={() => setOpenModal(true)} />
                  </div>
                  :
                  <div className={"py-2"}>
                    {
                      addresses.map((add, k) =>
                        <div key={k}
                          className={
                            "border rounded px-2 py-2 mb-2 transition duration-300 cursor-pointer " +
                            (orderFormData.user_address_id === add.user_address_id ? "border-[#D13D19] bg-[#D13D19] text-white" : "")
                          }
                          onClick={() => {
                            setOrderFormData({
                              ...orderFormData,
                              "user_address_id": add.user_address_id
                            })
                          }}
                        >
                          <h4 className={"font-bold mb-2"}>{add.phone_number}</h4>
                          <h4 className={"font-light text-sm"}>{add.address_line_1 + " " + add.address_line_2}</h4>
                          <h4 className={"font-light text-sm"}>{add.city}</h4>
                          <h4 className={"font-light text-sm"}>{add.state}</h4>
                        </div>
                      )
                    }
                  </div>
              }
            </div>
          </div>

          <div className="bg-white rounded p-4 mb-8">
            <div className="flex flex-row justify-between items-center">
              <h4 className={"uppercase font-bold text-sm"}>Delivery Details</h4>
            </div>
            <div className={"py-2"}>
              <ColoredTextArea onChange={(e) => setOrderFormData({
                ...orderFormData,
                "delivery_details": e.target.value
              })}
                color={"#000"}
                placeholder={"Any extra information for delivery"}
              />
            </div>
          </div>

          <div className="bg-white rounded p-4 mb-8">
            <div className="flex flex-row justify-between items-center">
              <h4 className={"uppercase font-bold text-sm"}>Payment Method</h4>
            </div>
            <div className="">
              <div className="">
                <div className={"w-full py-4 flex flex-row justify-between items-center"}>
                  <span>
                    Subtotal
                  </span>
                  <span>
                    {
                      formatPrice(
                        state.cart.cart.map(
                          i =>
                            i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                              (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                              :
                              i.product.price * i.amount
                        ).reduce((a, b) => a + b, 0))
                    }
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <span>Delivery Fee</span>
                  <span>  {formatPrice(deliveryFee)}</span>
                </div>
              </div>
              <div className="">
                <div className={"w-full py-2 flex flex-row justify-between items-center"}>
                  <span className={"font-bold"}>
                    Total
                  </span>
                  <span>
                    {
                      formatPrice(
                        state.cart.cart.map(
                          i =>
                            i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                              (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                              :
                              i.product.price * i.amount
                        ).reduce((a, b) => a + b, 0) + deliveryFee)
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className={"py-2 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4"}>
              <div
                onClick={() => {
                  setPaymentDetailsFormData({
                    ...paymentDetailsFormData,
                    "payment_method": "pay_on_delivery"
                  })
                }}
                className={"rounded transition duration-300 border  p-2 " +
                  (paymentDetailsFormData.payment_method === "pay_on_delivery" ? "border-[#D13D19] bg-[#D13D19] text-white" : "")}>
                <img className={"w-24 mx-auto"} src={nairaVector.img} alt={nairaVector.alt} />
                <h4 className="text-center">
                  Pay on Delivery
                </h4>
              </div>

              <div
                onClick={() => {
                  setPaymentDetailsFormData({
                    ...paymentDetailsFormData,
                    "payment_method": "pay_online"
                  })
                }}
                className={"rounded transition duration-300 border  p-2 " +
                  (paymentDetailsFormData.payment_method === "pay_online" ? "border-[#D13D19] bg-[#D13D19] text-white" : "")}>
                <img className={"w-24 mx-auto"} src={creditCardVector.img} alt={creditCardVector.alt} />
                <h4 className="text-center">
                  Pay Online (Powered by Flutterwave)
                </h4>
              </div>
            </div>
            <div className="">
              {
                orderFormData.user_address_id === -1 ?
                  <>
                    <Button text={"Please Select an Address"} className={"mt-2"} bg={"#000"} />
                  </>
                  :
                  <>
                    {
                      paymentDetailsFormData.payment_method === "pay_online" ?
                        // <FlutterWaveButton {...fwConfig} className={"mt-2 flex flex-row items-center justify-center w-fit px-4 text-white bg-black block w-full py-4 rounded"} />
                        <button
                          className="mt-2 h-10 flex flex-row items-center justify-center px-4 text-white bg-black block w-full py-4 rounded"
                          onClick={() => handlePaymentRequest()}
                        >
                          Pay with Flutterwave
                        </button>
                        :
                        <Button text={"Complete Order"} className={"mt-2"} bg={"#000"}
                          onClick={() => {
                            createPaymentDetailsEntry(paymentDetailsFormData)
                              .then(
                                result => {
                                  if (result.data.http_code === 200) {
                                    setOrderFormData({
                                      ...orderFormData,
                                      payment_detail_id: result.data.data
                                    })
                                  }
                                  else {
                                    toast.error("Oops, looks like something went wrong. Please try again or contact support!")
                                  }
                                }
                              )
                          }
                          }
                        />
                    }
                  </>
              }
            </div>
          </div>
        </div>

        <div className="hidden col-span-4 lg:col-span-3 md:block">
          <h4 className={"uppercase py-2 text-slate-500"}>Order Summary</h4>
          <div className="divide-y bg-white rounded p-4 ">
            <div className="uppercase pb-2">
              Your Order ({state.cart.cart.map(i => i.amount).reduce((a, b) => a + b, 0)} Items)
            </div>
            <div className="divide-y">
              {
                state.cart.cart.map((i, k) =>
                  <CartItemComponent key={k} item={i} checkout={true} />
                )
              }
            </div>
            <div className="">
              <div className={"w-full py-4 flex flex-row justify-between items-center"}>
                <span>
                  Subtotal
                </span>
                <span>
                  {
                    formatPrice(
                      state.cart.cart.map(
                        i =>
                          i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                            (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                            :
                            i.product.price * i.amount
                      ).reduce((a, b) => a + b, 0))
                  }
                </span>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <span>Delivery Fee</span>
                <span> {formatPrice(deliveryFee)}</span>
              </div>
            </div>
            <div className="">
              <div className={"w-full py-2 flex flex-row justify-between items-center"}>
                <span className={"font-bold"}>
                  Total
                </span>
                <span>
                  {
                    formatPrice(
                      state.cart.cart.map(
                        i =>
                          i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                            (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                            :
                            i.product.price * i.amount
                      ).reduce((a, b) => a + b, 0) + deliveryFee)
                  }
                </span>
              </div>
            </div>
            <div className="pt-2">
              <LinkButton location={"/cart"} text={"Modify Cart"} bg={"#000"} size={"md"} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
