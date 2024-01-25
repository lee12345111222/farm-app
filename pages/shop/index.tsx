import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import {
  Form,
  Input,
  Button,
  SearchBar,
  Tabs,
  InfiniteScroll,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";
import { fetchGet } from "@/utils/request";

const admin = true//管理員

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getShopList = useCallback(async () => {
    let res = await fetchGet("/commodity/query_page", { page: 1, size: 10 });
    if (res.code === "0") {
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
        <Header logo />
      </div>
      <div className="px-4">
        <div className="flex">
          <SearchBar
            placeholder={language[activeLocale || "zh"]?.search}
            showCancelButton
            className="flex-1"
            icon={<img src="/news/search.png" className="w-4 h-4 mr-2" />}
            style={{
              "--border-radius": "44px",
              "--background": "#ffffff",
              "--height": "44px",
              "--padding-left": "12px",
            }}
          />
          {admin&&<Button
            onClick={() => router.push('/addshop')}
            size="mini"
            type="button"
            color="primary"
            fill="solid"
            className="!ml-2"
            style={{
              "--background-color": "#4682B4",
              '--border-radius': "44px",
            }}
          >
            {language[activeLocale || "zh"]?.addshop}
          </Button>}
        </div>

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
          <Tabs.Tab
            title={language[activeLocale || "zh"]?.takeorally}
            key="fruits"
          />
          <Tabs.Tab
            title={language[activeLocale || "zh"]?.vaccine}
            key="vegetables"
          />
        </Tabs>
        <ShopList hasMore={hasMore} data={data} loadMore={getShopList} />
      </div>
      <img
        src="/news/shopCart.png"
        onClick={() => router.push("/shopCart")}
        alt=""
        className="fixed right-4 bottom-[110px] w-11"
      />
      <FooterToolBar />
    </div>
  );
});

export default News;
