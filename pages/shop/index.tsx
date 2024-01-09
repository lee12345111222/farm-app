import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, SearchBar, Tabs } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shop">
      <div className="bg-cover h-36">
        <Header logo />
      </div>
      <div className="px-4">
        <SearchBar
          placeholder="搜尋"
          showCancelButton
          icon={<img src='/news/search.png' className="w-4 h-4 mr-2"/>}
          style={{
            "--border-radius": "44px",
            "--background": "#ffffff",
            "--height": "44px",
            "--padding-left": "12px",
          }}
        />
        <Tabs
          activeLineMode="fixed"
          className="my-6 text-[#708090] font-bold"
          style={{
            "--title-font-size": "20px",
            "--active-title-color": "#000",
            "--active-line-color": "#000",
            "--fixed-active-line-width": "18px",
          }}
        >
          <Tabs.Tab title={language[activeLocale || "zh"]?.takeorally} key="fruits" />
          <Tabs.Tab title={language[activeLocale || "zh"]?.vaccine} key="vegetables" />
        </Tabs>
        <ShopList/>
      </div>
      <img src="/news/shopCart.png" alt="" className="fixed right-4 bottom-[110px] w-11" />
      <FooterToolBar />
    </div>
  );
});

export default News;
