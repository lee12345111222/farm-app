import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
  Toast,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import PieChart from "@/components/pieChart";
import CalendarPicker from "@/components/calendarPicker";
import CalendarDown from "@/components/calendarDown";
import InputList from "@/components/inputList";
import { fetchGet, fetchPost } from "@/utils/request";
import dayjs from "dayjs";
import { QuestionChart } from "@/components/questionChat";
import { ElsePieChart } from "@/components/elsePieChart";
import { ObituaryChart } from "@/components/obituaryChart";
import { ElseLineChart } from "@/components/elseLineChart";

const UrlObj = {
  0: "/obituary/add",
  1: "/medication/add",
};
const TimeUrlObj = {
  0: "/obituary/query_date",
  1: "/medication/query_date",
};
const MsgUrlObj = {
  0: "/obituary/query_page?page=1&size=10",
  1: "/medication/query_page?page=1&size=10",
};
const StateKey = {
  0: "obituaryList",
  1: "medicationList",
}
const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const tab = [
    { name: language[activeLocale || "zh"]?.mortality },
    { name: language[activeLocale || "zh"]?.medicationrecords },
  ];

  const [active, setActive] = useState(0);

  const listObj: Record<number, any> = useMemo(() => {
    const data0 = [
      "chickenSeedlingNumber",
      "chickenSeedlingAge",
      "deathNumber",
      "eliminateNumber",
      // "chickenFlockId",
      "incubationDate",
    ];
    const data1 = [
      { key: "chickenName" , hiden: true},
      { key: "medicationName",
        type: "select",
        topStyle: 'top' ,
        data: [
          language[activeLocale || "zh"]?.medicine_name1,
          language[activeLocale || "zh"]?.medicine_name2,
          language[activeLocale || "zh"]?.medicine_name3,
          language[activeLocale || "zh"]?.medicine_name4,
          language[activeLocale || "zh"]?.medicine_name5,
          language[activeLocale || "zh"]?.medicine_name6,
          language[activeLocale || "zh"]?.medicine_name7,
          language[activeLocale || "zh"]?.medicine_name8,
          language[activeLocale || "zh"]?.medicine_name9,
          language[activeLocale || "zh"]?.medicine_name10,
          language[activeLocale || "zh"]?.medicine_name11,
          language[activeLocale || "zh"]?.medicine_name12,
          language[activeLocale || "zh"]?.other,
        ],
      },
      { key: "medicationDose" },
      { key: "medicationMeasure" },
      { key: "usageDuration" },
    ];
    return {
      0: [
        ...data0.map((ele, idx) => {
          console.log(
            language[activeLocale || "zh"][`animalstab${0}name${idx}`]
          );
          return {
            name: language[activeLocale || "zh"][`animalstab${0}name${idx}`],
            unit:
              idx === 1
                ? language[activeLocale || "zh"].animalstab1name4unit
                : language[activeLocale || "zh"].nums,
            key: ele,
            val: "",
            hide: idx === 0 || idx ===1 || idx === 4,
          };
        }),
        { name: "", key: "dataTime", hide: true },
      ],
      1: [
        ...data1.map((ele, idx) => {
          return {
            name: language[activeLocale || "zh"]?.[`animalstab${1}name${idx}`],
            unit:
              language[activeLocale || "zh"]?.[
                `animalstab${1}name${idx}unit`
              ] || "",
            key: ele.key,
            type: ele?.type,
            data: ele?.data,
            val: "",
            hide: ele?.hiden,
          };
        }),
        { name: "", key: "dataTime", hide: true },
      ],
    };
  }, [activeLocale]);

  console.log(listObj, "listObj");

  const [dateList, setDateList] = useState([]);
  const [listmsg, setListMsg] = useState(listObj);
  const [activeTime, setActiveTime] = useState("");

  const [saveLoad, setSaveLoad] = useState(false);

  useEffect(() => {
    setListMsg((pre) => {
      pre[active].map((ele,idx) => {
        ele.name = listObj[active][idx].name
        ele.unit = listObj[active][idx].unit
      })
      return pre
    })
  },[activeLocale,active])

  const getDateList = useCallback(
    async (params?: Record<string, any>) => {
      let res: Record<string, any> = await fetchPost(
        TimeUrlObj[active],
        {},
        {
          "Content-Type": "application/json",
        }
      );
      if (res?.code === "0") {
        setDateList(res.data || []);
      }
    },
    [active]
  );

  const getMsg = useCallback(
    async (params?: Record<string, any>) => {
      let obj = JSON.parse(localStorage.getItem("animal") || "{}");
      let res: Record<string, any> = await fetchPost(
        MsgUrlObj[active],
        { ...params, chickenId: obj.id },
        {
          "Content-Type": "application/json",
        }
      );
      if (res?.code === "0") {
        let obj = res.data?.[0]?.list?.[0]?.[StateKey[active]]?.[0] || {};
        console.log(res, "data", obj);
        setListMsg((pre) => {
          pre[active] = pre?.[active]?.map((ele) => {
            ele.val = obj[ele.key];
            return ele;
          });
          console.log(pre, "pre", pre[active]);
          return { ...pre };
        });
      }
    },
    [active]
  );

  useEffect(() => {
    getMsg({ dataTime: dayjs().format("YYYY-MM-DD") });
    getDateList();
  }, [getMsg, getDateList]);

  const handleSubmit = async (obj: Record<string, any>) => {
    console.log(obj, "res");
    let params: Record<string, any> = {};
    obj.forEach((ele) => {
      params[ele.key] = ele.val;
    });
    params.dataTime = activeTime || dayjs().format("YYYY-MM-DD");
    params.chickenId = msg.id;
    // params.chickenFlockId = msg.id;

    let res = await fetchPost(UrlObj[active], params, {
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

  const [msg, setMsg] = useState<Record<string, any>>({});
  const [initMsg, setInitMsg] = useState<Record<string, any>>({});

  const getFarmMsg = useCallback(async (params?: Record<string, any>) => {
    //获取农场信息，之前漏了接口，应该通过id查询todo
    let res = JSON.parse(localStorage.getItem("animal") || "{}");
    for (let item in res) {
      console.log(item);
      res[item] = res[item] || "";
    }
    setMsg(res);
    setInitMsg(res);
  }, []);

  useEffect(() => {
    getFarmMsg();
  }, [getFarmMsg]);

  const saveFarmMsg = useCallback(async () => {
    setSaveLoad(true)
    let res = await fetchPost(
      "/chicken/update",
      { ...msg },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show("success");
      fetchBatch();
    } else {
      Toast.show("Network error");
    }
    setSaveLoad(false)
  }, [msg]);

  const fetchBatch = async () => {
    let res: Record<string, any> = await fetchGet(
      "/chicken/query/" + msg.id,
      {}
    );
    if (res?.code === "0") {
      console.log(res, "res");
      let obj = res.data || {};
      localStorage.setItem("animal", JSON.stringify(obj));
      // for (let item in obj) {
      //   console.log(item);
      //   obj[item] = obj[item] || "";
      // }
      // setMsg(obj);
      // setInitMsg(obj);
    } else {
      Toast.show("Network error");
    }
  };

  const handleChangeVal = (key: string, val: string) => {
    setMsg((pre) => ({
      ...pre,
      [key]: val,
    }));
  };

  const getDom = (title?: string) => (
    <CalendarPicker
      onConfirm={(val) => handleChangeVal("incubationDate", val)}
      styles="!text-sm !font-normal"
      containerStyles="!px-3 !py-1"
      title={title}
    />
  );

  const handleClose = () => {
    if(msg.status === '已关闭'){
      Dialog.confirm({
        title: "確認嗎 若確認 批次將從已關閉移至活躍中",
        onConfirm: async () => {
          let res = await fetchGet("/chicken/open/" + msg.id, {});
          if (res?.code === "0") {
            console.log(res, "res");
            Toast.show("success");
            setMsg((pre) => ({
              ...pre,
              status: '活动中',
            }))
          } else {
            Toast.show("Network error");
          }
        },
        confirmText: 'Ok',
        cancelText: 'Cancel',
      });
      return
    }
    Dialog.confirm({
      title: "確認嗎 若確認 批次將從活躍中移至已關閉",
      onConfirm: async () => {
        let res = await fetchGet("/chicken/close/" + msg.id, {});
        if (res?.code === "0") {
          console.log(res, "res");
          Toast.show("success");
          setMsg((pre) => ({
            ...pre,
            status: '已关闭',
          }))
        } else {
          Toast.show("Network error");
        }
      },
      confirmText: 'Ok',
      cancelText: 'Cancel',
    });
  };

  console.log(msg, "msg");
  return (
    <div className="w-full h-screen bg-[#F6F9FF] pb-6 overflow-auto relative">
      <div className="bg-[url('/home_slices/bg.png')] bg-cover h-64">
        <Header home back title={msg.batchName} />
      </div>
      <div className="overflow-hidden px-3 -mt-36 flex justify-center">
        <div className="pb-5 w-[100%] bg-white pl-6 pt-12 pr-5  rounded-2xl relative">
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
              {language[activeLocale || "zh"]?.[msg.status === '已关闭'? 'open':'close']}
            </Button>
            <Button
              size="mini"
              type="button"
              color="primary"
              fill="solid"
              loading={saveLoad}
              style={{
                "--background-color": "#4682B4",
              }}
              onClick={saveFarmMsg}
            >
              
              {language[activeLocale || "zh"]?.save}
            </Button>
            <Button
              size="mini"
              type="reset"
              fill="solid"
              onClick={() => setMsg(initMsg)}
            >
               {language[activeLocale || "zh"]?.reset}
            </Button>
          </Space>
          <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm mb-6 flex">
            <span className="flex-shrink-0">
              {language[activeLocale || "zh"]?.batchname}：
            </span>
            <Input
              className="font-medium underline -mt-1"
              defaultValue="xxx"
              onChange={(val) => handleChangeVal("batchName", val)}
              value={msg.batchName}
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
              onChange={(val) => handleChangeVal("breedingQuota", val)}
              value={msg.id}
              disabled
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
            <div className="w-30 ml-2">{getDom(msg.incubationDate)}</div>
          </div>
          <div className="flex items-center mb-6">
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm flex-shrink-0">
              {language[activeLocale || "zh"]?.chickentotal}:
            </div>
            <Input
              className="font-medium underline -mt-1 !w-20 ml-2"
              defaultValue="2045"
              onChange={(val) => handleChangeVal("chickenSeedlingNumber", val)}
              value={msg.chickenSeedlingNumber}
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
              onChange={(val) => handleChangeVal("vaccineManufacturers", val)}
              value={msg.vaccineManufacturers}
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
          {/* <div className="w-[47%] bg-white h-32 mt-3  rounded-2xl py-3">
            <QuestionChart />
          </div>
          <div className="w-[47%] bg-white h-32 mt-3  rounded-2xl py-3">
            <ElsePieChart />
          </div> */}
          <div className="w-[47%] bg-white h-32 mt-3  rounded-2xl py-3">
            <ObituaryChart chickenId={msg?.id} />
          </div>
          <div className="w-[47%] bg-white h-32 mt-3  rounded-2xl py-3">
            <ElseLineChart chickenId={msg?.id} />
          </div>
        </div>
      </div>
      <div className="mx-3 mt-3 pt-3 pb-4 px-3  bg-white  rounded-2xl">
        <div className="h-12 bg-[#B0C4DE] flex justify-between px-1 items-center rounded-lg">
          {tab.map((ele, idx) => (
            <div
              key={ele.name}
              onClick={() => {
                setActive(idx);
                setActiveTime("");
              }}
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
      <div className="mx-3 mt-2 px-5 bg-white overflow-hidden rounded-lg">
        <InputList list={listmsg?.[active]} onSubmit={handleSubmit} unit />
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
