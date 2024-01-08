import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className="w-full h-full bg-[#F6F9FF]">
      <div className="bg-[url('/background.png')] bg-cover h-[34%]">
        <Header />
      </div>
      <div className="px-6 mt-[-57px]">
        <div className="h-24 bg-white rounded-t-2xl flex items-center pl-6">
          <img src="/user_photo.png" alt="" className="w-14" />
          <div className="ml-5 py-1 w-full">
            <div className="font-[PingFang SC-Bold] font-blod text-[#708090] text-2xl leading-7">
              最新消息
            </div>
            <div className="font-[PingFang SC-Medium] font-medium text-[#708090] text-1xl leading-7 ">
              最新消息最新消息最新消息
            </div>
          </div>
        </div>
        {new Array(5).fill(1).map((ele, idx) => (
          <div className="pb-4 bg-white rounded-[30px] mt-[40px]" key={idx}>
            <img src="/user_photo.png" alt="" className="w-full h-20" />
            <div className="w-full px-6 flex font-[PingFang SC-Bold] font-blod text-[#708090] text-2xl leading-4">
              <span className="mr-2">
                12月會讯
              </span>
              <span>25/12/2023</span>
            </div>
            <div className="w-full px-6 font-[PingFang SC-Medium] font-medium text-[#708090] text-1xl leading-4 mt-2.5">
              最新消息最新消息最新消息
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
});

export default News;
