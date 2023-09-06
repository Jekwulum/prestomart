import React from "react";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
import {LinkButton} from "../buttons";

export const Category = ({cat}) => {
    return (
        <LinkButton location={"/categories/" + cat.name.toLowerCase()} color={"#000"} className="w-full">
            <div className="px-2 flex justify-center items-center md:justify-start text-xs md:text-base">
                {/* <QuestionMarkCircleIcon className={"w-5 h-5 md:mr-2"}/> */}

                <div className="">{cat.name}</div>
            </div>
        </LinkButton>
    );
};
