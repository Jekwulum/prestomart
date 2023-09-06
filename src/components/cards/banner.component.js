import React from "react";
import {riceBags} from "../../assets";

export const Banner = () => {
  return (
      <div className="w-full bg-white rounded-xl drop-shadow-2xl flex flex-row items-center justify-around px-4">
        <div className="text-xs md:text-xl lg:text-4xl">
          <h2 className="font-black">GRAINS, GRAINS </h2>
          <h2 className="font-light">& GRAINS...</h2>
        </div>

        <div>
          <img alt={riceBags.alt} src={riceBags.img} className="w-full md:w-11/12" />
        </div>
      </div>
  );
};