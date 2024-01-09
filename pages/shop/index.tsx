import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, SearchBar, Tabs } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] shop">
      <div className="bg-cover h-36">
        <Header logo />
      </div>
      <div className="px-4">
        <SearchBar
          placeholder="搜尋"
          showCancelButton
          style={{
            "--border-radius": "44px",
            "--background": "#ffffff",
            "--height": "44px",
            "--padding-left": "12px",
          }}
        />
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
          <Tabs.Tab title="口服" key="fruits" />
          <Tabs.Tab title="疫苗" key="vegetables" />
        </Tabs>
      </div>

      <FooterToolBar />
    </div>
  );
});

export default News;
