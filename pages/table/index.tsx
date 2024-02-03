'use client'
import React, { memo, useEffct, useLayoutEffect, useState } from "react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { Dropdown, Radio, Space } from "antd-mobile";
import { baseUrl } from "@/utils/request";
import { convertPdfToImages } from "@/utils";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [images , setImages] = useState([])

  useLayoutEffect(() => {
    convertPdfToImages(baseUrl + "/resources/downloadFile/c7c8db5c7f1e48279973295317e3b3dc").then(res => {
      console.log(res, 'res')
      setImages(res)
    })
  },[])

  return (
    <div className="w-full min-h-dvh bg-[#F6F9FF] pb-[143px] tablePage">
      <div className="bg-cover h-32">
        <Header logo />
      </div>
      <div className="px-4">
        <Dropdown className="rounded-xl" style={{
          '--adm-font-size-main': '18px',
          '--adm-color-light': '#000'
        } as any}>
          <Dropdown.Item key="sorter" title={language[activeLocale || "zh"]?.select}>
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue="default">
                <Space direction="vertical" block>
                  <Radio block value="default">
                    综合排序
                  </Radio>
                  <Radio block value="nearest">
                    距离最近
                  </Radio>
                  <Radio block value="top-rated">
                    评分最高
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <div className="flex flex-wrap justify-between">
          {
            new Array(4).fill(1).map((ele,idx) => (
              <div onClick={() => router.push('/record')} className="w-[45%] h-44 bg-white mt-4 rounded-xl flex flex-col items-center" key={idx}>
                <div className="font-[PingFang SC, PingFang SC] text-[#333333] font-medium text-lg truncate text-center mt-4 pb-3">表格A</div>
                <img src={images[0] || '/news/table.png'} className="w-20 h-24" alt="" />
              </div>
            ))
          }
        </div>
      </div>
      <FooterToolBar />
    </div>
  );
});

export default News;
