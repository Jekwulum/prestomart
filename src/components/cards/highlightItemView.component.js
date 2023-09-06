import React, {useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import {productImage} from "../../assets";
import {Button, ButtonGroup, LinkButton} from "../buttons";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, decrementCartItem, incrementCartItem} from "../../store/reducers/cartReducer";
import {formatPrice} from "../../utils/helpers";

export const HighlightItemViewComponent = ({item, className, path}) => {

    return (
        <LinkButton location={path + "product/" + item.slug} className={"w-full bg-white py-0 mr-2 relative border transition border-transparent hover:border-gray-300 duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)] " + className} style={{minWidth: "180px", maxWidth: "250px"}}>
                {
                    item.discount && item.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                        <div className="absolute bg-[#D13D19] text-white top-0 right-0 py-1 px-2 text-xs rounded-bl">
                            {item.discount && item.discount.sort(i => i.discount_active)[0].discount_percentage}
                            <span className="pr-1">% Off</span>
                        </div>
                        :
                        null
                }
            <div
                className="w-full h-[240px] mt-2">
                <div className="w-full overflow-hidden">
                    <img style={{height: "140px"}} className="mx-auto" src={item.url ? item.url[0] : productImage.img} alt={item.name}/>
                </div>

                <div className="w-full text-left font-bold  text-xs px-2">
                    <h1 className="Title text-[#D13D19] mt-2 h-[48px] text-ellipsis overflow-hidden">
                        {item.name}
                    </h1>
                    <p className="Price mt-[7px] text-black">{
                        formatPrice(
                            item.discount && item.discount.sort(i => i.discount_active === 1)[0].discount_active === 1 ?
                            (1 - (parseInt(item.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * item.price
                            :
                            item.price
                        )
                    }</p>
                </div>
            </div>
        </LinkButton>
    );
};
