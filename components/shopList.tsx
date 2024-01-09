import { Stepper } from "antd-mobile";
import React, { memo } from "react";

const ShopList = memo(() => {
  return (
    <div className="">
      {new Array(5).fill(1).map((ele, idx) => (
        <div className="px-4 py-4 bg-white rounded-t-xl mb-4 flex">
          <img className="w-22 mr-6" src="/news/shop.png" alt="" />
          <div>
            <div className="font-[PingFang SC, PingFang SC] text-[#708090] font-medium text-sm truncate w-[70%]">
              文字描述
            </div>
            <div className="flex">
              <Stepper
                defaultValue={1}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ShopList;
