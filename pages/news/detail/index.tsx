import React, { memo, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import {
  Form,
  Input,
  Button,
  InfiniteScroll,
  Dialog,
  Toast,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { baseUrl, fetchGet, fetchPost } from "@/utils/request";
import { Action } from "antd-mobile/es/components/action-sheet";
import { selectUser, useSelector } from "@/lib/redux";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale, query } = router;
  const admin = useSelector(selectUser);

  const { msgTime } = query;
  console.log(msgTime, "msgtibe");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const getNewsList = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchPost(
      `/notice/query_page_month?page=${page}&size=10`,
      {
        msgTime,
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
  };
  const handleDelete = async (row: Record<string, any>) => {
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
          let res = await fetchGet("notice/delete/" + row?.id, {});
          if (res?.code === "0") {
            console.log(res, "res");
            Toast.show("success");
            getNewsList({ page: 1 });
          } else {
            Toast.show("Network error");
          }
        }
      },
    });
  };

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px]">
      <div className="bg-cover h-44">
        <Header logo />
      </div>
      {/* {new Array(5).fill(1).map((ele, idx) => (
        <div className="px-4 py-4 bg-white rounded-t-xl mx-5 mb-3">
          <div className="font-[PingFang SC, PingFang SC] font-bold text-[#708090] text-base mb-2">
            文字描述
          </div>
          <div className="font-[PingFang SC, PingFang SC] text-[#708090] font-medium text-sm truncate w-[70%]">
            最新消息最新消息最新消息
          </div>
        </div>
      ))} */}
      <div className="px-6 mt-[-70px]">
        {data.map((ele, idx) => (
          <div
            className="pb-4 bg-white rounded-2xl mt-[40px] relative"
            onClick={() => router.push("/news/detail")}
            key={idx}
          >
            {admin.admin === "1" ? (
              <Button
                size="mini"
                type="button"
                color="danger"
                fill="solid"
                className="top-2 right-2 !absolute"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(ele);
                }}
              >
                {language[activeLocale || "zh"]?.delete}
              </Button>
            ) : null}
            <img
              src={
                baseUrl + "/resources/downloadFile/" + ele.image ||
                "/home_slices/bg.png"
              }
              alt=""
              className="rounded-t-2xl w-full h-20 object-cover"
            />
            <div className="w-full px-6 flex font-[PingFang SC-Bold] font-blod text-[#708090] text-2xl leading-4 mt-4">
              <span className="mr-2">{ele.title}</span>
              <span>{ele.msgTime}</span>
            </div>
            <div className="w-full px-6 font-[PingFang SC-Medium] font-medium text-[#708090] text-1xl leading-4 mt-2.5">
              {ele.text}
            </div>
          </div>
        ))}

        <InfiniteScroll
          loadMore={() => msgTime && getNewsList()}
          hasMore={hasMore}
        />
      </div>

      <FooterToolBar />
    </div>
  );
});

export default News;
