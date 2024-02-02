import React, { memo, useMemo, useState } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";
import InputList from "@/components/inputList";
import CalendarDown from "@/components/calendarDown";

// const list = [
//   { name: "每月混合飼料次數", unit: '次' },
//   { name: "飼料混合器數量" , unit: '個'},
//   { name: "雞苗飼料混合器容量" , unit: '公斤'},
//   { name: "中雞至大雞飼料混合器容量" , unit: '公斤'},
//   { name: "大雞飼料混合器容量" , unit: '公斤'},
//   { name: "料塔容量" , unit: '公斤'},
//   { name: "料塔敷量" , unit: '個'},
//   { name: "每月飼料混合器清潔次數" , unit: '次'},
//   { name: "每月料塔清潔次數" , unit: '次'},
// ];
// The number of mixed feeds per month
// The number of feeder mixers
// Chicken fry feed mixer capacity
// Medium to large chicken feeder capacity
// Chicken mixer capacity
// Tower capacity
// The amount of material tower dressing
// The number of cleaning times per month for the feed mixer
// The number of times the tower is cleaned per month

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const tab = [
    { name: language[activeLocale || "zh"]?.feedingdose },
    { name: language[activeLocale || "zh"]?.capacity },
    { name: language[activeLocale || "zh"]?.spermdose },
  ];
  const list = [
    {
      name: language[activeLocale || "zh"]?.feedsmonth,
      unit: activeLocale === "zh" ? "次" : "",
    },
    {
      name: language[activeLocale || "zh"]?.feedermixers,
      unit: activeLocale === "zh" ? "個" : "",
    },
    {
      name: language[activeLocale || "zh"]?.mixercapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
    },
    {
      name: language[activeLocale || "zh"]?.mediumcapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
    },
    {
      name: language[activeLocale || "zh"]?.chickenmixercapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
    },
    {
      name: language[activeLocale || "zh"]?.towercapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
    },
    {
      name: language[activeLocale || "zh"]?.amountdressing,
      unit: activeLocale === "zh" ? "個" : "",
    },
    {
      name: language[activeLocale || "zh"]?.numberfeedmixer,
      unit: activeLocale === "zh" ? "次" : "",
    },
    {
      name: language[activeLocale || "zh"]?.numbercleaned,
      unit: activeLocale === "zh" ? "次" : "",
    },
  ];

  const listObj: Record<number, any> = useMemo(() => {
    return {
      0: new Array(6).fill(1).map((ele, idx) => {
        console.log(language[activeLocale || "zh"][`feedtab${0}name${idx}`]);
        return {
          name: language[activeLocale || "zh"][`feedtab${0}name${idx}`],
          unit: activeLocale === "zh" ? "次" : "",
        };
      }),
      1: list,
      2: new Array(6).fill(1).map((ele, idx) => ({
        name: language[activeLocale || "zh"]?.[`feedtab${2}name${idx}`],
        unit: activeLocale === "zh" ? "次" : "",
      })),
    };
  }, [activeLocale, list]);
  console.log(listObj, "listObj");

  const [active, setActive] = useState<number>(0);

  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative">
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.feed}
          styles="top-10"
        />
      </div>
      <div className="mx-3 h-12 mt-3 bg-[#B0C4DE] flex justify-between px-1 items-center rounded-lg">
        {tab.map((ele, idx) => (
          <div
            key={ele.name}
            onClick={() => setActive(idx)}
            className={`rounded-lg font-[PingFang SC, PingFang SC] font-medium text-[#fff] text-sm w-28 h-9 text-center leading-9 ${
              active === idx ? "bg-[#4682B4]" : ""
            }`}
          >
            {ele.name}
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3">
        <CalendarDown />
      </div>
      <div className="mx-3 mt-2 px-5 bg-white overflow-hidden rounded-lg">
        <InputList list={listObj?.[active]} unit />
      </div>
    </div>
  );
});

export default News;
