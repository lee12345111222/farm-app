import React, { memo } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, Dropdown, Radio, Space } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";

const list = [
  { name: "免疫程序" },
  { name: "清潔程序" },
  { name: "農場饲料配方" },
  { name: "雞隻批次资料" },
];

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const getDom = (title?: string) => (
    <Dropdown
      className="rounded-md text-[#708090]"
      style={{
        "--adm-font-size-main": "12px",
      }}
    >
      <Dropdown.Item key="sorter" title={title || "泰安雞"}>
        <div style={{ padding: 12 }}>
          <Radio.Group defaultValue="default">
            <Space direction="vertical" block>
              <Radio block value="default">
                综合排序
              </Radio>
              <Radio block value="nearest">
                距离最近
              </Radio>
              <Radio block value="top-rated">
                评分最高
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
    </Dropdown>
  );

  return (
    <div className="w-full h-screen bg-[#F6F9FF] farm pb-6 overflow-auto">
      <div className="bg-[url('/news/farmbg.png')] bg-cover h-[51%]">
        <Header
          back
          title={language[activeLocale || "zh"]?.myfarm}
          styles="top-12"
        />
        <div className="overflow-hidden">
          <div className="mt-24 h-52 w-[84%] bg-white rounded-lg pl-6 pt-4 pr-5">
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-lg mb-4">
              Ronald的農場！
            </div>
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm mb-4">
              注冊養殖額度:
              <span className="font-bold underline ml-2">100</span>
            </div>
            <div className="flex items-center mb-3 ">
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                雞隻種類：
              </div>
              <div className="justify-between flex flex-1">
                {new Array(3).fill(1).map((ele, idx) => getDom())}
              </div>
            </div>
            <div className="flex items-center mb-4 flex-1 justify-between ">
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                雞舍種類：
              </div>
              <div className="tablePage flex-1">{getDom()}</div>
            </div>
            <div className="flex items-center flex-1 justify-between">
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                雞苗: <span className="font-bold underline">x</span> 隻
              </div>
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                中雞:: <span className="font-bold underline">x</span> 隻
              </div>
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
                大雞: <span className="font-bold underline">x</span> 隻
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 -mt-5 px-5 py-4 rounded-md bg-white">
        <div className="tablePage farm-content">{getDom("批次A")}</div>
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
            <div className="flex items-center">
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
