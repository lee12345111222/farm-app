import React, { useState } from "react";
import { CalendarPicker, List } from "antd-mobile";


export default () => {
  const [val, setVal] = useState<Date | null>();
  const [visible3, setVisible3] = useState(false);

  return (
    <>
      <div className="flex bg-[#F3F3F7] justify-between px-4 pt-2 pb-1 items-center  rounded-md" onClick={() => setVisible3(true)}>
        <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
          輸入日期
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
      />
    </>
  );
};