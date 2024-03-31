import React, { useState } from "react";
import { Button, Input, Space } from "antd-mobile";
import { useEffect } from "react";
import Select from "./select";
import { useRouter } from "next/router";
import { language } from "@/utils/language";

interface Iprops {
  list: Record<string, any>[];
  unit?: boolean;
  onChange?: (v: Record<string, any>) => void;
  onSubmit?: (v: Record<string, any>) => void;
}

const InputList = ({ list = [], unit = false, onChange, onSubmit }: Iprops) => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [msg, setMsg] = useState<Record<string, any>[]>([]);
  const [initMsg, setInitMsg] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (list?.length) {
      console.log("list", list);
      list.forEach((ele) => {
        if (!ele.val) {
          ele.val = "";
        }
      });
      setMsg([...list]);
      setInitMsg([...list]);
    }
  }, [list, activeLocale]);

  const handleChange = (key, val) => {
    console.log(key, val, "val", msg);
    let res = JSON.parse(JSON.stringify(msg));
    res[key].val = val;
    setMsg(res);
  };

  const handleSubmit = () => {
    onSubmit?.(msg);
  };
  console.log(msg, "msg", list, initMsg);
  return (
    <>
      {msg.map(
        (ele: Record<string, any>, idx: React.Key | null | undefined) =>
          !ele.hide && (
            <div
              key={idx}
              className="flex pt-6 pb-4 justify-between items-center border-b border-[#D7E8FE]"
            >
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm flex-shrink-0 w-48 mr-1">
                {ele.name}
              </div>
              {ele.type === "select" ? (
                <div className={`text-right select${idx} ${ele.topStyle}`}>
                  <Select
                    title={ele.val}
                    topStyle={ele.topStyle}
                    idx={idx}
                    val={ele.data || []}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <Input
                  placeholder="xx"
                  onChange={(val) => handleChange(idx, val)}
                  value={ele.val}
                  disabled={ele.disable}
                  style={{
                    "--text-align": "right",
                    "--color": "#708090",
                  }}
                />
              )}

              {ele.unit ? (
                <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm ml-1 flex-shrink-0">
                  {ele.unit}
                </div>
              ) : null}
            </div>
          )
      )}
      <Space className="mt-3 w-[100%] justify-center">
        <Button
          onClick={handleSubmit}
          type="button"
          color="primary"
          fill="solid"
          style={{
            "--background-color": "#4682B4",
          }}
        >
           {language[activeLocale || "zh"]?.save}
        </Button>
        <Button
          type="reset"
          fill="solid"
          onClick={() => {
            let res = [...initMsg];
            setMsg(res);
          }}
        >
           {language[activeLocale || "zh"]?.reset}
        </Button>
      </Space>
    </>
  );
};

export default InputList;
