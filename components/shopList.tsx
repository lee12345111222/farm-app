import { Stepper, InfiniteScroll } from "antd-mobile";
import { MinusCircleOutline } from "antd-mobile-icons";
import { useRouter } from "next/router";
import React, { memo, useState } from "react";

interface Iprops {
  shopCart?: boolean;
  hasMore?: boolean;
  data?: any[];
  loadMore?: () => Promise<void>;
}

const ShopList = memo((props: Iprops) => {
  const { shopCart, hasMore=false, loadMore, data } = props;
  const router = useRouter();

  // const [data, setData] = useState<string[]>([]);
  // const [hasMore, setHasMore] = useState(true);
  // async function loadMore() {
  //   const append = await new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(["1", "2", "3"]);
  //     }, 1000);
  //   });
  //   console.log(append, "append");
  //   setData(val => [...val, ...append])
  //   setHasMore(append.length > 0);

  //   console.log(111);
  // }

  const handleShopClick = () => {
    router.push("/shopDetail");
  };

  const shopDom = data?.map((ele, idx) => (
    <div className="px-4 py-4 bg-white rounded-t-xl mb-4 flex">
      <img
        onClick={handleShopClick}
        className="w-20 mr-6"
        src="/news/shop.png"
        alt=""
      />
      <div className="flex-1">
        <div className="font-[PingFang SC-Medium] text-[#333333] font-medium text-base truncate mt-2 mb-7">
          文字描述
        </div>
        <div className="flex justify-between items-center">
          <Stepper
            defaultValue={0}
            style={{
              "--border": "1px solid #DBDBDB",
              "--border-inner": "1px solid #DBDBDB",
              // '--button-width': '35px',
              "--button-text-color": "#000",
              "--input-font-color": "#000",
              "--border-radius": "6px",
            }}
            onChange={(value) => {
              console.log(value);
            }}
          />
          <img src="/news/shopCart.png" className="w-6 h-6" alt="" />
        </div>
      </div>
    </div>
  ));
  const shopCartDom = data?.map((ele, idx) => (
    <div className="px-4 py-4 bg-white rounded-t-xl mb-4 flex items-center">
      <MinusCircleOutline className="w-5 mr-4" fontSize={20} color="#FF0000" />
      <img
        onClick={handleShopClick}
        className="w-20 mr-6"
        src="/news/shop.png"
        alt=""
      />
      <div className="flex-1">
        <div className="font-[PingFang SC, PingFang SC] text-[#000] font-medium text-lg truncate mt-2 mb-6">
          文字描述
        </div>
        <div className="flex justify-between items-center">
          <span className="font-[PingFang SC, PingFang SC] text-[#999999] font-bold text-lg truncate">
            x1
          </span>
          <span className="font-[PingFang SC, PingFang SC] text-[#4682B4] font-bold text-xl truncate">
            ￥500.8
          </span>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="flex-1">{shopCart ? shopCartDom : shopDom}</div>
     {loadMore&& <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />}
    </>
  );
});

export default ShopList;
