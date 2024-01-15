import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px]">
      <div className="bg-cover h-44">
        <Header logo />
      </div>
      {new Array(5).fill(1).map((ele, idx) => (
        <div className="px-4 py-4 bg-white rounded-t-xl mx-5 mb-3">
          <div className="font-[PingFang SC, PingFang SC] font-bold text-[#708090] text-base mb-2">
            文字描述
          </div>
          <div className="font-[PingFang SC, PingFang SC] text-[#708090] font-medium text-sm truncate w-[70%]">
            最新消息最新消息最新消息
          </div>
        </div>
      ))}
      <FooterToolBar />
    </div>
  );
});

export default News;
