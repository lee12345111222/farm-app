import React, { memo } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";

const list = [
  { name: "本免疫程序有效日期" },
  { name: "疫苗名稱" },
  { name: "疫苗毒株" },
  { name: "疫苗種類" },
  { name: "接種日龄" },
  { name: "接種次數" },
  { name: "接種劑量" },
  { name: "接種途徑" },
  { name: "疫苗製造商" },
  { name: "疫苗製造地" },
];

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative">
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.immunity}
          styles="top-10"
        />
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
            <div className="flex items-center">
              {/* <div className="font-[PingFang SC, PingFang SC] font-normal text-[#4682B4] text-xs mr-2.5">
                view more
              </div>
              <img src="/news/arrowright.png" className="w-2.5 h-1" alt="" /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
