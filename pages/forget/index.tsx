import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, Radio } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import { CollectMoneyOutline } from "antd-mobile-icons";
import { fetchPost } from "@/utils/request";
import { PasswordInput } from "@/components/passwordInput";

const Register = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const onFinish = async (vals: Record<string, string>) => {
    console.log(vals, "vals");
    let res = await fetchPost("api/users/", vals);
    let res1 = await fetchPost("api/users/activation/", {});
    // router.push("/home");
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
            <div className="mt-[50px] w-full flex justify-center">
              <Button
                type="submit"
                color="primary"
                fill="solid"
                className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
              >
                {language[activeLocale || "zh"]?.registration}
              </Button>
            </div>
          }
        >
          <Form.Item
            rules={[{ required: true, message: "The email cannot be empty" }]}
            name="email"
            label={
              <img className="w-[17px] h-[17px]" src="/email.png" alt="email" />
            }
          >
            <Input placeholder={language[activeLocale || "zh"]?.email} />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: "The password cannot be empty" },
            ]}
            name="password"
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/password.png"
                alt="password"
              />
            }
          >
            {/* <Input placeholder={language[activeLocale || "zh"]?.password} /> */}
            <PasswordInput
              placeholder={language[activeLocale || "zh"]?.password}
            />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "The repassword cannot be empty" },
            ]}
            name="repassword"
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/password.png"
                alt="password"
              />
            }
          >
            {/* <Input placeholder={language[activeLocale || "zh"]?.repassword} /> */}
            <PasswordInput
              placeholder={language[activeLocale || "zh"]?.repassword}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
