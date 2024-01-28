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
  Toast,
  Dialog,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";
import { fetchGet, fetchPost } from "@/utils/request";
import { Action } from "antd-mobile/es/components/action-sheet";

const admin = true//管理員

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [activeKey, setActiveKey] = useState("0"); // 0:口服,1:疫苗

  const getShopList = useCallback(async (params?:Record<string,any>) => {
    let res = await fetchGet("/commodity/query_page", { page: 1, size: 10, type: activeKey, ...params });
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
  const handleDeleteClick= async(commodityId: string) => {
    Dialog.show({
      content: 'Are you sure you want to delete it?',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: 'cancel',
          },
          {
            key: 'delete',
            text: 'delete',
            bold: true,
            danger: true,
          },
        ],
      ],
      onAction: async(action: Action, index: number) => {
        console.log(action, index)
        if(action.key === 'delete'){
          let res = await fetchGet("/commodity/delete", { id:  commodityId});
          if (res?.code === "0") {
            console.log(res, "res");
            Toast.show('success')
            getShopList()
          } else {
            Toast.show('Network error')
          }
        }
      }
    })

  
  }

  const handleAddClick = async(commodityId: string, number: string) => {
    let res = await fetchPost("/cart/add_commodity", { commodityId, number  }, {
      "Content-Type": "application/json",
    });
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show('success')
    } else {
      Toast.show('Network error')
    }
  }

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shop">
      <div className="bg-cover h-36">
        <Header logo />
      </div>
      <div className="px-4">
        <div className="flex">
          <SearchBar
            placeholder={language[activeLocale || "zh"]?.search}
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
          activeKey={activeKey}
          onChange={(key) => {setActiveKey(key);getShopList({type: key})}}
          style={{
            "--title-font-size": "20px",
            "--active-title-color": "#000",
            "--active-line-color": "#000",
            "--fixed-active-line-width": "18px",
          }}
        >
          <Tabs.Tab
            title={language[activeLocale || "zh"]?.takeorally}
            key="0"
          />
          <Tabs.Tab
            title={language[activeLocale || "zh"]?.vaccine}
            key="1"
          />
        </Tabs>
        <ShopList hasMore={hasMore} data={data} loadMore={getShopList} addToCart={handleAddClick} deleteProduct={handleDeleteClick} />
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
