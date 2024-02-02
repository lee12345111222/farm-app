import React, { memo, useMemo, useState } from "react";
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
  Dialog,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import PieChart from "@/components/pieChart";
import CalendarPicker from "@/components/calendarPicker";
import CalendarDown from "@/components/calendarDown";
import InputList from "@/components/inputList";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const tab = [
    { name: language[activeLocale || "zh"]?.mortality },
    { name: language[activeLocale || "zh"]?.medicationrecords },
  ];

  const [active, setActive] = useState(0);

  const listObj: Record<number, any> = useMemo(() => {
    return {
      0: new Array(4).fill(1).map((ele, idx) => {
        console.log(language[activeLocale || "zh"][`animalstab${0}name${idx}`]);
        return {
          name: language[activeLocale || "zh"][`animalstab${0}name${idx}`],
          unit: idx===2?language[activeLocale || "zh"].animalstab1name4unit: language[activeLocale || "zh"].nums,
        };
      }),
      1: new Array(5).fill(1).map((ele, idx) => {
        console.log(language[activeLocale || "zh"]?.[`animalstab${1}name${idx}`])
        return {
          name: language[activeLocale || "zh"]?.[`animalstab${1}name${idx}`],
          unit: language[activeLocale || "zh"]?.[`animalstab${1}name${idx}unit`] || '',
        };
      }),
    };
  }, [activeLocale]);

  const getDom = (title?: string) => (
    <CalendarPicker
      styles="!text-sm !font-normal"
      containerStyles="!px-3 !py-1"
    />
  );

  const handleClose = () => {
    Dialog.confirm({
      title: "確認嗎 若確認 批次將從活躍中移至已關閉",
      onConfirm: async () => {},
    });
  };

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
              // color="primary"
              fill="solid"
              color="danger"
              // style={{
              //   "--background-color": "#",
              // }}
              onClick={handleClose}
            >
              關閉
            </Button>
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
          {tab.map((ele, idx) => (
            <div
              key={ele.name}
              onClick={() => setActive(idx)}
              className={`rounded-lg font-[PingFang SC, PingFang SC] font-medium text-[#fff] text-sm w-40 h-9 text-center leading-9 ${
                active === idx ? "bg-[#4682B4]" : ""
              }`}
            >
              {ele.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-3">
        <CalendarDown />
      </div>
      <div className="mx-3 mt-2 px-5 bg-white overflow-hidden rounded-lg">
        <InputList list={listObj?.[active]} unit />
      </div>
      {/* <div className="mx-3 mt-3">
        <div className="flex flex-wrap justify-between bg-white rounded-2xl py-3 h-48">
          <PieChart type="doubouleOptions" />
        </div>
      </div> */}
    </div>
  );
});

export default News;
