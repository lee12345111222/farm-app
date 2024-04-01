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
    () => {
      console.log(activeLocale, 'activeLocale')
      return [
      {
        name: language[activeLocale || "zh"]?.immunizationdate,
        key: "periodValidity",
      },
      {
        name: language[activeLocale || "zh"]?.vaccinename,
        key: "vaccineName",
        type: "select",
        data: [
          language[activeLocale || "zh"]?.vaccine_name1, language[activeLocale || "zh"]?.vaccine_name2,
          language[activeLocale || "zh"]?.vaccine_name3, language[activeLocale || "zh"]?.vaccine_name4,
          language[activeLocale || "zh"]?.vaccine_name5, language[activeLocale || "zh"]?.vaccine_name6,
          language[activeLocale || "zh"]?.vaccine_name7, language[activeLocale || "zh"]?.vaccine_name8,
          language[activeLocale || "zh"]?.vaccine_name9, language[activeLocale || "zh"]?.vaccine_name10,
          language[activeLocale || "zh"]?.vaccine_name11, language[activeLocale || "zh"]?.vaccine_name12,
          language[activeLocale || "zh"]?.vaccine_name13, language[activeLocale || "zh"]?.vaccine_name14,
          language[activeLocale || "zh"]?.vaccine_name15, language[activeLocale || "zh"]?.vaccine_name16,
          language[activeLocale || "zh"]?.vaccine_name17, language[activeLocale || "zh"]?.vaccine_name18,
          language[activeLocale || "zh"]?.other,
        ],
        topStyle: 'top'
      },
      {
        name: language[activeLocale || "zh"]?.vaccinestrains,
        key: "vaccineType",
        type: "select",
        data: [
          "NDIB LaSota+QXL87",	"NDIB LaSota+QXL87",	"NDIB LaSota+H120",	"NDIB Clone30+Ma5",	
          "H5H7 Re13,Re14+Re4",	"ND CS2(I系)",	"ND LaSota",	"ND Clone30",	"ND Avinew",	"MD CVI988",	
          "HVT",	"IBD NF8",	"IBD MB",	"IBD I65",	"IBD 2512",	"IBD D78",	"IBD 228E",	"IBD B87",	
          "rHVT-IBD",	"rHVT-ND-IBD",	"rHVT-ND-ILT",	"rHVT-ND-IBD-ILT",	"rHVT-ILT",	"IBD W2512 G61",	
          "NDH9 LaSota+WD",	"NDH9 LaSota+F",	"ND H9 LaSota+SS",	"CEO",	"TCO",	"IB 4/91",	"IB QX",	
          "IB H120",	"IB Ma5",	"WD",	"F",	"SS",	"Re",	"MG F",	"MG 6/85",	"MG TS11",	"MS H",	"MS MS1",	
          "MG-S6",	"RhinoCV",	"LM41D7817332408",	"P4",
        ],
        topStyle: 'top'
      },
      {
        name: language[activeLocale || "zh"]?.vaccinestype,
        key: "vaccineBatch",
        type: "select",
        data: [
          language[activeLocale || "zh"]?.vaccine_type1, language[activeLocale || "zh"]?.vaccine_type2,
          language[activeLocale || "zh"]?.vaccine_type3, language[activeLocale || "zh"]?.vaccine_type4,
          language[activeLocale || "zh"]?.vaccine_type5, language[activeLocale || "zh"]?.vaccine_type6,
          language[activeLocale || "zh"]?.vaccine_type7,
        ],
        topStyle: 'top'
      },
      { name: language[activeLocale || "zh"]?.vaccinesage, 
        key: "vaccineDate"
      },
      {
        name: language[activeLocale || "zh"]?.vaccinationsnums,
        key: "vaccineFrequency",
      },
      {
        name: language[activeLocale || "zh"]?.administered,
        key: "vaccineDosage",
        type: "select",
        data: [
          language[activeLocale || "zh"]?.dosage1, language[activeLocale || "zh"]?.dosage2,
          language[activeLocale || "zh"]?.dosage3, language[activeLocale || "zh"]?.dosage4,
        ],
      },
      {
        name: language[activeLocale || "zh"]?.vaccinesroute,
        key: "vaccineRoute",
        type: "select",
        data: [
          language[activeLocale || "zh"]?.route1, language[activeLocale || "zh"]?.route2,
          language[activeLocale || "zh"]?.route3, language[activeLocale || "zh"]?.route4,
          language[activeLocale || "zh"]?.route5, language[activeLocale || "zh"]?.route6,
          language[activeLocale || "zh"]?.route7, language[activeLocale || "zh"]?.route8,
        ],
        topStyle: 'top'
      },
      {
        name: language[activeLocale || "zh"]?.manufacturers,
        key: "vaccineManufacturers",
        type: "select",
        data: [
          language[activeLocale || "zh"]?.manufacturer1, language[activeLocale || "zh"]?.manufacturer2,
          language[activeLocale || "zh"]?.manufacturer3, language[activeLocale || "zh"]?.manufacturer4,
          language[activeLocale || "zh"]?.manufacturer5, language[activeLocale || "zh"]?.manufacturer6,
          language[activeLocale || "zh"]?.manufacturer7, language[activeLocale || "zh"]?.manufacturer8,
          language[activeLocale || "zh"]?.manufacturer9, language[activeLocale || "zh"]?.manufacturer10,
        ],
        topStyle: 'top'
      },
      {
        name: language[activeLocale || "zh"]?.vaccinewhere,
        key: "vaccineAddress",
        type: "select",
        data: [
          language[activeLocale || "zh"]?.chn, language[activeLocale || "zh"]?.gbr,
          language[activeLocale || "zh"]?.chn, language[activeLocale || "zh"]?.gbr,
          language[activeLocale || "zh"]?.usa, language[activeLocale || "zh"]?.ger,
          language[activeLocale || "zh"]?.fra, language[activeLocale || "zh"]?.nld,
          language[activeLocale || "zh"]?.ita, language[activeLocale || "zh"]?.other
        ],
        topStyle: 'top'
      },
    ]},
    [activeLocale]
  );

  const [msg, setMsg] = useState(list);
  const [dateList, setDateList] = useState([]);
  const [activeTime, setActiveTime] = useState("");

  useEffect(() => {
    console.log(msg, 'list', list)
    setMsg((pre) => {
      pre.map((ele,idx) => {
        ele.name = list[idx].name
      })
      return pre
    })
  },[activeLocale])

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
