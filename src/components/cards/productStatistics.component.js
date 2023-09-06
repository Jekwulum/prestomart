import {Button, TransparentButton} from "../buttons";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/24/outline";
import React from "react";
import {exclamationMark} from "../../assets";

export const ProductStatisticsComponent = ({children}) => {
    return(
        <div className={"rounded border border-slate-300 py-4 px-6 shadow-lg mr-2"} style={{minWidth: "650px"}}>
            <div className="flex flex-row justify-between items-center">
                <h4 className={"font-bold"}>Best Sellers</h4>

                <div className="flex flex-row items-center">
                    <TransparentButton>
                        <FunnelIcon className={"w-6 h-6 mr-1"}/>
                        <span className={"ml-1"}>View Filters</span>
                        <ChevronDownIcon className={"w-5 h-5"}/>
                    </TransparentButton>
                </div>
            </div>

            <div className="w-full">
                <table className="table-auto w-full">
                    <thead>
                    <tr className={"text-left border-b border-slate-800"}>
                        <th className={"pt-4 pb-2 "}>ID</th>
                        <th className={"pt-4 pb-2 "}>Image</th>
                        <th className={"pt-4 pb-2 "}>Name</th>
                        <th className={"pt-4 pb-2 "}>Category</th>
                        <th className={"pt-4 pb-2 "}>Units Sold</th>
                        <th className={"pt-4 pb-2 "}>View Count</th>
                    </tr>
                    </thead>

                    <tbody>
                    <ProductStatisticsRow id={1} name={"Nestle Bottle Water"} category={"Drinks"} sold={0} views={1} img={exclamationMark.img}/>
                    <ProductStatisticsRow id={1} name={"Nestle Bottle Water"} category={"Drinks"} sold={0} views={1} img={exclamationMark.img}/>
                    <ProductStatisticsRow id={1} name={"Nestle Bottle Water"} category={"Drinks"} sold={0} views={1} img={exclamationMark.img}/>
                    <ProductStatisticsRow id={1} name={"Nestle Bottle Water"} category={"Drinks"} sold={0} views={1} img={exclamationMark.img}/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const  ProductStatisticsRow  = ({img, name, category, sold, views, id}) => {

    return(
        <tr className={"border-b border-slate-200"}>
            <td className={"py-4 pb-2 font-medium"}>{id}</td>
            <td className={"py-2 px-2"}>
                <img src={img} alt={name}  className={"w-20"} />
            </td>
            <td className={"py-4 pb-2"}>{name}</td>
            <td className={"py-4 pb-2"}>{category}</td>
            <td className={"py-4 pb-2"}>{sold}</td>
            <td className={"py-4 pb-2"}>{views}</td>
        </tr>
    )
}