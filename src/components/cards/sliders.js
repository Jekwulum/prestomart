import {HorizontalTrackComponent} from "../track";
import React, {useEffect, useState} from "react";
import {HighlightItemViewComponent} from "./highlightItemView.component";
import {emptyCartItem} from "../../assets";

export const RecentlyViewed = () => {
    const [rv, setRv] = useState([])

    useEffect(() => {
        setRv(JSON.parse(localStorage.getItem("rV") || "[]"))
    }, [])

    return (
        <>
            <div className="py-4 px-2">
                <h4 className="py-2 font-light text-lg ">
                    Recently Viewed Items
                </h4>

                <HorizontalTrackComponent className={"bg-white"}>
                    {
                        rv.length === 0 ?
                            <div
                                className={"w-full bg-white py-2 mr-2 relative border transition border-transparent hover:border-gray-300 duration-300 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"}
                                style={{width: "180px", maxWidth: "250px"}}>
                                <img src={emptyCartItem.img} alt={emptyCartItem.alt} className={"mx-auto w-24 py-6"}/>
                                <h4 className={"text-center px-4 text-sm"}>Have a look around, you might see something you like</h4>
                            </div>
                            :
                            <>
                                {
                                    rv.map((i, k) =>
                                        <HighlightItemViewComponent path={"/"} item={i} key={k} className={""}/>
                                    )
                                }
                            </>
                    }
                </HorizontalTrackComponent>
            </div>
        </>
    )
}