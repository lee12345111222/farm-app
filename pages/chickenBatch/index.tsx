import React, {
  memo,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";
import { ActionSheet, Dialog, InfiniteScroll, Input, Toast } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";
import { fetchGet, fetchPost } from "@/utils/request";

const actions: Action[] = [
  { text: "复制", key: "copy" },
  { text: "修改", key: "edit" },
  { text: "保存", key: "save" },
];

const News = memo(() => {
  
  const router = useRouter();
  const { locale: activeLocale } = router;

  const list = [
    {
      left: language[activeLocale || "zh"]?.active,
      right: [
        { name: "雞群A", unit: "2020-11-11" },
        { name: "雞群A", unit: "2020-11-11" },
        { name: "雞群A", unit: "2020-11-11" },
      ],
    },
    {
      left: language[activeLocale || "zh"]?.closed,
      right: [
        { name: "雞群A", unit: "2020-11-11" },
        { name: "雞群A", unit: "2020-11-11" },
        { name: "雞群A", unit: "2020-11-11" },
      ],
    },
  ];

  const [visible, setVisible] = useState(false);
  const [captcha, setCaptcha] = useState<string>();
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState<Record<string, any>[]>(list);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [page2, setPage2] = useState(1);
  const [data2, setData2] = useState<Record<string, any>[]>([]);
  const [hasMore2, setHasMore2] = useState(true);
  const ref = useRef<any>();

  const getMsg = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchPost(
      `/chicken/query_page?page=${params?.page || page2}&size=10`,
      {
        // page,
        // size: 10,
        status: 1,
        ...params,
      },
      {
        "Content-Type": "application/json",
      }
    );
    // if (res?.code === "0") {
    //   console.log(res, "data");
    //   let val = [...msg]
    //   val[0].right =

    // }
    if (res?.code === "0") {
      const list = res.data?.[0] || {};
      console.log(params, "params", list, res);

      if (params) {
        setData(list.list || []);
        setHasMore(list.page?.totalNumber > (list.list || [])?.length);
        setPage(1);
      } else {
        setData(data.concat(list.list || []));
        setHasMore(
          list.page?.totalNumber > data.concat(list.list || [])?.length
        );
        setPage(page + 1);
      }
    } else {
      setHasMore(false);
    }
  };
  const getMsg2 = async (params?: Record<string, any>) => {
    let res: Record<string, any> = await fetchPost(
      `/chicken/query_page?page=${params?.page || page2}&size=10`,
      {
        // page: page2,
        // size: 10,
        status: 0,
        ...params,
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      const list = res.data?.[0] || {};
      console.log(params, "params", list, res);

      if (params) {
        setData2(list.list || []);
        setHasMore2(list.page?.totalNumber > (list.list || [])?.length);
        setPage2(1);
      } else {
        setData2(data.concat(list.list || []));
        setHasMore2(
          list.page?.totalNumber > data.concat(list.list || [])?.length
        );
        setPage2(page + 1);
      }
    } else {
      setHasMore(false);
    }
  };

  // useEffect(() => {
  //   getMsg();
  // }, [getMsg]);

  const handleSubmit = async (batchName: string) => {
    let res = await fetchPost(
      "/chicken/add",
      { batchName },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "res");
      getMsg({ page: 1 });
      Toast.show("success");
    } else {
      Toast.show("Network error");
    }
  };

  const modalInputClick = () => {
    Dialog.confirm({
      title: "加入雞群",
      content: (
        <div className="px-3">
          <Input
            onChange={(v) => {
              ref.current = v;
            }}
            placeholder="input"
          />
        </div>
      ),
      onConfirm: async () => {
        handleSubmit(ref.current);
        // Toast.show({
        //   content: "提交成功",
        // });
      },
    });
  };
  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative">
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.chickenbatch}
          styles="top-10"
        />
      </div>
      <div
        className="flex justify-center items-center mx-3 px-5 h-14 bg-[#4682B4] rounded mt-3"
        onClick={modalInputClick}
      >
        <img src="/news/add-white.png" className="w-4 h-4" alt="" />
        <div className="font-[PingFang SC, PingFang SC] font-medium text-sm text-white ml-2">
          {language[activeLocale || "zh"]?.addchicken}
        </div>
      </div>
      <div className="mx-3 mt-3 bg-white overflow-hidden rounded-lg">
        {list.map((ele, idx) => (
          <div key={ele.left} className="mb-3">
            <div
              className="flex justify-between items-center h-11 bg-[#4682B4] px-5"
              onClick={() => {
                // setVisible(true);
                // setCaptcha("test");
              }}
            >
              <div className="font-[PingFang SC, PingFang SC] font-medium text-sm text-white">
                {ele.left}
              </div>
              {/* <img src="/news/down-white.png" className="w-3 h-2" alt="" /> */}
              <div></div>
            </div>
            <div className="max-h-40 overflow-auto">
              {(idx === 0 ? data : data2).map((elem, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    console.log(123);
                    router.push("/animals");
                    localStorage.setItem("animal", JSON.stringify(elem));
                  }}
                  className="flex px-5 py-5 justify-between items-center border-b border-[#D7E8FE]"
                >
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                    {elem.batchName}
                  </div>
                  <div className="font-[PingFang SC, PingFang SC] font-medium text-[#4682B4] text-xs">
                    {elem.incubationDate || "-"}
                  </div>
                </div>
              ))}
              <InfiniteScroll
                threshold={1}
                loadMore={() => (idx === 0 ? getMsg() : getMsg2())}
                hasMore={idx === 0 ? hasMore : hasMore2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
