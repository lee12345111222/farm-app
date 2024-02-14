import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";
import InputList from "@/components/inputList";
import CalendarDown from "@/components/calendarDown";
import { fetchGet, fetchPost } from "@/utils/request";
import { Toast } from "antd-mobile";
import dayjs from "dayjs";

const UrlObj = {
  0: "/normal/add",
  1: "/feed/add",
  2: "/fine/add",
};

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
      key: "mixedFeedFrequency",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.feedermixers,
      unit: activeLocale === "zh" ? "個" : "",
      key: "mixedFeedContainersFrequency",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.mixercapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
      key: "chickenSeedMixedFeedContainersFrequency",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.mediumcapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
      key: "chickenDevelopMixedFeedContainersFrequency",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.chickenmixercapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
      key: "chickenMatureMixedFeedContainersFrequency",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.towercapacity,
      unit: activeLocale === "zh" ? "公斤" : "",
      key: "feedTowerCapacity",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.amountdressing,
      unit: activeLocale === "zh" ? "個" : "",
      key: "feedTowerNumber",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.numberfeedmixer,
      unit: activeLocale === "zh" ? "次" : "",
      key: "mixedFeedClearNumber",
      val: "",
    },
    {
      name: language[activeLocale || "zh"]?.numbercleaned,
      unit: activeLocale === "zh" ? "次" : "",
      key: "feedTowerClearNumber",
      val: "",
    },
  ];

  const listObj: Record<number, any> = useMemo(() => {
    const data0 = [
      "chickenSeedFineFeedDosage",
      "chickenDevelopFineFeedDosage",
      "chickenMatureFineFeedDosage",
      "chickenLayingHensFineFeedDosage",
      "chickenLaterBorrowingFineFeedDosage",
      "chickenCockFineFeedDosage",
    ];
    return {
      0: data0.map((ele, idx) => {
        console.log(language[activeLocale || "zh"][`feedtab${0}name${idx}`]);
        return {
          name: language[activeLocale || "zh"][`feedtab${0}name${idx}`],
          unit: activeLocale === "zh" ? "次" : "",
          key: ele,
          val: "",
        };
      }),
      1: list,
      2: data0.map((ele, idx) => ({
        name: language[activeLocale || "zh"]?.[`feedtab${2}name${idx}`],
        unit: activeLocale === "zh" ? "次" : "",
        key: ele,
        val: "",
      })),
    };
  }, [activeLocale, list]);
  console.log(listObj, "listObj");

  const [active, setActive] = useState<number>(0);

  const [msg, setMsg] = useState(listObj);

  const getMsg = useCallback(async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchGet(
      "/immunization/query_page",
      {}
    );
    if (res?.code === "0") {
      console.log(res, "data");
    }
    // setMsg((pre) => {
    //   pre[0].val = dayjs().format("DD/MM/YYYY");
    //   pre[0].disable = true;
    //   return pre
    // });
  }, []);

  useEffect(() => {
    getMsg();
  }, [getMsg]);

  console.log(msg, "msg1");

  const handleSubmit = async (obj: Record<string, any>) => {
    console.log(obj, "res", active);
    let params: Record<string, any> = {};
    obj.forEach((ele) => {
      params[ele.key] = ele.val;
    });
    params.time = params.time || dayjs().format("YYYY-MM-DD");

    let res = await fetchPost(UrlObj[active], params, {
      "Content-Type": "application/json",
    });
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show("success");
    } else {
      Toast.show("Network error");
    }
  };

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
        <InputList list={msg?.[active]} onSubmit={handleSubmit} unit />
      </div>
    </div>
  );
});

export default News;
