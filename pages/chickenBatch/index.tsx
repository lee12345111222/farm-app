import React, { memo, use, useRef, useState } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";
import { ActionSheet, Dialog, Input, Toast } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";

const list = [
  {
    left: "活躍中",
    right: [
      { name: "雞群A", unit: "2020-11-11" },
      { name: "雞群A", unit: "2020-11-11" },
      { name: "雞群A", unit: "2020-11-11" },
    ],
  },
  {
    left: "已關閉",
    right: [
      { name: "雞群A", unit: "2020-11-11" },
      { name: "雞群A", unit: "2020-11-11" },
      { name: "雞群A", unit: "2020-11-11" },
    ],
  },
];
const actions: Action[] = [
  { text: "复制", key: "copy" },
  { text: "修改", key: "edit" },
  { text: "保存", key: "save" },
];

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [visible, setVisible] = useState(false);
  const [captcha, setCaptcha] = useState<string>();
  const ref= useRef<any>();

  const modalInputClick = () => {
    Dialog.confirm({
      title: "加入雞群",
      content: (
        <div className="px-3">
          <Input
            onChange={(v) => {
              ref.current = v
            }}
            placeholder="input"
          />
        </div>
      ),
      onConfirm: async () => {
        console.log(captcha, ref.current);
        Toast.show({
          content: "提交成功",
        });
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
          加入雞群
        </div>
      </div>
      <div className="mx-3 mt-3 bg-white overflow-hidden rounded-lg">
        {list.map((ele) => (
          <div key={ele.left} className="mb-3">
            <div
              className="flex justify-between items-center h-11 bg-[#4682B4] px-5"
              onClick={() => {
                setVisible(true);
                setCaptcha("test");
              }}
            >
              <div className="font-[PingFang SC, PingFang SC] font-medium text-sm text-white">
                {ele.left}
              </div>
              <img src="/news/down-white.png" className="w-3 h-2" alt="" />
            </div>
            {ele.right.map((elem,idx) => (
              <div
                key={idx}
                onClick={() => {console.log(123);router.push('/animals')}}
                className="flex px-5 py-5 justify-between items-center border-b border-[#D7E8FE]"
              >
                <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                  {elem.name}
                </div>
                <div className="font-[PingFang SC, PingFang SC] font-medium text-[#4682B4] text-xs">
                  {elem.unit}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
