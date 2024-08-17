import React, { useState } from "react";
import { CalendarPicker, List } from "antd-mobile";
import { language } from "@/utils/language";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface Iporps {
  containerStyles?: string;
  styles?: string;
  title?: string;
  onConfirm?: (date: string) => void
}
const min = new Date()
min.setDate(5)
min.setMonth(min.getMonth() - 12)

export default (props: Iporps) => {
  const { containerStyles, styles, title,onConfirm } = props;
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [val, setVal] = useState('');
  const [visible3, setVisible3] = useState(false);

  return (
    <>
      <div className={`flex bg-[#F3F3F7] justify-between px-4 pt-2 pb-1 items-center  rounded-md ${containerStyles}`} onClick={() => setVisible3(true)}>
        <div className={`font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm ${styles}`}>
          
          {val || title || language[activeLocale || "zh"]?.dateinput}
        </div>
        <img src="/news/selectdown.png" className="w-2 h-1" alt="" />
      </div>
      <CalendarPicker
        visible={visible3}
        min={min}
        defaultValue={new Date()}
        selectionMode="single"
        // value={val}
        onClose={() => setVisible3(false)}
        onMaskClick={() => setVisible3(false)}
        onChange={(val) => {
          console.log(val)
          // setVal(val);
        }}
        onConfirm={date => {console.log(date);setVal(dayjs(date).format('YYYY-MM-DD'));onConfirm?.(dayjs(date).format('YYYY-MM-DD'))}}
      />
    </>
  );
};
