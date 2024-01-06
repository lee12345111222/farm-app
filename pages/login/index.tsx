import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button } from "antd-mobile";
import { useRouter } from 'next/router'
import { language } from "@/utils/language";

const Login = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  console.log(language , activeLocale)

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
          footer={
            <div className="w-full">
              <div className="mt-[25px] mb-[50px] pr-[27px] flex justify-end text-[#708090] text-[15px]">
              {language[activeLocale || 'zh']?.forggetpassword}
              </div>
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  color="primary"
                  fill="solid"
                  onClick={() => router.push("/home")}
                  className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
                >
                  {language[activeLocale|| 'en']?.login}
                </Button>
              </div>
            </div>
          }
        >
          <Form.Item
            name="name"
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/nickname.png"
                alt="nickname"
              />
            }
          >
            <Input placeholder={language[activeLocale|| 'en']?.username} />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/password.png"
                alt="password"
              />
            }
          >
            <Input placeholder={language[activeLocale|| 'en']?.password} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
