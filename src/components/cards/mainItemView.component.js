import React from "react";
import ReactStars from "react-rating-stars-component";
import {productImage} from "../../assets";
import {Button, ButtonGroup} from "../buttons";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, decrementCartItem, incrementCartItem} from "../../store/reducers/cartReducer";
import {formatPrice} from "../../utils/helpers";
import {Link} from "react-router-dom";

export const MainItemView = ({item}) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const handleIncrement = () => {
        dispatch(incrementCartItem(item.product_id))
    };

    const handleDecrement = () => {
        dispatch(decrementCartItem(item.product_id))
    };

    const aTC = () => {
        dispatch(addToCart({
            product: item,
            amount: 1
        }))
    }

    return (
        <Link to={"/product/" + item.slug}
              className={"w-full bg-white relative border border-transparent hover:border-gray-300 transition duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"}>
            {
                item.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                    <div className="absolute z-10 bg-[#D13D19] text-white top-0 right-0 py-1 px-2 text-xs rounded-bl">
                        {item.discount.sort(i => i.discount_active)[0].discount_percentage}
                        <span className="pr-1">% Off</span>
                    </div>
                    :
                    null
            }
            <div
                className="w-full h-[300px] mt-2 relative">

                <div className="w-full overflow-hidden">
                    <img style={{height: "140px"}} className="mx-auto" src={item.url[0]} alt={productImage.alt}/>
                </div>

                <div className="w-full text-left font-bold  text-xs px-2">
                    <h1 className="Title text-[#D13D19] mt-2 h-[48px] text-clip overflow-hidden">
                        {item.name}
                    </h1>
                    <p className="Price mt-[7px]">{
                        formatPrice(
                            item.discount.sort(i => i.discount_active === 1)[0].discount_active === 1 ?
                                (1 - (parseInt(item.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * item.price
                                :
                                item.price
                        )
                    }</p>
                    <div className="my-2">
                        <ReactStars count={5} size={20} onChange={() => {
                        }} edit={false} activeColor="#ffd700"/>
                    </div>
                </div>

                <div className="absolute bottom-2 right-0 left-0" onClick={(e) => e.preventDefault()}>
                    {
                        state.cart.cart.findIndex(cartItem => cartItem.product.product_id === item.product_id) >= 0 ?
                            <>
                                <ButtonGroup className={"w-full justify-around px-2 relative "}>
                                    <Button text={"-"} bg={"#473144"} size={"md"} onClick={handleDecrement}
                                            className={"w-fit py-2 "}/>
                                    <h4 className={"w-full flex justify-center items-center"}>
                                        {state.cart.cart[state.cart.cart.findIndex(cartItem => cartItem.product.product_id === item.product_id)].amount}
                                    </h4>
                                    <Button text={"+"} bg={"#473144"} size={"md"} onClick={handleIncrement}
                                            className={"w-fit py-2"}/>
                                </ButtonGroup>
                            </>
                            :
                            <Button text={"Add to Cart"} bg={"#473144"} size={"lg"}
                                    className={"py-2 rounded-none relative z-20 "}
                                    onClick={aTC}/>
                    }
                </div>
            </div>
        </Link>
    );
};
