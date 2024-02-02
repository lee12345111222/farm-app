import React, { useState } from "react";
import { CalendarPicker, Dropdown, List, Radio, Space } from "antd-mobile";
import { language } from "@/utils/language";
import { useRouter } from "next/router";


export default () => {
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
      style={{
        "--adm-font-size-main": "14px",
        '--adm-color-background': '#F3F3F7',
      } as any}
    >
      <Dropdown.Item key="sorter" title={language[activeLocale || "zh"]?.dateinput}>
        <div style={{ padding: 12 }}>
          <Radio.Group defaultValue="default">
            <Space direction="vertical" block>
              <Radio block value="default">
                2022
              </Radio>
              <Radio block value="nearest">
                2021
              </Radio>
              <Radio block value="top-rated">
                2020
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
    </Dropdown>
    </>
  );
};
