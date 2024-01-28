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

  const handleUpload = () => {
    upload("/resources/add", (name: string, filetype: string) => {
      form.setFieldValue("resources_id", name);
      setUrl(name);
    });
  };

  return (
    <div className="w-full h-full relative pt-[116px] addshop">
      <Header />
      <div className="flex justify-center">
        <img
          src="/logo.png"
          className="w-[61px] h-[61px]"
          alt=""
          onClick={() => router.push("/")}
        />
      </div>
      <div className="">
        <Form
          layout="horizontal"
          form={form}
          className="mt-[35px]"
          onFinish={onFinish}
          style={{
            "---border-top": "none",
          }}
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
          <Form.Item
            rules={[{ required: true, message: "The name cannot be empty" }]}
            name="name"
            // label={language[activeLocale || "zh"]?.shopname}
          >
            <Input placeholder={language[activeLocale || "zh"]?.shopname} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "The price cannot be empty" }]}
            name="price"
            // label={language[activeLocale || "zh"]?.shopprice}
          >
            <Input placeholder={language[activeLocale || "zh"]?.shopprice} />
          </Form.Item>
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
          <Form.Item
            rules={[{ required: true, message: "The image cannot be empty" }]}
            style={{
              "--align-items": "center",
              justifyContent: "space-between",
            }}
            name="resources_id"
            childElementPosition="right"
            label={language[activeLocale || "zh"]?.shopresources_id}
          >
            <div
              className="w-40 h-40 border rounded-md flex justify-center items-center"
              onClick={handleUpload}
            >
              {url ? (
                <img
                  src={baseUrl + "/resources/downloadFile/" + url}
                  className="w-[100] h-[100%]"
                />
              ) : (
                <AddOutline fontSize={80} />
              )}
            </div>
          </Form.Item>
          <Form.Item name="weight" label="数量" childElementPosition="right">
            <Stepper
              min={1}
              style={{
                "--border": "1px solid #DBDBDB",
                "--border-inner": "1px solid #DBDBDB",
                // '--button-width': '35px',
                "--button-text-color": "#000",
                "--input-font-color": "#000",
                "--border-radius": "6px",
              }}
            />
          </Form.Item>
          <Form.Item
            className="resources_id"
            rules={[{ required: true, message: "The remarks cannot be empty" }]}
            name="remarks"
            // label={language[activeLocale || "zh"]?.shopremarks}
          >
            <Input placeholder={language[activeLocale || "zh"]?.shopremarks} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
