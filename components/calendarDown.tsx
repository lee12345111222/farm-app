import React, { useState } from "react";
import { CalendarPicker, Dropdown, List, Radio, Space } from "antd-mobile";
import { language } from "@/utils/language";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface Iprops {
  title?: string;
  dateList?: string[];
  onChange?: (v: string) => void;
}

export default (props: Iprops) => {
  const { title, onChange, dateList } = props;
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [val, setVal] = useState<Date | null>();
  const [visible3, setVisible3] = useState(false);

  return (
    <>
      {/* <div className="flex bg-[#F3F3F7] justify-between px-4 pt-2 pb-1 items-center  rounded-md" onClick={() => setVisible3(true)}>
        <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
          
          {language[activeLocale || "zh"]?.dateinput}
        </div>
        <img src="/news/selectdown.png" className="w-2 h-1" alt="" />
      </div>
      <CalendarPicker
        visible={visible3}
        selectionMode="single"
        value={val}
        onClose={() => setVisible3(false)}
        onMaskClick={() => setVisible3(false)}
        onChange={(val) => {
          setVal(val);
        }}
      /> */}
      <Dropdown
        className="rounded-md text-[#708090] tablePage"
        style={
          {
            "--adm-font-size-main": "14px",
            "--adm-color-background": "#F3F3F7",
          } as any
        }
      >
        <Dropdown.Item
          key="sorter"
          title={title || language[activeLocale || "zh"]?.dateinput}
        >
          <div style={{ padding: 12 }}>
            <Radio.Group
              defaultValue="default"
              value={title}
              onChange={(val: string) => onChange?.(val)}
            >
              <Space direction="vertical" block>
                {/* <Radio
                  block
                  value={''}
                  key={dayjs().format("YYYY-MM-DD")}
                >
                  {dayjs().format("YYYY-MM-DD")}
                </Radio> */}
                {dateList.map((ele) => (
                  <Radio block value={ele} key={ele}>
                    {ele}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};
