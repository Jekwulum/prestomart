import { boxVector } from "../../../assets";
import { LinkButton } from "../../../components/buttons";
import { useSelector } from "react-redux";
import { addLeadingZeros, formatPrice } from "../../../utils/helpers";

const Orders = () => {
    const state = useSelector(state => state);
    return (
        <>
            {
                state.auth.orders.length === 0 ?
                    <>
                        <img src={boxVector.img} alt={boxVector.alt} className="w-24 mx-auto py-8" />
                        <h4 className="text-center mb-8">
                            Looks like you haven't ordered anything yet, we have a wide selection of products for you to
                            enjoy!
                        </h4>
                        <LinkButton location={"/"} text={"Go to Homepage"} bg={"#000"} className={""} />
                    </>
                    :
                    <>
                        {
                            state.auth.orders.map((item, key) =>
                                <div key={key} className="border rounded py-4 px-4 mb-4 flex flex-col md:flex-row justify-between">
                                    <div className="">
                                        <h4 className={"font-medium mb-4"}>
                                            <span className={"mr-1"}>Order No.</span>
                                            <span>{new Date(item.created_at).toLocaleDateString(
                                                'en-gb',
                                                {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric'
                                                }).replaceAll("/", "") + "-" + (item.order_session_id)}</span>
                                        </h4>
                                        <div className="font-light">
                                            <h4>
                                                <span className="mr-1">Placed on</span>
                                                {new Date(item.created_at).toLocaleDateString(
                                                    'en-gb',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }
                                                )}</h4>
                                            <h4 className={"uppercase rounded bg-green-600 w-fit text-sm text-white py-1 px-2 my-1 font-normal"}>{item.order_status || "Confirmed"}</h4>

                                            <h4>{item.cart_details.map(item => item.amount).reduce((a, b) => a + b, 0)} Items</h4>
                                            <h4>
                                                <span className="mr-1">Total:</span>
                                                <span>
                                                    {
                                                        formatPrice(item.cart_details.map(
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
                                        <LinkButton location={
                                            new Date(item.created_at).toLocaleDateString(
                                                'en-gb',
                                                {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric'
                                                }).replaceAll("/", "") + "-" + item.order_session_id}
                                            text={"See Details"}
                                            color={"#D13D19"}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </>
            }
        </>
    )
}

export default Orders