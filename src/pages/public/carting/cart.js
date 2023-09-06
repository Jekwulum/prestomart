import {useSelector} from "react-redux";
import React from "react";
import CartItemComponent from "../../../components/cards/cartItem.component";
import {HorizontalTrackComponent} from "../../../components/track";
import {LinkButton} from "../../../components/buttons";
import {formatPrice} from "../../../utils/helpers";
import {RecentlyViewed} from "../../../components/cards/sliders";
import {HighlightItemViewComponent} from "../../../components/cards/highlightItemView.component";
import {emptyCartItem} from "../../../assets";

const Cart = () => {
    const state = useSelector(state => state)

    return (
        <div className={"max-w-7xl mx-auto"}>
            <div className="md:hidden bg-white rounded-lg py-4 px-5 divide-y">
                <div className="py-4">
                    <h4 className={"font-light"}>Cart Summary</h4>
                    <div className={"w-full flex flex-row justify-between items-center"}>
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
                </div>
                <div className={"pt-4 pb-2"}>
                    <LinkButton location={"/checkout"}
                                className={"text-xs"}
                                text={"CHECKOUT ( " +
                                    formatPrice(
                                        state.cart.cart.map(
                                            i =>
                                                i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                                                    (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                                                    :
                                                    i.product.price * i.amount
                                        ).reduce((a, b) => a + b, 0))
                                    + ")"}
                                size={"md"} bg={"#D13D19"}/>
                </div>
            </div>

            <div className="flex flex-col rounded-lg  justify-center md:grid grid-cols-9 gap-1 lg:gap-4 py-2 px-2">
                <div className="col-span-6 lg:col-span-7 divide-y w-full md:bg-white md:rounded-lg">
                    <div className={"w-full rounded-lg py-4 px-4 text-base md:text-normal"}>
                        <h4>Cart({state.cart.cart.map(i => i.amount).reduce((a, b) => a + b, 0)})</h4>
                    </div>
                    <div className="md:divide-y">
                        {
                            state.cart.cart.map((i, k) =>
                                <>
                                    <CartItemComponent key={k} item={i}/>
                                </>
                            )
                        }
                        {
                            state.cart.cart.length === 0 ?
                                <div className={"py-8 px-5 text-center font-light"}>\
                                    <img src={emptyCartItem.img} alt={emptyCartItem.alt}
                                         className={"mx-auto w-36 pb-8"}/>
                                    <p className={"pb-2"}>Looks like you haven't added anything to your cart</p>
                                    <LinkButton location={"/"} bg={"#000"}>
                                        Go to Homepage
                                    </LinkButton>
                                </div>
                                : null
                        }
                    </div>
                </div>

                <div className="hidden col-span-3 lg:col-span-2 md:block bg-white rounded-lg px-2 h-fit divide-y">
                    <h4 className={"py-4 font-light"}>Cart Summary</h4>

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

                        <div className="text-xs pt-2  text-gray-400 ">
                            Delivery fees not included yet
                        </div>
                    </div>

                    <div className="py-4">
                        <LinkButton location={"/checkout"}
                                    className={"text-xs"}
                                    text={"CHECKOUT ( " +
                                        formatPrice(
                                            state.cart.cart.map(
                                                i =>
                                                    i.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                                                        (1 - (parseInt(i.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * i.product.price * i.amount
                                                        :
                                                        i.product.price * i.amount
                                            ).reduce((a, b) => a + b, 0))
                                        + ")"}
                                    size={"md"} bg={"#D13D19"}/>
                    </div>
                </div>
            </div>

            <div className="py-4">
                <h4 className="py-2 font-light">
                    Saved Items
                </h4>

                <HorizontalTrackComponent className={"bg-white"}>
                    {
                        state.auth.bookmarked_items.length === 0 ?
                            <div
                                className={"w-full bg-white py-2 mr-2 relative border transition border-transparent hover:border-gray-300 duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"}
                                style={{width: "180px", maxWidth: "250px"}}>
                                <img src={emptyCartItem.img} alt={emptyCartItem.alt} className={"mx-auto w-24 py-6"}/>
                                <h4 className={"text-center px-4 text-sm"}>Looks like there is nothing here, look around
                                    and add some items!</h4>
                            </div>
                            :
                            <>
                                {
                                    state.auth.bookmarked_items.map((item, key) =>
                                        <HighlightItemViewComponent path={"/"} item={item} key={key} className={""}/>
                                    )
                                }
                            </>
                    }
                </HorizontalTrackComponent>
            </div>

            <RecentlyViewed/>

            {/*<div className="py-4 px-5 md:px-2">*/}
            {/*    <h4 className="py-2">*/}
            {/*        Customers Also Bought*/}
            {/*    </h4>*/}

            {/*    <HorizontalTrackComponent className={"bg-white"}>*/}

            {/*    </HorizontalTrackComponent>*/}
            {/*</div>*/}
        </div>
    )
}

export default Cart