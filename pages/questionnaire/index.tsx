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
import { selectUser, useSelector } from "@/lib/redux";

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

  const query = useSelector(selectUser);

  const [load, setLoad] = useState(false);

  const [url, setUrl] = useState("");

  const [form] = Form.useForm();

  const onFinish = async (vals: Record<string, string>) => {
    setLoad(true)
    let res = 0;
    for (let key in vals) {
      if (key.includes("questionA")) {
        //sectionA 5分
        if (vals[key] === "yes") {
          res += 5;
        }
      } else if (key.includes("questionB")) {
        if (vals[key] === "yes") {
          res += 4;
        }
      } else if (key.includes("questionC")) {
        if (vals[key] === "yes") {
          res += 3;
        }
      } else if (key.includes("questionD")) {
        if (vals[key] === "yes") {
          res += 2;
        }
      } else if (key.includes("questionE")) {
        if (vals[key] === "yes") {
          res += 1;
        }
      }
    }
    let result: Record<string, string> = await fetchPost("/score/add", {
      totalScore: res,
      farmId: query.id
    }, {
      "Content-Type": "application/json",
    });
    console.log(res, "res");
    if (result?.code === "0") {
      Toast.show("success");
      router.back();
    }else{
      Toast.show(result?.data||"network error");
    }
    setLoad(false)
  };

  return (
    <div className="w-full h-screen bg-white relative pt-[116px] px-4 overflow-auto">
      <Header home={false} back title={language[activeLocale || "zh"]?.questionnaire} styles='!fixed bg-white !top-0 pt-16 z-[999]' />
      <div className="">
        <Form
          layout="vertical"
          form={form}
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
                loading={load}
                fill="solid"
                className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
              >
                {language[activeLocale || "zh"]?.submit}
              </Button>
            </div>
          }
        >
          {Arr.map((ele, idx) => {
            return (
              <>
                <Form.Header>
                  {language[activeLocale || "zh"][`question${ele.label}`]}
                </Form.Header>
                {new Array(ele.len).fill(1).map((elem, idx) => {
                  console.log(
                    language[activeLocale || "zh"][
                      `question${ele.label}${idx}`
                    ],
                    `question${ele.label}${idx}`,
                    elem
                  );
                  return (
                    <Form.Item
                      key={idx}
                      name={`question${ele.label}${idx}`}
                      label={
                        language[activeLocale || "zh"][
                          `question${ele.label}${idx}`
                        ]
                      }
                      rules={[{ required: true, message: "cannot be empty" }]}
                      childElementPosition="right"
                      style={{
                        "--align-items": "center",
                      }}
                    >
                      <Radio.Group>
                        <Space>
                          <Radio value="yes">yes</Radio>
                          <Radio value="no">no</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  );
                })}
              </>
            );
          })}
        </Form>
      </div>
    </div>
  );
};

export default Register;
