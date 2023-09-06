import React from "react";
import { Category } from "./category.component";
import {useSelector} from "react-redux";

export const Categories = () => {
    const state = useSelector(state => state)

    return (
    <div className="border border-gray-200 my-2 md:my-0 rounded-xl grid grid-cols-3 gap-2 py-2 md:px-4 md:flex flex-col justify-around h-full">
        {
            state.category.categories.map((i, k) =>
                <Category key={k} cat={i} />
            )
        }
    </div>
  );
};
