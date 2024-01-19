import React from "react";
import { Button, Input, Space } from "antd-mobile";

interface Iprops {
  list: Record<string, any>;
  unit?: boolean;
}

const InputList = ({ list = [], unit = false }: Iprops) => {
  return (
    <>
      {list.map(
        (ele: Record<string, string>, idx: React.Key | null | undefined) => (
          <div
            key={idx}
            className="flex pt-6 pb-4 justify-between items-center border-b border-[#D7E8FE]"
          >
            <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm flex-shrink-0 w-48 mr-1">
              {ele.name}
            </div>
            <Input
              placeholder="xx"
              style={{
                "--text-align": "right",
                "--color": "#708090",
              }}
            />
            {unit ? (
              <div className="font-[PingFang SC, PingFang SC] font-medium text-[#708090] text-sm ml-1 flex-shrink-0">
                {ele.unit}
              </div>
            ) : null}
          </div>
        )
      )}
      <Space className="mt-3 w-[100%] justify-center">
        <Button
          type="button"
          color="primary"
          fill="solid"
          style={{
            "--background-color": "#4682B4",
          }}
        >
          保存
        </Button>
        <Button type="reset" fill="solid">
          重設
        </Button>
      </Space>
    </>
  );
};

export default InputList;
