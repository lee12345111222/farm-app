import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownRef, Radio, Space } from "antd-mobile";
import { useFetchSelectList } from "@/hooks/useFetchSelectList";
import { useRouter } from "next/router";

interface Iporps {
  title?: string;
  idx?: React.Key;
  selectKey?:string;
  val?: any[];
  topStyle?:string;
  onChange?: (key: React.Key, val: string, idx?: React.Key) => void;
  valIndex?: boolean;
}

export default (props: Iporps) => {
  const { title, idx, val, valIndex, onChange, topStyle, selectKey } = props;
  const router = useRouter();
  const { locale: activeLocale } = router;
  const ref = useRef<DropdownRef>(null);

  const [dropDownAsyncData, setDropDownAsyncData] = useState([]);

  const [queryList] = useFetchSelectList()

  useEffect(() => {
    if(selectKey){
      getSelectList(selectKey)
    }
  
  },[selectKey, activeLocale])
  
  const getSelectList = async(key) => {
    let Type = await queryList({dictType: key})
    setDropDownAsyncData(Type)
  }

  return (
    <>
      <Dropdown
        className={`rounded-md text-[#708090] ${topStyle}`}
        ref={ref}
        getContainer={() => {
          let dom = document.querySelector(`.select${idx}`);
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
          <div style={{ padding: '12px 12px 0' }} className="max-h-[50vh] overflow-scroll">
            <Radio.Group
              value={valIndex ? val[title] : title} //下標的值特殊處理
              onChange={(val: string) => {
                console.log(idx,val, '132')
                onChange?.(idx, val);
                ref.current?.close();
                // console.log(ref.current);
              }}
            >
              <Space direction="vertical" block>
                {(dropDownAsyncData?.length ? dropDownAsyncData : val)?.map((ele, idx) => (
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
