import {useDispatch, useSelector} from "react-redux";
import {decrementCartItem, incrementCartItem, removeItem} from "../../store/reducers/cartReducer";
import {TrashIcon} from "@heroicons/react/24/outline";
import {Button, ButtonGroup} from "../buttons";
import React from "react";
import {formatPrice} from "../../utils/helpers";
import {Link} from "react-router-dom";

function CartItemComponent({item, checkout, orderHistory}) {
    const state = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(incrementCartItem(item.product.product_id))
    };

    const handleDecrement = () => {
        dispatch(decrementCartItem(item.product.product_id))
    };

    const removeItemFromCart = () => {
        dispatch(removeItem(item.product.product_id))
    }

    return (
        <Link to={"/product/" + item.product.slug} className={"my-2 bg-white rounded-lg py-2 px-2 block relative"}>
            {
                item.product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                    <div className="absolute bg-[#D13D19] text-white top-0 right-0 py-1 px-2 text-xs rounded-bl">
                        {item.product.discount.sort(i => i.discount_active)[0].discount_percentage}
                        <span className="pr-1">% Off</span>
                    </div>
                    :
                    null
            }

            <div className="flex flex-row justify-start py-2 px-2 mt-1">
                <div className="flex flex-col justify-center w-24 sm:w-28 col-span-2">
                    <img src={item.product.url[0]} alt={item.product.name} className={"h-24 sm:h-28 mx-auto"}/>
                </div>

                <div className="col-span-5 py-2 flex flex-col px-2">
                    <h2 className={(checkout || orderHistory) ? "text-sm lg:text-xs " : "text-xs sm:text-sm"}>{item.product.name}</h2>
                    <h2 className={(checkout || orderHistory) ? "text-sm lg:text-xs " : "text-sm font-black sm:text-md"}>{
                        formatPrice(
                            item.product.discount.sort(i => i.discount_active === 1)[0].discount_active === 1 ?
                                (1 - (parseInt(item.product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * item.product.price
                                :
                                item.product.price
                        )
                    }</h2>
                    {
                        checkout ?
                            <h4 className={"text-sm lg:text-xs"}>
                                <span className={"text-slate-500"}>Qty: </span>
                                <span className="font-bold">
                            {state.cart[state.cart.findIndex(cartItem => cartItem.product.product_id === item.product.product_id)].amount}
                        </span>
                            </h4>
                            : null
                    }
                    {
                        orderHistory ?
                            <h4 className={"text-sm lg:text-xs"}>
                                <span className={"text-slate-500"}>Qty: </span>
                                <span className="font-bold">
                            {item.amount}
                        </span>
                            </h4>
                            : null
                    }
                </div>
            </div>

            {
                (checkout || orderHistory) ?
                    null
                    :
                    <>
                        <div onClick={e => e.preventDefault()}
                             className="flex flex-row items-center justify-between w-full pt-2 px-2 hidden md:flex">
                            <div onClick={removeItemFromCart}
                                 className="text-red-800 w-fit cursor-pointer flex flex-row items-center">
                                <TrashIcon className={"w-8 h-8 lg:w-6 lg:h-6"}/>
                                <span className="ml-2 text-sm">REMOVE</span>
                            </div>

                            <ButtonGroup className={"w-fit justify-end"}>
                                <Button text={"-"} bg={"#473144"} size={"md"} onClick={handleDecrement}
                                        className={"w-fit py-2 "}/>
                                <h4 className={"px-4 flex justify-center items-center"}>
                                    {state.cart[state.cart.findIndex(cartItem => cartItem.product.product_id === item.product.product_id)].amount}
                                </h4>
                                <Button text={"+"} bg={"#473144"} size={"md"} onClick={handleIncrement}
                                        className={"w-fit py-2 "}/>
                            </ButtonGroup>
                        </div>

                        <div onClick={e => e.preventDefault()}
                             className="flex flex-row items-center justify-between w-full py-2 px-2 md:hidden">
                            <div onClick={removeItemFromCart}
                                 className="text-red-800 cursor-pointer flex flex-row items-center">
                                <TrashIcon className={"w-5 h-5"}/>
                                <span className="ml-2 text-xs">REMOVE</span>
                            </div>

                            <ButtonGroup className={"w-full justify-end"}>
                                <Button text={"-"} bg={"#473144"} size={"sm"} onClick={handleDecrement}
                                        className={"w-fit py-2 "}/>
                                <h4 className={"px-4 flex justify-center items-center"}>
                                    {state.cart[state.cart.findIndex(cartItem => cartItem.product.product_id === item.product.product_id)].amount}
                                </h4>
                                <Button text={"+"} bg={"#473144"} size={"sm"} onClick={handleIncrement}
                                        className={"w-fit py-2 "}/>
                            </ButtonGroup>
                        </div>
                    </>
            }
        </Link>
    )
}


export default CartItemComponent