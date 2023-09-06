import React from "react";
import {exclamationMark} from "../../assets";

export const HighlightComponent = ({img, title, subtitle}) => {

    return (
        <div className="w-52 py-4 border border-slate-200 rounded shadow-lg my-2 mr-2" style={{minWidth: "192px"}}>
            <img src={exclamationMark.img} alt={exclamationMark.alt}  className={"mx-auto w-28 mb-6"} />

            <div className="w-full text-center">
                <h4 className="font-bold">{title}</h4>
                <h5 className="font-light text-sm">{subtitle}</h5>
            </div>
        </div>
    );
}