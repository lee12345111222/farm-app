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
import { selectUser, useSelector } from "@/lib/redux";

interface Iprops {
  sendMessage: Function;
  messagememo: Record<string, any>;
}

const News = memo(({sendMessage}: Iprops) => {
  const router = useRouter();
  const query = useSelector(selectUser);
  const { locale: activeLocale } = router;
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getShopList = async (params?: Record<string, any>) => {
    let res:Record<string, any> = await fetchPost("/cart/query_page?page="+page+'&size=10', {
      ...params,
    },{
      "Content-Type": "application/json",
    });
    if (res?.code === "0") {
      const list = res.data?.[0] || {};
      console.log(params, "params", list);

      if (params) {
        setData(list.list || []);
        setHasMore(list.page?.totalNumber > (list.list || [])?.length);
        setPage(1)
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
            getShopList({});
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
      confirmText: 'Ok',
      cancelText: 'Cancel',
      onConfirm: async () => {
        let result:Record<string,any> = await fetchPost(
          "/order/add",
          data.map((ele) => ({
            commodityId: ele.id,
            number: Number(ele.number),
          })),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(result, 'result')
        if (result?.code === "0") {
          Toast.show("success");
          //發送狀態
          let res = sendMessage?.(
            JSON.stringify({
              message: JSON.stringify({
                msgId: "0001",
                sendId: query.id,
                acceptId:
                  "42d83d66fdf0451db16c3fe434f09e61",
                msgType: "1",
                msgValue: '生成一條訂單:' + result.data?.orderId,
              }),
            })
          );
          console.log(res, "res");
          if (!res) {
            Toast.show({
              content: "network error",
            });
            return;
          }
          let list = localStorage.getItem("message" + query.id) || "[]";
          let pre = JSON.parse(list);
          localStorage.setItem(
            "message" + query.id,
            JSON.stringify([
              ...pre,
              {
                id: Math.random(),
                text: '生成一條訂單:' + result.data?.orderId,
                type: "send",
                avatar: "/user_photo2.png",
              },
            ])
          );
          router.push('/chat')
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
