import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { fetchPost } from "@/utils/request";

const Login = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [visible, setVisible] = useState(false);

  console.log(language, activeLocale);

  const onFinish = async (vals: Record<string, string>) => {
    console.log(vals, "vals");
    let res = await fetchPost("api/users/reset_password/", vals);
    let res1 = await fetchPost("api/users/reset_password_confirm/", {});
    router.push("/home");
  };

  return (
    <div className="w-full h-full relative pt-[116px]">
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
          className="mt-[35px]"
          onFinish={onFinish}
          footer={
            <div className="w-full">
              <div
                className="mt-[25px] mb-[50px] pr-[27px] flex justify-end text-[#708090] text-[15px]"
                onClick={() => router.push("/forget")}
              >
                {language[activeLocale || "zh"]?.forggetpassword}
              </div>
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  color="primary"
                  fill="solid"
                  className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
                >
                  {language[activeLocale || "en"]?.login}
                </Button>
              </div>
            </div>
          }
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "The name cannot be empty" }]}
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/nickname.png"
                alt="nickname"
              />
            }
          >
            <Input placeholder={language[activeLocale || "en"]?.username} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "The password cannot be empty" },
            ]}
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/password.png"
                alt="password"
              />
            }
          >
            <div className="flex justify-between items-center">
              <Input
                type={visible ? "text" : "password"}
                placeholder={language[activeLocale || "en"]?.password}
              />
              <div className="text-base">
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
