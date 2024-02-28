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
import { selectUser, useSelector } from "@/lib/redux";

const admin = true; //管理員

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const query = useSelector(selectUser);
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [activeKey, setActiveKey] = useState("0"); // 0:口服,1:疫苗
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const getShopList = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchPost(
      "/commodity/query_page?page=" + page + "&size=10",
      {
        name,
        type: activeKey,
        ...params,
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      const list: Record<string, any> = res.data?.[0] || {};
      console.log(params, "params", list);

      if (params) {
        setData(list.list || []);
        setHasMore(list.page?.totalNumber > (list.list || [])?.length);
        setPage(1);
      } else {
        setData(data.concat(list.list || []));
        setHasMore(
          list.page?.totalNumber > data.concat(list.list || [])?.length
        );
        setPage(page + 1);
      }
    } else {
      setHasMore(false);
    }
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
    console.log(123);
  };
  const handleDeleteClick = async (commodityId: string) => {
    Dialog.show({
      content: "Are you sure you want to delete it?",
      closeOnAction: true,
      actions: [
        [
          {
            key: "cancel",
            text: "cancel",
          },
          {
            key: "delete",
            text: "delete",
            bold: true,
            danger: true,
          },
        ],
      ],
      onAction: async (action: Action, index: number) => {
        console.log(action, index);
        if (action.key === "delete") {
          let res = await fetchGet("/commodity/delete/" + commodityId, {});
          if (res?.code === "0") {
            console.log(res, "res");
            Toast.show("success");
            getShopList({});
          } else {
            Toast.show("Network error");
          }
        }
      },
    });
  };

  const handleAddClick = async (commodityId: string, number: string) => {
    let res = await fetchPost(
      "/cart/add_commodity",
      { commodityId, number },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show("success");
    } else {
      Toast.show("Network error");
    }
  };

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
            onSearch={(value) => {
              getShopList({ name: value });
              setName(value);
            }}
            icon={<img src="/news/search.png" className="w-4 h-4 mr-2" />}
            style={{
              "--border-radius": "44px",
              "--background": "#ffffff",
              "--height": "44px",
              "--padding-left": "12px",
            }}
          />
          {query.admin === "1" && (
            <Button
              onClick={() => router.push("/addshop")}
              size="mini"
              type="button"
              color="primary"
              fill="solid"
              className="!ml-2"
              style={{
                "--background-color": "#4682B4",
                "--border-radius": "44px",
              }}
            >
              {language[activeLocale || "zh"]?.addshop}
            </Button>
          )}
        </div>

        <Tabs
          activeLineMode="fixed"
          className="my-6 text-[#708090] font-bold"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            getShopList({ type: key, page: 1 });
            setPage(1);
          }}
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
          <Tabs.Tab title={language[activeLocale || "zh"]?.vaccine} key="1" />
        </Tabs>
        <ShopList
          hasMore={hasMore}
          data={data}
          loadMore={getShopList}
          addToCart={handleAddClick}
          deleteProduct={handleDeleteClick}
        />
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
