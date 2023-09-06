import {removeFromBookmarksServer} from "../../store/actions/publicActions";
import {toast} from "react-toastify";
import {updateBookmarks} from "../../store/reducers/authReducer";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {formatPrice} from "../../utils/helpers";
import {TrashIcon} from "@heroicons/react/24/outline";
import React from "react";

export const SavedItemComponent = ({product}) => {
    const dispatch = useDispatch()

    const toggleFavorites = () => {
        removeFromBookmarksServer(product.slug)
            .then(
                result => {
                    toast.success(`Removed ${product.name} from favorites!`)
                    dispatch(updateBookmarks(result.data.data))
                }
            )
    }

    return(
        <Link to={"/product/" + product.slug} className={"my-2 bg-white rounded-lg py-2 px-2 block relative"}>
            {
                product.discount.sort(i => i.discount_active)[0].discount_active === 1 ?
                    <div className="absolute bg-[#D13D19] text-white top-0 right-0 py-1 px-2 text-xs rounded-bl">
                        {product.discount.sort(i => i.discount_active)[0].discount_percentage}
                        <span className="pr-1">% Off</span>
                    </div>
                    :
                    null
            }

            <div className="flex flex-row justify-start py-2 px-2 mt-1">
                <div className="flex flex-col justify-center w-24 sm:w-28 col-span-2">
                    <img src={product.url[0]} alt={product.name} className={"h-24 sm:h-28 mx-auto"}/>
                </div>

                <div className="col-span-5 py-2 flex flex-col px-2">
                    <h2 className={"text-xs sm:text-sm"}>{product.name}</h2>
                    <h2 className={"text-sm font-black sm:text-md"}> {
                        formatPrice(
                            product.discount.sort(i => i.discount_active === 1)[0].discount_active === 1 ?
                                (1 - (parseInt(product.discount.sort(i => i.discount_active)[0].discount_percentage) / 100)) * product.price
                                :
                                product.price
                        )
                    }</h2>
                </div>
            </div>

            <div onClick={e => e.preventDefault()} className="flex flex-row items-center justify-between w-full pt-2 px-2 hidden md:flex">
                <div
                    onClick={toggleFavorites}
                    className="text-red-800 w-fit cursor-pointer flex flex-row items-center">
                    <TrashIcon className={"w-8 h-8 lg:w-6 lg:h-6"}/>
                    <span className="ml-2 text-sm">REMOVE</span>
                </div>
            </div>

            <div onClick={e => e.preventDefault()} className="flex flex-row items-center justify-between w-full py-2 px-2 md:hidden">
                <div
                    onClick={toggleFavorites}
                    className="text-red-800 cursor-pointer flex flex-row items-center">
                    <TrashIcon className={"w-5 h-5"}/>
                    <span className="ml-2 text-xs">REMOVE</span>
                </div>
            </div>
        </Link>

    )
}