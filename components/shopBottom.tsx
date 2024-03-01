import { language } from "@/utils/language";
import { useRouter } from "next/router";
import React from "react";
interface Iporps {
  data: Record<string, any>[];
  handleAddOrder: () => void
}
const ShopBottom = (props: Iporps) => {
  const { data=[], handleAddOrder } = props;
  const router = useRouter();
  const { locale: activeLocale } = router;
  console.log(data.reduce((pre,cur) => pre+cur.price,0), 'data')
  return (
    <div className="fixed py-2 bg-white bottom-[91px] h-11 flex-1 flex justify-between px-4 w-[100%] items-center">
      <div className="flex items-center">
        <span className="font-[PingFang SC, PingFang SC] text-[#000000] font-medium text-lg truncate">
          {language[activeLocale || "zh"]?.price}:
        </span>
        <span className="font-[PingFang SC, PingFang SC] text-[#4682B4] font-medium text-xl truncate">
          HKD:
          {
            data.reduce((pre,cur) => pre+(cur.price * cur.number),0)
          }
        </span>
      </div>
      <img src="/news/shopCart.png" className="w-11 h-11" alt="" onClick={handleAddOrder} />
    </div>
  );
};

export default ShopBottom;
