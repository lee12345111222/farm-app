import React, { memo, useCallback, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, SearchBar, Tabs } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";
import ShopBottom from "@/components/shopBottom";
import { fetchGet } from "@/utils/request";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getShopList = useCallback(async (params?:Record<string,any>) => {
    let res = await fetchGet("/cart/query_page", { page: 1, size: 10, ...params });
    if (res?.code === "0") {
      const data = res.data?.[0] || {};

      console.log(data, "data");

      setData(data.list || []);
      setHasMore(data.page?.totalNumber > data.list?.length);
    } else {
      setHasMore(false);
    }
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
    console.log(123);
  }, []);

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shop">
      <div className="bg-cover h-36">
        <Header back title={language[activeLocale || "zh"]?.shopCart} />
      </div>
      <div className="px-4">
        <ShopList shopCart data={data} loadMore={getShopList} />
      </div>
      <ShopBottom></ShopBottom>

      <FooterToolBar />
    </div>
  );
});

export default News;
