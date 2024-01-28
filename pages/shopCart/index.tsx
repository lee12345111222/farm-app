import React, { memo, useCallback, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import {
  Form,
  Input,
  Button,
  SearchBar,
  Tabs,
  Toast,
  Dialog,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import ShopList from "@/components/shopList";
import ShopBottom from "@/components/shopBottom";
import { fetchGet, fetchPost } from "@/utils/request";
import { Action } from "antd-mobile/es/components/swipe-action";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getShopList = useCallback(async (params?: Record<string, any>) => {
    let res = await fetchGet("/cart/query_page", {
      page: 1,
      size: 10,
      ...params,
    });
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

  const handleDelete = async (commodityId: string) => {
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
          let res = await fetchPost(
            "/cart/del_commodity",
            { commodityId },
            {
              "Content-Type": "application/json",
            }
          );
          if (res?.code === "0") {
            console.log(res, "res");
            Toast.show("success");
            getShopList();
          } else {
            Toast.show("Network error");
          }
        }
      },
    });
  };

  const handleAddOrder = () => {
    Dialog.confirm({
      content: "Are you sure to submit your order?",
      onConfirm: async () => {
        let res = await fetchPost(
          "/order/add",
          data.map((ele) => ({
            commodityId: ele.id,
            number: Number(ele.number),
          })),
          {
            "Content-Type": "application/json",
          }
        );
        if (res?.code === "0") {
          console.log(res, "res");
          Toast.show("success");
      //     let list = localStorage.getItem("message" + query.id) || "[]";
      // let pre = JSON.parse(list);
      // localStorage.setItem(//接受方存储 发送在chat页面
      //   "message" + query.id,
      //   JSON.stringify([
      //     ...pre,
      //     {
      //       id: Math.random(),
      //       text: data1.msgValue,
      //       type: 'receive',
      //       avatar: "/user_photo2.png",
      //     },
      //   ])
      );
        } else {
          Toast.show("Network error");
        }
      },
    });
  };

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shop">
      <div className="bg-cover h-36">
        <Header back title={language[activeLocale || "zh"]?.shopCart} />
      </div>
      <div className="px-4">
        <ShopList
          shopCart
          data={data}
          hasMore={hasMore}
          loadMore={getShopList}
          handleDelete={handleDelete}
        />
      </div>
      <ShopBottom data={data} handleAddOrder={handleAddOrder}></ShopBottom>

      <FooterToolBar />
    </div>
  );
});

export default News;
