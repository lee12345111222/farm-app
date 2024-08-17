import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  CalendarPicker,
  CalendarPickerRef,
  Dropdown,
  Form,
  Input,
  List,
  Radio,
  Space,
} from "antd-mobile";
import { language } from "@/utils/language";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface Iprops {
  title?: string;
  dateList?: string[];
  onChange?: (v: string) => void;
}
const min = new Date("2023-01-01");
export default (props: Iprops) => {
  const { title, onChange, dateList } = props;
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [val, setVal] = useState<Date | null>();
  const [visible3, setVisible3] = useState(false);
  const [inputDate, setInputDate] = useState("");

  const [minDate, setMinDate] = useState(null);

  const ref = useRef<CalendarPickerRef>(null);
  useEffect(() => {
    if (visible3) {
      setTimeout(() => {
        ref.current?.jumpToToday();
      }, 100);
    }
  }, [visible3]);

  return (
    <>
      <div
        className="flex bg-[#F3F3F7] justify-between px-4 pt-2 pb-1 items-center  rounded-md"
        onClick={() => setVisible3(true)}
      >
        <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm">
          {title || language[activeLocale || "zh"]?.dateinput}
        </div>
        <img src="/news/selectdown.png" className="w-2 h-1" alt="" />
      </div>
      <CalendarPicker
        ref={ref}
        visible={visible3}
        selectionMode="single"
        value={val}
        onClose={() => setVisible3(false)}
        onMaskClick={() => setVisible3(false)}
        min={min}
        onChange={(val) => {
          console.log(val);
          setVal(val);
        }}
        onConfirm={() => {
          onChange?.(dayjs(val).format("YYYY-MM-DD"));
        }}
        renderDate={(date) => {
          const formatDate = dayjs(date).format("YYYY-MM-DD");
          return (
            <Badge content={dateList?.includes(formatDate) ? Badge.dot : null}>
              <div id={dayjs(date).format("YYYY-MM-DD")}>{date.getDate()}</div>
            </Badge>
          );
        }}
      />
      {/* <Dropdown
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
            <Form layout="horizontal">
              <Form.Item
                label=""
                extra={
                  <div>
                    <a onClick={() => onChange(inputDate)}>OK</a>
                  </div>
                }
              >
                <Input value={inputDate} onChange={setInputDate} placeholder={language[activeLocale || "zh"]?.dateinput} clearable />
              </Form.Item>
            </Form>
            <Radio.Group
              defaultValue="default"
              value={title}
              onChange={(val: string) => onChange?.(val)}
            >
              <Space direction="vertical" block>
                {!dateList.includes(dayjs().format("YYYY-MM-DD")) ? (
                  <Radio block value={""} key={dayjs().format("YYYY-MM-DD")}>
                    {dayjs().format("YYYY-MM-DD")}
                  </Radio>
                ) : null}
                {dateList.map((ele) => (
                  <Radio block value={ele} key={ele}>
                    {ele}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </Dropdown.Item>
      </Dropdown> */}
    </>
  );
};
