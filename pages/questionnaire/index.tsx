import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import {
  Form,
  Input,
  Button,
  Radio,
  Toast,
  Checkbox,
  Space,
  Stepper,
} from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import { AddOutline, CollectMoneyOutline } from "antd-mobile-icons";
import { baseUrl, fetchPost } from "@/utils/request";
import { upload } from "@/utils";

const Arr = [
  { label: "A", len: 7 },
  { label: "B", len: 6 },
  { label: "C", len: 9 },
  { label: "D", len: 5 },
  { label: "E", len: 4 },
];

const Register = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [url, setUrl] = useState("");

  const [form] = Form.useForm();

  const onFinish = async (vals: Record<string, string>) => {
    console.log(vals, "vals");
    let res = await fetchPost("/commodity/add", vals, {
      "Content-Type": "application/json",
    });
    console.log(res, "res");
    if (res?.code === "0") {
      Toast.show("success");
    }
  };

  return (
    <div className="w-full h-full relative pt-[116px] addshop px-4">
      <Header />
      <div className="">
        <Form
          layout="vertical"
          form={form}
          className="mt-[35px]"
          onFinish={onFinish}
          style={
            {
              "---border-top": "none",
            } as any
          }
          footer={
            <div className="mt-[50px] w-full flex justify-center">
              <Button
                type="submit"
                color="primary"
                fill="solid"
                className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
              >
                {language[activeLocale || "zh"]?.addshop}
              </Button>
            </div>
          }
        >
          {Arr.map((ele, idx) => {
            return (
              <Form.Item
                key={idx}
                name={ele.label}
                label={language[activeLocale || "zh"][`question${ele.label}`]}
                rules={[
                  { required: true, message: "The type cannot be empty" },
                ]}
                childElementPosition="right"
                style={{
                  "--align-items": "center",
                }}
              >
                {new Array(ele.len).fill(1).map((ele, idx) => (
                  <Radio.Group key={idx}>
                    <Radio value={`question${ele.label}${idx}`}>
                      {
                        language[activeLocale || "zh"]?.[
                          `question${ele.label}${idx}`
                        ]
                      }
                    </Radio>
                  </Radio.Group>
                ))}
              </Form.Item>
            );
          })}
          <Form.Item
            name="type"
            label={language[activeLocale || "zh"]?.shptype}
            rules={[{ required: true, message: "The type cannot be empty" }]}
            childElementPosition="right"
            style={{
              "--align-items": "center",
            }}
          >
            {/* //0:口服.1:疫苗 */}
            <Radio.Group>
              <Space>
                <Radio value="0">
                  {language[activeLocale || "zh"]?.takeorally}
                </Radio>
                <Radio value="1">
                  {language[activeLocale || "zh"]?.vaccine}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
