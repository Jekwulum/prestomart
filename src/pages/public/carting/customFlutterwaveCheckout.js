import React, { useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { createPaymentDetailsEntry } from '../../../store/actions/publicActions';

const CustomFlutterwaveCheckout = ({ paymentDetailsFormData, orderFormData, setOrderFormData }) => {
  const state = useSelector(state => state);
  const [deliveryFee, setDeliveryFee] = useState(500);

  const amount = (state.cart.cart.map(
    i =>
      i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
        (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
        :
        i.product.price * i.amount
  ).reduce((a, b) => a + b, 0) + deliveryFee) / 100

  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: "PRESTOMART_CLIENT_FLW_TRANSACTION_" + Date.now(),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'Prestomart Cart',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  const handlePaymentRequest = () => {

    handleFlutterPayment({
      callback: (response) => {
        console.log("response from useFlutterwave: ", response);
        createPaymentDetailsEntry({
          ...paymentDetailsFormData,
          external_invoice_id: JSON.stringify({
            flw_ref: response.flw_ref,
            transaction_id: response.transaction_id,
            tx_ref: response.tx_ref
          })
        })
          .then(
            result => {
              console.log("res: ", result);
              switch (result.data.http_code) {
                case 200:
                  setOrderFormData({ ...orderFormData, payment_detail_id: result.data.data })
                  break;
                default:
                  toast.error("Oops, looks like something went wrong. Please try again or contact support!")
                  break
              }
            }
          )
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => { },
    })
  };

  return (
    <button
      className="mt-2 h-10 flex flex-row items-center justify-center px-4 text-white bg-black block w-full py-4 rounded"
      onClick={() => handlePaymentRequest()}
    >
      Payment with Flutterwave
    </button>
  );
}

export default CustomFlutterwaveCheckout;