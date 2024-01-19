import React, { memo, useState } from "react";
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

  const tab = [
    { name: language[activeLocale || "zh"]?.mortality },
    { name: language[activeLocale || "zh"]?.medicationrecords },
  ];

  const [active, setActive] = useState("死淘率");

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
      <div className="bg-[url('/home_slices/bg.png')] bg-cover h-64">
        <Header home back title="雞群A" />
      </div>
      <div className="overflow-hidden px-3 -mt-36 flex justify-center">
        <div className="pb-5 w-[100%] bg-white pl-6 pt-4 pr-5  rounded-2xl relative">
          <Space className="absolute right-3 top-4">
            <Button
              size="mini"
              type="button"
              color="primary"
              fill="solid"
              style={{
                "--background-color": "#4682B4",
              }}
            >
              保存
            </Button>
            <Button size="mini" type="reset" fill="solid">
              重設
            </Button>
          </Space>
          <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm mb-6 flex">
            <span className="flex-shrink-0">
              {language[activeLocale || "zh"]?.batchname}：
            </span>
            <Input
              className="font-medium underline -mt-1"
              defaultValue="xxx"
              style={{
                "--color": "#708090",
                fontSize: 14,
              }}
            />
          </div>
          <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm mb-4 flex">
            <span className="flex-shrink-0">ID：</span>
            <Input
              className="font-medium underline -mt-1"
              defaultValue="xxx"
              style={{
                "--color": "#708090",
                fontSize: 14,
              }}
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
              {language[activeLocale || "zh"]?.incubationdate}:
            </div>
            <div className="w-30 ml-2">{getDom("11/11/2023")}</div>
          </div>
          <div className="flex items-center mb-6">
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm flex-shrink-0">
              {language[activeLocale || "zh"]?.chickentotal}:
            </div>
            <Input
              className="font-medium underline -mt-1 !w-10 ml-2"
              defaultValue="2045"
              style={{
                "--color": "#708090",
                fontSize: 14,
              }}
            />
            <span className="font-bold underline ml-2 text-[#708090]  flex-shrink-0">
              {" "}
              {activeLocale === "zh" ? "隻" : ""}
            </span>
          </div>
          <div className="flex items-center">
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm flex-shrink-0">
              {language[activeLocale || "zh"]?.chickenseedlingsupplier}:
            </div>
            <Input
              className="font-medium underline -mt-1 ml-2"
              defaultValue="xxx"
              style={{
                "--color": "#708090",
                fontSize: 14,
              }}
            />
            {/* <span className="font-bold underline ml-2 text-[#708090] ">
              XXXX{" "}
            </span> */}
          </div>
        </div>
      </div>
      <div className="mx-3">
        <div className="flex flex-wrap justify-between">
          {["line", "pie", "line", "bar"].map((ele: any, idx) => (
            <>
              <div
                className="w-[47%] bg-white h-32 mt-3  rounded-2xl py-3"
                key={idx}
              >
                <PieChart type={ele} />
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-3 pt-3 pb-4 px-3  bg-white  rounded-2xl">
        <div className="h-12 bg-[#B0C4DE] flex justify-between px-1 items-center rounded-lg">
          {tab.map((ele) => (
            <div
              key={ele.name}
              onClick={() => setActive(ele.name)}
              className={`rounded-lg font-[PingFang SC, PingFang SC] font-medium text-[#fff] text-sm w-40 h-9 text-center leading-9 ${
                active === ele.name ? "bg-[#4682B4]" : ""
              }`}
            >
              {ele.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-3">
        <div className="flex flex-wrap justify-between bg-white rounded-2xl py-3 h-48">
          <PieChart type="doubouleOptions" />
        </div>
      </div>
    </div>
  );
});

export default News;
