import { Stepper, InfiniteScroll, Space } from "antd-mobile";
import { DeleteOutline, MinusCircleOutline } from "antd-mobile-icons";
import { useRouter } from "next/router";
import React, { memo, useState } from "react";

interface Iprops {
  shopCart?: boolean;
  hasMore?: boolean;
  data?: any[];
  loadMore?: () => Promise<void>;
  addToCart?: (commodityId: string, number: string) => void;
  deleteProduct?: (commodityId: string) => void;
  handleDelete?: (commodityId: string) => void;
}

const ShopList = memo((props: Iprops) => {
  const {
    shopCart,
    hasMore = false,
    loadMore,
    data,
    addToCart,
    deleteProduct,
    handleDelete,
  } = props;
  const router = useRouter();

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/shopDetail");
  };

  const shopDom = data?.map((ele, idx) => (
    <ShopItem
      key={idx}
      ele={ele}
      handleShopClick={handleShopClick}
      addToCart={addToCart}
      deleteProduct={deleteProduct}
    />
  ));
  const shopCartDom = data?.map((ele, idx) => (
    <div className="px-4 py-4 bg-white rounded-t-xl mb-4 flex items-center" onClick={handleShopClick}>
      <MinusCircleOutline className="w-5 mr-4" fontSize={20} color="#FF0000" onClick={(e: React.MouseEvent) => { e.stopPropagation();handleDelete?.(ele.id)}}/>
      <img
        className="w-20 mr-6"
        src="/news/shop.png"
        alt=""
      />
      <div className="flex-1">
        <div className="font-[PingFang SC, PingFang SC] text-[#000] font-medium text-lg truncate mt-2 mb-6">
          {ele.name}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-[PingFang SC, PingFang SC] text-[#999999] font-bold text-lg truncate">
            x{ele.number}
          </span>
          <span className="font-[PingFang SC, PingFang SC] text-[#4682B4] font-bold text-xl truncate">
            ￥{ele.price}
          </span>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="flex-1">{shopCart ? shopCartDom : shopDom}</div>
      {loadMore && <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />}
    </>
  );
});

export default ShopList;

interface ItemPorps {
  ele: Record<string, any>;
  handleShopClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  addToCart?: (commodityId: string, number: string) => void;
  deleteProduct?: (commodityId: string) => void;
}

const ShopItem = ({
  ele,
  handleShopClick,
  addToCart,
  deleteProduct,
}: ItemPorps) => {
  const [number, setNumber] = useState<string>("0");

  return (
    <div
      className="px-4 py-4 bg-white rounded-t-xl mb-4 flex"
      onClick={handleShopClick}
    >
      <img className="w-20 mr-6" src="/news/shop.png" alt="" />
      <div className="flex-1">
        <div className="font-[PingFang SC-Medium] text-[#333333] font-medium text-base truncate mt-2 mb-7">
          {ele.name}
        </div>
        <div className="flex justify-between items-center">
          <div
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          >
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
              min={0}
              value={Number(number)}
              onChange={(value) => {
                console.log(value);
                setNumber(value.toString());
              }}
            />
          </div>
          <Space>
            <img
              src="/news/shopCart.png"
              className="w-6 h-6"
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                addToCart?.(ele.id, number);
              }}
            />
            <DeleteOutline
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct?.(ele.id);
              }}
              className="w-6 h-6"
              color="var(--adm-color-danger)"
            />
          </Space>
        </div>
      </div>
    </div>
  );
};
