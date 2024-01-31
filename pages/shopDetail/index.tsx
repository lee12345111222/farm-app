import React, { memo, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import {
  Form,
  Input,
  Button,
  SearchBar,
  Tabs,
  Swiper,
  CapsuleTabs,
  Stepper,
  SwiperRef,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";
import ShopBottom from "@/components/shopBottom";
import { useAddOrder } from "../../hooks/useAddOrder";
import { selectUser, useSelector } from "@/lib/redux";

const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className="flex justify-center items-center text-white w-[198px] h-44 "
      style={{ background: color }}
    >
      <img src="/news/shop.png" className="w-[100%]" alt="" />
    </div>
  </Swiper.Item>
));
interface Iprops {
  sendMessage: Function;
  // messagememo: Record<string, any>;
}
const News = memo(({sendMessage}: Iprops) => {
  const query = useSelector(selectUser);
  const router = useRouter();
  const { locale: activeLocale } = router;
  const ref = useRef<SwiperRef>(null);

  const shopItem = JSON.parse(localStorage.getItem("shopDetailItem") || '{}');
  const data=[shopItem]

  const [number, setNumber] = useState<string>("1");

  const [handleAddOrder] = useAddOrder({query, messagememo, data})

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shopDetail ">
      <div className="bg-cover h-28">
        <Header logo />
      </div>
      <div className="px-4">
        <div className="flex items-center justify-around">
          <img
            src="/news/left.png"
            onClick={() => {
              ref.current?.swipePrev();
            }}
            className="w-6 h-6"
            alt=""
          />
          <Swiper
            allowTouchMove={true}
            ref={ref}
            indicator={() => null}
            loop
            className=""
            style={{
              "--width": "52.8%",
            }}
            // indicator={(total, current) => (
            //   <div className={styles.customIndicator}>
            //     {`${current + 1} / ${total}`}
            //   </div>
            // )}
          >
            {items}
          </Swiper>
          <img
            onClick={() => {
              ref.current?.swipeNext();
            }}
            src="/news/right.png"
            className="w-6 h-6"
            alt=""
          />
        </div>

        <div className="font-[PingFang SC-Bold] text-[#000] font-bold text-lg truncate text-center mt-4 pb-4 border-solid border-b border-[#E0E0E0]">
          {shopItem.name} | {shopItem.weight}
        </div>
        <div className="font-[PingFang SC, PingFang SC] text-[#708090] font-medium text-lg mt-4 pb-4 border-solid border-b border-[#E0E0E0]">
          簡介：{shopItem.remarks}
        </div>
        {/* <div className="font-[PingFang SC, PingFang SC] text-[#708090] font-medium text-lg mt-4 pb-5 border-solid border-b border-[#E0E0E0]">
          <div className="mb-2.5">重量</div>
          <CapsuleTabs
            defaultActiveKey="fruits"
            style={{
              "--adm-color-primary": "#4682B4",
              borderRadius: "10px",
              "--adm-font-size-7": 18,
              "--adm-color-fill-content": "#B0C4DE",
            }}
          >
            <CapsuleTabs.Tab title="100g" key="fruits"></CapsuleTabs.Tab>
            <CapsuleTabs.Tab title="1kg" key="vegetables"></CapsuleTabs.Tab>
            <CapsuleTabs.Tab title="10kg" key="animals"></CapsuleTabs.Tab>
          </CapsuleTabs>
        </div> */}
        <div className="flex justify-center mt-5">
          <Stepper
            defaultValue={0}
            style={{
              "--border": "1px solid #B0C4DE",
              "--border-inner": "1px solid #B0C4DE",
              "--button-width": "52px",
              "--button-text-color": "#708090",
              "--input-font-color": "#708090",
              "--border-radius": "6px",
              "--height": "47px",
              "--input-width": "83px",
              "--input-font-size": "18px",
              "--button-background-color": "#F1F1F1",
              "--input-background-color": "#F1F1F1",
            }}
            value={Number(number)}
              onChange={(value) => {
                console.log(value);
                setNumber(value.toString());
              }}
          />
        </div>
      </div>
      <ShopBottom data={data} handleAddOrder={handleAddOrder}/>
      <FooterToolBar />
    </div>
  );
});

export default News;
