import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button, Radio, Toast } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import { CollectMoneyOutline } from "antd-mobile-icons";
import { fetchPost } from "@/utils/request";
import { PasswordInput } from "@/components/passwordInput";

const Register = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [send, setSend] = useState(false);

  const [form] = Form.useForm()
  
  const onFinish = async (vals: Record<string, string>) => {
    console.log(vals, "vals");
    if(vals.password !== vals.repassword){
      return Toast.show('The password and reset password must be the same')
    }
    let res = await fetchPost("/user/add", vals, {
      "Content-Type": "application/json",
    });
    if(res.code === '0'){
      Toast.show('success')
      router.push('/login')
    }else{
      Toast.show(res.data)
    }
    console.log(res,'res')
    // let res1 = await fetchPost("api/users/activation/", {});
    // // router.push("/home");
  };

  const handleSend = async() => {
    const {
      username,
      email,
      phone
    } = form.getFieldsValue();
    let vals = {
      username,
      email,
      phone
    }
    let res = await fetchPost("/user/get_code_add", vals, {
      "Content-Type": "application/json",
    });
    if(res.code === '0'){
      Toast.show('send success')
      setSend(true)
    }else{
      Toast.show(res.data)
    }
  }

  return (
    <div className="w-full h-full relative pt-[116px] firstPage">
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
          form={form}
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
            rules={[
              { required: true, message: "The username cannot be empty" },
            ]}
            name="username"
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/nickname.png"
                alt="nickname"
              />
            }
          >
            <Input placeholder={language[activeLocale || "zh"]?.username} />
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
          <Form.Item
            rules={[
              { required: true, message: "The phone_number cannot be empty" },
            ]}
            name="phone"
            label={
              <img className="w-[17px] h-[17px]" src="/phone.png" alt="phone" />
            }
          >
            <Input placeholder={language[activeLocale || "zh"]?.telephone} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "The email cannot be empty" }]}
            name="email"
            extra={send? <a aria-disabled>已发送</a> : <a onClick={handleSend}>发送验证码</a>}
            label={
              <img className="w-[17px] h-[17px]" src="/email.png" alt="email" />
            }
          >
            <Input placeholder={language[activeLocale || "zh"]?.email}  />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "The farm_name cannot be empty" },
            ]}
            name="farmName"
            label={<CollectMoneyOutline className="w-[17px] h-[17px]" />}
          >
            <Input placeholder={language[activeLocale || "zh"]?.farmname} />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "The code cannot be empty" },
            ]}
            name="code"
            label={
              <img
                className="w-[17px] h-[17px]"
                src="/signincode.png"
                alt="signincode"
              />
            }
          >
            <Input
              placeholder={language[activeLocale || "zh"]?.registrationcode}
            />
          </Form.Item>
        </Form>
        <div className="mt-[50px] pb-[50px] w-full flex justify-center">
          <Radio
            style={{
              "--icon-size": "18px",
              "--font-size": "14px",
              "--gap": "6px",
            }}
          />
          <div className="text-[#666666] text-[16px] ml-[9px]">
            {language[activeLocale || "zh"]?.agreeterms}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
