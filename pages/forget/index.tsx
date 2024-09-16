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
  const [load, setLoad] = useState(false);

  const [form] = Form.useForm()
  
  const onFinish = async (vals: Record<string, string>) => {
    setLoad(true)
    if(vals.password !== vals.repassword){
      return Toast.show('The password and reset password must be the same')
    }
    let res = await fetchPost("/user/reset_password", vals, {
      "Content-Type": "application/json",
    });
    if(res.code === '0'){
      Toast.show('success')
      router.push('/login')
    }else{
      Toast.show(res.data)
    }
    setLoad(false)
    // let res1 = await fetchPost("api/users/activation/", {});
    // // router.push("/home");
  };

  const handleSend = async() => {
    const {
      username,
    } = form.getFieldsValue();
    let vals = {
      username,
    }
    let res = await fetchPost("/user/get_code_reset", vals, {
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
          className="h-[61px]"
          alt=""
          onClick={() => router.push("/")}
        />
      </div>
      <div className="">
        <Form
          form={form}
          layout="horizontal"
          className="mt-[35px]"
          onFinish={onFinish}
          footer={
            <div className="mt-[50px] w-full flex justify-center">
              <Button
                type="submit"
                color="primary"
                loading={load}
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
            name="username"
            extra={send? <a aria-disabled>已發送</a> : <a onClick={handleSend}>發送驗證碼</a>}
            label={
              <img className="w-[17px] h-[17px]" src="/nickname.png" alt="nickname" />
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
      </div>
    </div>
  );
};

export default Register;
