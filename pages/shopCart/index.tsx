import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, SearchBar, Tabs } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";
import ShopBottom from "@/components/shopBottom";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shop">
      <div className="bg-cover h-36">
        <Header back title="購物車" />
      </div>
      <div className="px-4">
        <ShopList shopCart />
      </div>
      <ShopBottom></ShopBottom>

      <FooterToolBar />
    </div>
  );
});

export default News;
