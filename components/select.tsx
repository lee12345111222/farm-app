import React, { useRef } from "react";
import { Dropdown, DropdownRef, Radio, Space } from "antd-mobile";

interface Iporps {
  title?: string;
  idx?: React.Key;
  val?: any[];
  topStyle?:string;
  onChange?: (key: React.Key, val: string, idx?: React.Key) => void;
  valIndex?: boolean;
}

export default (props: Iporps) => {
  const { title, idx, val, valIndex, onChange, topStyle } = props;
  const ref = useRef<DropdownRef>(null);

  return (
    <>
      <Dropdown
        className={`rounded-md text-[#708090] ${topStyle}`}
        ref={ref}
        getContainer={() => {
          let dom = document.querySelector(`.select${idx}`);
          console.log(idx, 'idx', document.querySelector(`.select1`), dom)
          return document.querySelector(`.select${idx}`)
          // return dom
          //   ? idx > 1
          //     ? document.querySelector(`.select1`)
          //     : dom
          //   : null;
        }}
        closeOnClickAway
        style={
          {
            "--adm-font-size-main": "12px",
          } as any
        }
      >
        <Dropdown.Item key="sorter" title={title || "-"}>
          <div style={{ padding: 12 }}>
            <Radio.Group
              value={valIndex ? val[title] : title} //下标的值特殊处理
              onChange={(val: string) => {
                console.log(idx,val, '132')
                onChange?.(idx, val);
                ref.current?.close();
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
          </div>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};
