import { Stepper } from "antd-mobile";
import React, { memo } from "react";

const ShopList = memo(() => {
  return (
    <div className="">
      {new Array(5).fill(1).map((ele, idx) => (
        <div className="px-4 py-4 bg-white rounded-t-xl mb-4 flex">
          <img className="w-20 mr-6" src="/news/shop.png" alt="" />
          <div className="flex-1">
            <div className="font-[PingFang SC-Medium] text-[#333333] font-medium text-base truncate mt-2 mb-7">
              文字描述
            </div>
            <div className="flex justify-between items-center">
              <Stepper
                defaultValue={0}
                style={{
                  '--border': '1px solid #DBDBDB',
                  '--border-inner': '1px solid #DBDBDB',
                  // '--button-width': '35px',
                  '--button-text-color': '#000',
                  '--input-font-color': '#000',
                  '--border-radius': '6px'
                }}
                onChange={(value) => {
                  console.log(value);
                }}
              />
              <img src='/news/shopCart.png' className="w-6 h-6" alt=''/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ShopList;
