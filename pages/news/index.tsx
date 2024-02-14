import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, InfiniteScroll, Toast } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { fetchGet, fetchPost } from "@/utils/request";
import { ActionModal } from "@/components/actionModal";

const Json = [
  { type: "input", key: "title", lable: "标题", required: true },
  { type: "input", key: "text", lable: "内容", required: true },
  { type: "date", key: "msgTime", lable: "日期", required: true },
  { type: "upload", key: "resourcesId", lable: "图片", required: true },
];

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [page, setPage] = useState(1);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [newData, setNewData] = useState<Record<string, any>>({});
  const [visible, setVisible] = useState(true);

  const getLatest = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchGet("/notice/query_latest", {
      ...params,
    });
    if (res?.code === "0") {
      setNewData(res.data);
    } else {
      setHasMore(false);
    }
  };

  const getNewsList = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchGet("/notice/query_page_month", {
      page,
      size: 10,
      ...params,
    });
    if (res?.code === "0") {
      const list: Record<string, any> = res.data?.[0] || {};
      console.log(params, "params", list);

      if (params) {
        setData(list.list || []);
        setHasMore(list.page?.totalNumber > (list.list || [])?.length);
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

  useEffect(() => {
    getLatest();
  }, []);

  const handleAdd = async(params) => {
    let res = await fetchPost("/notice/add", params, {
      "Content-Type": "application/json",
    });
    if(res.code === '0'){
      Toast.show('success')
      getNewsList({page: 1})
    }else{
      Toast.show(res.data)
    }
  }

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] ">
      <ActionModal
        title="新增"
        contentJson={Json}
        visible={visible}
        setVisible={setVisible}
        onOk={handleAdd}
      />
      <div className="bg-[url('/home_slices/bg.png')] bg-cover h-64">
        <Header home={true} />
      </div>
      <div className="px-6 mt-[-57px] pb-[143px]">
        <div className="h-24 bg-white rounded-t-2xl flex items-center pl-6">
          <img src="/user_photo.png" alt="" className="w-14" />
          <div className="ml-5 py-1 w-full">
            <div className="font-[PingFang SC-Bold] font-blod text-[#708090] text-2xl leading-7">
              {/* {language[activeLocale || "zh"]?.latestnews} */}
              {newData.title || "-"}
            </div>
            <div className="font-[PingFang SC-Medium] font-medium text-[#708090] text-1xl leading-7 truncate w-[70%]">
              {newData.text || "-"}
            </div>
          </div>
        </div>
        {/* {new Array(5).fill(1).map((ele, idx) => (
          <div
            className="pb-4 bg-white rounded-2xl mt-[40px]"
            onClick={() => router.push("/news/detail")}
            key={idx}
          >
            <img
              src="/home_slices/bg.png"
              alt=""
              className="rounded-t-2xl w-full h-20 object-cover"
            />
            <div className="w-full px-6 flex font-[PingFang SC-Bold] font-blod text-[#708090] text-2xl leading-4 mt-4">
              <span className="mr-2">12月會讯</span>
              <span>25/12/2023</span>
            </div>
            <div className="w-full px-6 font-[PingFang SC-Medium] font-medium text-[#708090] text-1xl leading-4 mt-2.5">
              最新消息最新消息最新消息
            </div>
          </div>
        ))} */}
        <InfiniteScroll loadMore={() => getNewsList()} hasMore={hasMore} />
        {/* <div className="text-center mt-4">
          <Button
            type="submit"
            color="primary"
            fill="solid"
        
            className="h-16 primary-solid-button rounded-2xl font-[PingFang SC] text-sm"
          >
             {language[activeLocale || "zh"]?.more}
          </Button>
        </div> */}
        <img
          src="/news/backTop.png"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          alt=""
          className="fixed right-6 bottom-[143px] w-8"
        />
      </div>
      <FooterToolBar />
    </div>
  );
});

export default News;
