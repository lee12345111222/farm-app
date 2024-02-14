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
      { name: language[activeLocale || "zh"]?.clearingdate, key: 'periodValidity' },
    { name: language[activeLocale || "zh"]?.cleantype, key: 'detergent' },
    { name: language[activeLocale || "zh"]?.rodenticidestype, key: 'dentifrices' },
    { name: language[activeLocale || "zh"]?.endoparasitic, key: 'parasitesInternal' },
    { name: language[activeLocale || "zh"]?.exoparasitic, key: 'parasitesExternal'  },
    { name: language[activeLocale || "zh"]?.insecticide, key: 'pesticide'  },
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
      "/clear/add",
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
          title={language[activeLocale || "zh"]?.clean}
          styles="top-10"
        />
      </div>
      <div className="mx-3  mt-2">
        <CalendarDown />
      </div>
      <div className="mx-3 px-5 bg-white overflow-hidden rounded-lg">
      <InputList  onSubmit={handleSubmit} list={msg}  />

        {/*  */}
      </div>
    </div>
  );
});

export default News;
