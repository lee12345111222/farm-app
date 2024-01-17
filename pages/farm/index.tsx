import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import {
  Form,
  Input,
  Button,
  Dropdown,
  Radio,
  Space,
  Divider,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import PieChart from "@/components/pieChart";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const list = [
    {
      name: language[activeLocale || "zh"]?.immunityname,
      click: () => router.push("/immunity"),
    },
    {
      name: language[activeLocale || "zh"]?.cleanname,
      click: () => router.push("/clean"),
    },
    {
      name: language[activeLocale || "zh"]?.feedname,
      click: () => router.push("/feed"),
    },
    {
      name: language[activeLocale || "zh"]?.chickenbatchname,
      click: () => router.push("/chickenBatch"),
    },
  ];

  const getDom = (title?: string) => (
    <Dropdown
      className="rounded-md text-[#708090]"
      style={{
        "--adm-font-size-main": "12px",
      }}
    >
      <Dropdown.Item key="sorter" title={title || "泰安雞"}>
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
  );

  return (
    <div className="w-full h-screen bg-[#F6F9FF] farm pb-6 overflow-auto relative">
      <div className="bg-[url('/news/farmbg.png')] bg-cover h-[51%] ">
        <Header
          back
          title={language[activeLocale || "zh"]?.myfarm}
          styles="top-8"
        />
        <div className="overflow-hidden">
          <div className="mt-20 h-52 w-[84%] bg-white pl-6 pt-4 pr-5 rounded-md">
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-lg mb-4">
              {language[activeLocale || "zh"]?.farmhello}
            </div>
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm mb-4">
              {language[activeLocale || "zh"]?.farmquota}
              <span className="font-bold underline ml-2">100</span>
            </div>
            <div className="flex items-center mb-3 ">
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                {language[activeLocale || "zh"]?.chickentype}
              </div>
              <div className="justify-between flex flex-1">
                {new Array(3).fill(1).map((ele, idx) => getDom())}
              </div>
            </div>
            <div className="flex items-center mb-4 flex-1 justify-between ">
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                {language[activeLocale || "zh"]?.cooptype}
              </div>
              <div className="tablePage flex-1">{getDom("開放式")}</div>
            </div>
            <div className="flex items-center flex-1 justify-between">
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
              {language[activeLocale || "zh"]?.small}: <span className="font-bold underline">x</span> {language[activeLocale || "zh"]?.nums}
              </div>
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
              {language[activeLocale || "zh"]?.medium}: <span className="font-bold underline">x</span> {language[activeLocale || "zh"]?.nums}
              </div>
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
              {language[activeLocale || "zh"]?.big}: <span className="font-bold underline">x</span> {language[activeLocale || "zh"]?.nums}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 -mt-6 px-5 py-4 rounded-md bg-white">
        <div className="tablePage farm-content">{getDom(`${language[activeLocale || "zh"]?.batch}A`)}</div>
        <div className="flex mt-4 items-center justify-between">
          {new Array(3).fill(1).map((ele, idx) => (
            <>
              <div className="text-center" key={idx}>
                <div className="w-16 h-11">
                  <PieChart type="pie" />
                </div>
                <div className="font-[PingFang SC, PingFang SC] font-normal text-[#708090] text-sm mt-3">
                  form{idx + 1}
                </div>
              </div>
              {idx !== 2 && <Divider direction="vertical" className="!h-12" />}
            </>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-3 px-5 rounded-md bg-white overflow-hidden">
        {list.map((ele) => (
          <div
            key={ele.name}
            className="flex py-5 justify-between items-center border-b border-[#F0F0F0]"
          >
            <div className="font-[PingFang SC, PingFang SC] font-normal text-[#708090] text-base">
              {ele.name}
            </div>
            <div className="flex items-center" onClick={ele.click}>
              <div className="font-[PingFang SC, PingFang SC] font-normal text-[#4682B4] text-xs mr-2.5">
                view more
              </div>
              <img src="/news/arrowright.png" className="w-2.5 h-1" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
