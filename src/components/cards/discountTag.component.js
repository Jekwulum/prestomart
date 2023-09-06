import React from "react";
export const DiscountComponent = () => {
  var discountvalue = 80;

  return (
    <div>
      <div className="promotag relative top-0 left-[89px] flex justify-center items-center w-[52px] h-[22px] bg-[#D13D19] text-white font-[400] text-[8.87px] rounded-bl-[5px]">
        {discountvalue}% Off
      </div>
    </div>
  );
};
