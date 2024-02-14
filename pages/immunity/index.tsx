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
      { name: language[activeLocale || "zh"]?.vaccinename, key: "vaccineName" },
      {
        name: language[activeLocale || "zh"]?.vaccinestrains,
        key: "vaccineType",
      },
      {
        name: language[activeLocale || "zh"]?.vaccinestype,
        key: "vaccineBatch",
      },
      { name: language[activeLocale || "zh"]?.vaccinesage, key: "vaccineDate" },
      {
        name: language[activeLocale || "zh"]?.vaccinationsnums,
        key: "vaccineFrequency",
      },
      {
        name: language[activeLocale || "zh"]?.administered,
        key: "vaccineDosage",
      },
      {
        name: language[activeLocale || "zh"]?.vaccinesroute,
        key: "vaccineRoute",
      },
      {
        name: language[activeLocale || "zh"]?.manufacturers,
        key: "vaccineManufacturers",
      },
      {
        name: language[activeLocale || "zh"]?.vaccinewhere,
        key: "vaccineAddress",
      },
    ],
    []
  );

  const [msg, setMsg] = useState(list);

  const getMsg = useCallback(async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchGet(
      "/immunization/query_page",
      {}
    );
    if (res?.code === "0") {
      console.log(res, "data");
   
    }
    setMsg((pre) => {
      pre[0].val = dayjs().format("DD/MM/YYYY");
      pre[0].disable = true;
      return pre
    });
  }, []);

  useEffect(() => {
    getMsg();
  }, [getMsg]);

  console.log(msg, 'msg1')

  const handleSubmit = async( obj: Record<string, any>) => {
    console.log(obj , 'res')
   let params = {}
   obj.forEach(ele => {
    params[ele.key] = ele.val
   })

    let res = await fetchPost(
      "/immunization/add",
      params,
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show("success");
    } else {
      Toast.show("Network error");
    }

  }

  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative">
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.immunity}
          styles="top-10"
        />
      </div>
      <div className="mx-3  mt-2">
        <CalendarDown />
      </div>
      <div className="mx-3 px-5 bg-white overflow-hidden rounded-lg">
        <InputList onSubmit={handleSubmit} list={msg} />
      </div>
    </div>
  );
});

export default News;
