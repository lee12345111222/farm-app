import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
  Toast,
  SpinLoading,
  DropdownRef,
  Popover,
  Checkbox,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { selectUser, useSelector } from "@/lib/redux";
import PieChart from "@/components/pieChart";
import { fetchGet, fetchPost } from "@/utils/request";
import { QuestionChart } from "@/components/questionChat";
import { ObituaryChart } from "@/components/obituaryChart";
import { ElsePieChart } from "@/components/elsePieChart";
import { ElseLineChart } from "@/components/elseLineChart";
import { CheckboxValue } from "antd-mobile/es/components/checkbox";
import { useFetchSelectList } from "@/hooks/useFetchSelectList";
const TypeList = ["泰安雞 TO", "嘉美雞 KM", "雪鳳凰 SP", "雪鳳凰 SP", "胡鬚雞 HS", "麻黄 MW", "沙欄 SL",
                  "海南 HL", "永明 WM", "科朗 KL", "黄太 WT", "清遠 QY", "蘆花 LH", "竹絲 SK", "其他 Other",];
const HomeList = ["開放式 Opened", "封閉式 Closed"];

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const query = useSelector(selectUser);

  const [msg, setMsg] = useState<Record<string, any>>({});
  const [initMsg, setInitMsg] = useState<Record<string, any>>({});
  const [load, setLoad] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [selectObj, setSelectObj] = useState({
    TypeList,
    HomeList,
  })
  const ref: React.Ref<DropdownRef> = useRef();

  const [queryList] = useFetchSelectList()

  const getDom = (
    //todo 改成组件
    title?: any,
    key?: string,
    val?: any[],
    onChange?: (
      key: string,
      val: string | CheckboxValue[],
      idx?: React.Key
    ) => void,
    valIndex?: boolean,
    checkBox?: boolean
  ) => {
    return (
      <Dropdown
        className="rounded-md text-[#708090] top maxDropDown"
        ref={ref}
        closeOnClickAway
        style={
          {
            "--adm-font-size-main": "12px",
          } as any
        }
      >
        <Dropdown.Item
          className="h-5"
          key="sorter"
          title={checkBox ? title?.join("、") : title || "-"}
        >
          <div style={{ padding: 12 }}>
            {checkBox ? (
              <Checkbox.Group
                value={title}
                onChange={(val) => {
                  // setValue(val as string[]);
                  console.log(val, "Checkbox");
                  onChange?.(key, val);
                  // val?.forEach((ele: string, idx: number) => {
                  //   console.log(key + (idx + 1), ele, title);
                  //   onChange?.(key + (idx + 1), ele);
                  // });
                }}
              >
                <Space direction="vertical" block>
                  {val?.map((ele, idx) => (
                    <Checkbox block value={ele}>
                      {ele}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            ) : (
              <Radio.Group
                value={valIndex ? val[title] : title} //下标的值特殊处理
                onChange={(val: string) => {
                  onChange?.(key, val);
                  // ref.current?.close();
                  // console.log(ref.current);
                }}
              >
                <Space direction="vertical" block>
                  {val?.map((ele, idx) => (
                    <Radio block value={valIndex ? idx : ele}>
                      {ele}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            )}
          </div>
        </Dropdown.Item>
      </Dropdown>
    );
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ononline" in window &&
      "onoffline" in window
    ) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener("online", () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener("offline", () => {
          setIsOnline(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined &&
      isOnline
    ) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }
  }, [isOnline, router.route]);

  const getFarmMsg = useCallback(async (params?: Record<string, any>) => {
    setLoad(true);
    let res: Record<string, any> = await fetchGet("/farm/query", {});
    if (res?.code === "0") {
      let data = res.data || {};
      data.chickenSeedlingsType = data.chickenSeedlingsType.filter(
        (ele) => ele
      );
      setMsg(data);
      setInitMsg(data);
    }
    setLoad(false);
  }, []);

  useEffect(() => {
    getFarmMsg();
  }, [getFarmMsg]);

  useEffect(() => {
    getBatch();
  }, []);
  useEffect(() => {
    getSelectList()
  },[activeLocale])

  const getSelectList = async() => {
    let Type = await queryList({dictType: 'TypeList'})
    let Home  = await queryList({dictType: 'HomeList'})
    setSelectObj(pre => {
      return {
        TypeList: Type?.length? Type : pre.TypeList,
        HomeList: Home?.length? Home : pre.TypeList
      }
    })
  }
  

  const getBatch = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchGet("/farm/query_batch", {
      ...params,
    });
    if (res?.code === "0") {
      setBatchList(res.data);
    } else {
      setBatchList([]);
    }
  };

  const saveFarmMsg = useCallback(async () => {
    let res = await fetchPost(
      "/farm/add",
      { ...msg },
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
  }, [msg]);

  const list = [
    {
      name: language[activeLocale || "zh"]?.chickenbatchname,
      click: () => router.push("/chickenBatch"),
    },
    {
      name: language[activeLocale || "zh"]?.immunityname,
      click: () => router.push("/immunity"),
    },
    {
      name: language[activeLocale || "zh"]?.cleanname,
      click: () => router.push("/clean"),
    },
    {
      name: language[activeLocale || "zh"]?.feedname,
      click: () => router.push("/feed"),
    },
  ];

  const handleChangeVal = (key: string, val: string) => {
    setMsg((pre) => ({
      ...pre,
      [key]: val,
    }));
  };

  console.log(msg.batchIdx, "msg", batchList);
  return (
    <div className="w-full h-screen bg-[#F6F9FF] farm pb-6 overflow-auto relative">
      <div className="bg-[url('/news/farmbg.png')] bg-cover h-80 ">
        <Header
          back
          title={language[activeLocale || "zh"]?.myfarm}
          styles="top-8"
        />
        <div className="overflow-hidden">
          <div className="mt-16 w-[92%] bg-white pl-6 pt-4 pr-5 rounded-md relative">
            <Space className="absolute right-3 top-4">
              <Button
                size="mini"
                type="button"
                color="primary"
                fill="solid"
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
            {load ? (
              <div className="flex items-center justify-center">
                <SpinLoading />
              </div>
            ) : (
              <>
                <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-lg mb-4">
                  {language[activeLocale || "zh"]?.farmhello.replace(
                    "Ronald",
                    query.username
                  )}
                </div>
                <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm mb-4 flex">
                  <span className="flex-shrink-0">
                    {language[activeLocale || "zh"]?.farmquota}
                  </span>
                  {/* <span className="font-bold underline ml-2">100</span> */}
                  <Input
                    className="font-medium underline ml-2 w-1 -mt-1"
                    defaultValue="XXX"
                    onChange={(val) => handleChangeVal("breedingQuota", val)}
                    value={msg.breedingQuota}
                    style={{
                      "--color": "#708090",
                      fontSize: 14,
                    }}
                  />
                </div>
                <div className="flex items-center mb-3 flex-1">
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                    {language[activeLocale || "zh"]?.chickentype}
                  </div>
                  <div className="tablePage flex-1">
                    {getDom(
                      msg["chickenSeedlingsType"],
                      "chickenSeedlingsType",
                      selectObj.TypeList,
                      handleChangeVal,
                      false,
                      true
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-4 flex-1 justify-between ">
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                    {language[activeLocale || "zh"]?.cooptype}
                  </div>
                  <div className="tablePage flex-1">
                    {getDom(
                      msg["breedingMethods"],
                      "breedingMethods",
                      selectObj.HomeList,
                      handleChangeVal
                    )}
                  </div>
                </div>
                <div className="flex items-center flex-1 flex-wrap">
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm flex-shrink-0 flex">
                    <Popover
                      content={msg.chickenSeedlingsNumber1}
                      trigger="click"
                      placement="top"
                    >
                      <span className="flex-shrink-0">
                        {language[activeLocale || "zh"]?.small}:
                      </span>
                    </Popover>
                    <Input
                      className="font-medium underline ml-2 -mt-1"
                      defaultValue="xxx"
                      value={msg.chickenSeedlingsNumber1}
                      onChange={(val) =>
                        handleChangeVal("chickenSeedlingsNumber1", val)
                      }
                      style={{
                        "--color": "#708090",
                        fontSize: 14,
                      }}
                    />{" "}
                    {language[activeLocale || "zh"]?.nums}
                  </div>
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm  flex-shrink-0 flex my-2">
                    <Popover
                      content={msg.chickenSeedlingsNumber2}
                      trigger="click"
                      placement="top"
                    >
                      <span className="flex-shrink-0">
                        {language[activeLocale || "zh"]?.medium}:
                      </span>
                    </Popover>
                    <Input
                      className="font-medium underline ml-2  -mt-1"
                      defaultValue="xxx"
                      value={msg.chickenSeedlingsNumber2}
                      onChange={(val) =>
                        handleChangeVal("chickenSeedlingsNumber2", val)
                      }
                      style={{
                        "--color": "#708090",
                        fontSize: 14,
                      }}
                    />{" "}
                    {language[activeLocale || "zh"]?.nums}
                  </div>
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm  flex-shrink-0 flex">
                    <Popover
                      content={msg.chickenSeedlingsNumber3}
                      trigger="click"
                      placement="top"
                    >
                      <span className="flex-shrink-0">
                        {language[activeLocale || "zh"]?.big}:
                      </span>
                    </Popover>
                    <Input
                      className="font-medium underline ml-2  -mt-1"
                      defaultValue="xxx"
                      value={msg.chickenSeedlingsNumber3}
                      onChange={(val) =>
                        handleChangeVal("chickenSeedlingsNumber3", val)
                      }
                      style={{
                        "--color": "#708090",
                        fontSize: 14,
                      }}
                    />{" "}
                    {language[activeLocale || "zh"]?.nums}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 rounded-md bg-white mx-3">
        <div className="flex-1 h-20">
          <QuestionChart />
        </div>
        <div className="flex-1 h-20">
          <ElsePieChart />
        </div>
      </div>
      <div className="mx-3 mt-4 px-5 py-4 rounded-md bg-white">
        <div className="tablePage farm-content">
          {getDom(
            `${batchList[msg.batchIdx || 0]?.batchName}`,
            "batchIdx",
            batchList.map((ele) => ele.batchName),
            (key, val) => handleChangeVal(key, val),
            true
          )}
        </div>
        <div className="flex mt-4 items-center justify-between">
          <div className="flex-1 h-20">
            <ObituaryChart chickenId={batchList[msg.batchIdx || 0]?.id} />
          </div>

          <Divider direction="vertical" className="!h-12" />
          <div className="flex-1 h-20">
            <ElseLineChart chickenId={batchList[msg.batchIdx || 0]?.id} />
          </div>
        </div>
      </div>
      <div className="mx-3 mt-3 px-5 rounded-md bg-white overflow-hidden">
        {list.map((ele) => (
          <div
            key={ele.name}
            className="flex py-5 justify-between items-center border-b border-[#F0F0F0]"
          >
            <div className="font-[PingFang SC, PingFang SC] font-normal text-[#708090] text-base">
              {ele.name}
            </div>
            <div className="flex items-center" onClick={ele.click}>
              <div className="font-[PingFang SC, PingFang SC] font-normal text-[#4682B4] text-xs mr-2.5">
                view more
              </div>
              <img src="/news/arrowright.png" className="w-2.5 h-1" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
