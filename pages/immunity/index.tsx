import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";
import InputList from "@/components/inputList";
import CalendarDown from "@/components/calendarDown";
import { fetchGet, fetchPost } from "@/utils/request";
import dayjs from "dayjs";
import { Toast } from "antd-mobile";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const list: Record<string, any>[] = useMemo(
    () => [
      {
        name: language[activeLocale || "zh"]?.immunizationdate,
        key: "periodValidity",
      },
      {
        name: language[activeLocale || "zh"]?.vaccinename,
        key: "vaccineName",
        type: "select",
        data: ["活苗", "死苗"],
      },
      {
        name: language[activeLocale || "zh"]?.vaccinestrains,
        key: "vaccineType",
        type: "select",
        data: ["-", "CS2"],
      },
      {
        name: language[activeLocale || "zh"]?.vaccinestype,
        key: "vaccineBatch",
        type: "select",
        data: [
          "新城+支氣管炎 ND + IB",
          "H5 + H7 流感",
          "新城拉蘇打 ND LaSota",
          "馬立克液氮 MD CVI988",
          "馬立克凍干 MD HVT",
          "甘保羅凍干 Gumboro",
          "馬立克載甘保羅 rHVT-IBD",
          "馬立克載甘保羅 rHVT-ND-IBD",
          "甘保羅抗原抗體 Gumboro AG-AB",
          "ILT 喉頭",
          "新城克隆1系 ND Clone 1",
          "新城+H9 流感",
          "流感 H9",
          "肺病毒 APV",
          "其他:請註明",
        ],
      },
      { name: language[activeLocale || "zh"]?.vaccinesage, key: "vaccineDate" },
      {
        name: language[activeLocale || "zh"]?.vaccinationsnums,
        key: "vaccineFrequency",
        type: "select",
        data: ["第一針", "第二針", "第三針", "第四針"],
      },
      {
        name: language[activeLocale || "zh"]?.administered,
        key: "vaccineDosage",
        type: "select",
        data: ["瓶", "毫升"],
      },
      {
        name: language[activeLocale || "zh"]?.vaccinesroute,
        key: "vaccineRoute",
        type: "select",
        data: ["滴鼻", "口服", "皮下注射", "肌肉注射"],
      },
      {
        name: language[activeLocale || "zh"]?.manufacturers,
        key: "vaccineManufacturers",
        type: "select",
        data: [
          "菲綽 Fatro",
          "哈獸研 HRB",
          "乾元浩 QYH",
          "英特威 MSD",
          "梅裡亞 Merial",
          "詩華 Ceva",
          "碩騰 Zoetis",
          "青島易邦 Yibio",
          "大華農 DHN",
        ],
      },
      {
        name: language[activeLocale || "zh"]?.vaccinewhere,
        key: "vaccineAddress",
        type: "select",
        data: ["中國", "英國", "美國", "德國"],
      },
    ],
    []
  );

  const [msg, setMsg] = useState(list);
  const [dateList, setDateList] = useState([]);
  const [activeTime, setActiveTime] = useState("");

  const getDateList = useCallback(async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchGet(
      "/immunization/query_date",
      {}
    );
    if (res?.code === "0") {
      setDateList(res.data || []);
    }
  }, []);

  const getMsg = useCallback(async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchPost(
      "/immunization/query_page?page=1&size=1",
      params,
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      let obj = res.data?.[0]?.list?.[0] || {};
      console.log(res, "data", obj);
      setMsg((pre) => {
        pre = pre.map((ele) => {
          ele.val = obj[ele.key];
          return ele;
        });
        console.log(pre);
        return pre;
      });
    }
  }, []);

  useEffect(() => {
    getMsg({ dataTime: dayjs().format("YYYY-MM-DD") });
    getDateList();
  }, [getMsg, getDateList]);

  console.log(msg, "msg1");

  const handleSubmit = async (obj: Record<string, any>) => {
    console.log(obj, "res");
    let params: Record<string, any> = {};
    obj.forEach((ele) => {
      params[ele.key] = ele.val;
    });
    params.dataTime = params.dataTime || dayjs().format("YYYY-MM-DD");

    let res = await fetchPost("/immunization/add", params, {
      "Content-Type": "application/json",
    });
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show("success");
      getDateList();
    } else {
      Toast.show("Network error");
    }
  };

  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative immunity">
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.immunity}
          styles="top-10"
        />
      </div>
      <div className="mx-3  mt-2">
        <CalendarDown
          dateList={dateList}
          title={activeTime}
          onChange={(v) => {
            console.log(v);
            setActiveTime(v);
            getMsg({ page: 1, dataTime: v });
          }}
        />
      </div>
      <div className="mx-3 px-5 bg-white overflow-hidden rounded-lg">
        <InputList onSubmit={handleSubmit} list={msg} />
      </div>
    </div>
  );
});

export default News;
