"use client";
import React, { memo, useLayoutEffect, useState } from "react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { Button, Dropdown, InfiniteScroll, Radio, Space } from "antd-mobile";
import { baseUrl, fetchPost } from "@/utils/request";
import { convertPdfToImages, upload } from "@/utils";
import { selectUser, useSelector } from "@/lib/redux";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const query = useSelector(selectUser);

  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // useLayoutEffect(() => {
  //   convertPdfToImages(
  //     baseUrl + "/resources/downloadFile/78ebdb2726494a90ab998c38863b81eb"
  //   ).then((res) => {
  //     console.log(res, "res");
  //     setImages(res);
  //   });
  // }, []);

  const handleAdd = () => {
    upload(
      "/resources/addFile",
      () => {
        getShopList({});
      },
      ["pdf"]
    );
  };
  const getShopList = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchPost(
      `/resources/query_page?page=${page}&size=10`,
      {}
    );
    console.log(res, "rss");
    if (res?.code === "0") {
      const list: Record<string, any> = res.data?.[0] || {};
      console.log(params, "params", list);
      let dataRes = list.list || [];
      // dataRes[0].id = await convertPdfToImages(
      //           baseUrl + "/resources/downloadFile/"+dataRes[0].id
      //         )

      //         console.log(dataRes, 'dataRes')
      // let len =
      // dataRes = dataRes.map(ele => {
      //   ele.id = await convertPdfToImages(
      //         baseUrl + "/resources/downloadFile/78ebdb2726494a90ab998c38863b81eb"
      //       )
      // })
      if (params) {
        setData(dataRes);
        setHasMore(list.page?.totalNumber > dataRes?.length);
        setPage(1);
      } else {
        setData(data.concat(dataRes));
        setHasMore(list.page?.totalNumber > data.concat(dataRes)?.length);
        setPage(page + 1);
      }
    } else {
      setHasMore(false);
    }
  };

  const getUrl = async (ele) => {
    console.log(ele, "res");
    if (typeof window !== "undefined") {
      const res = await convertPdfToImages(
        baseUrl + "/resources/downloadFile/" + ele.id
      );
      console.log(res, "res");
      return res;
    } else {
      return "/news/table.png";
    }
  };

  console.log(data, "data");

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] tablePage">
      <div className="bg-cover h-32">
        <Header logo />
      </div>
      <div className="px-4">
        {query.admin === "1" && (
          <div className="text-right">
            <Button
              size="mini"
              type="button"
              color="primary"
              fill="solid"
              onClick={handleAdd}
              style={{
                "--background-color": "#4682B4",
              }}
            >
              新增
            </Button>
          </div>
        )}

        <div className="flex flex-wrap justify-between">
          {data.map((ele: Record<string, any>, idx) => (
            <div
              onClick={() => window.open(baseUrl + "/resources/downloadFile/"+ele.id)}
              className="w-[45%] h-44 bg-white mt-4 rounded-xl flex flex-col items-center"
              key={idx}
            >
              <div className="font-[PingFang SC, PingFang SC] text-[#333333] font-medium text-lg truncate text-center mt-4 pb-3">
                {idx}
              </div>
              <img src={"/news/table.png"} className="w-20 h-24" alt="" />
            </div>
          ))}
        </div>
      </div>
      <InfiniteScroll loadMore={() => getShopList()} hasMore={hasMore} />
      <FooterToolBar />
    </div>
  );
});

export default News;
