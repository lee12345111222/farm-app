import React, { memo, useState } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";

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
    { name: language[activeLocale || "zh"]?.feedingdose},
    { name: language[activeLocale || "zh"]?.capacity },
    { name: language[activeLocale || "zh"]?.spermdose},
  ];
  const list = [
    { name: "每月混合飼料次數", unit: '次' },
    { name: "飼料混合器數量" , unit: '個'},
    { name: "雞苗飼料混合器容量" , unit: '公斤'},
    { name: "中雞至大雞飼料混合器容量" , unit: '公斤'},
    { name: "大雞飼料混合器容量" , unit: '公斤'},
    { name: "料塔容量" , unit: '公斤'},
    { name: "料塔敷量" , unit: '個'},
    { name: "每月飼料混合器清潔次數" , unit: '次'},
    { name: "每月料塔清潔次數" , unit: '次'},
  ];

  const [active, setActive] = useState("饲料用量");

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
        {tab.map((ele) => (
          <div
            key={ele.name}
            onClick={() => setActive(ele.name)}
            className={`rounded-lg font-[PingFang SC, PingFang SC] font-medium text-[#fff] text-sm w-28 h-9 text-center leading-9 ${
              active === ele.name ? "bg-[#4682B4]" : ""
            }`}
          >
            {ele.name}
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3">
        <CalendarPicker />
      </div>
      <div className="mx-3 mt-2 px-5 bg-white overflow-hidden rounded-lg">
        {list.map((ele) => (
          <div
            key={ele.name}
            className="flex pt-6 pb-4 justify-between items-center border-b border-[#D7E8FE]"
          >
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
              {ele.name}
            </div>
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
              {ele.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
