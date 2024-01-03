import React from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { Form, Input, Button, Radio } from 'antd-mobile'
import { useRouter } from 'next/navigation'

const Register = () => {
    const router = useRouter()

    return (
        <div className="w-full h-full relative pt-[116px]">
            <Header />
            <div className="flex justify-center">
                <img
                    src="/logo.png"
                    className="w-[61px] h-[61px]"
                    alt=""
                    onClick={() => router.push('/')}
                />
            </div>
            <div className="">
                <Form
                    layout="horizontal"
                    className="mt-[35px]"
                    footer={
                        <div className="mt-[50px] w-full flex justify-center">
                            <Button
                                type="submit"
                                color="primary"
                                fill="solid"
                                className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button">
                                登記
                            </Button>
                        </div>
                    }>
                    <Form.Item
                        name="name"
                        label={
                            <img className="w-[17px] h-[17px]" src="/nickname.png" alt="nickname" />
                        }>
                        <Input placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={
                            <img className="w-[17px] h-[17px]" src="/password.png" alt="password" />
                        }>
                        <Input placeholder="密碼" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<img className="w-[17px] h-[17px]" src="/phone.png" alt="phone" />}>
                        <Input placeholder="電話" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<img className="w-[17px] h-[17px]" src="/email.png" alt="email" />}>
                        <Input placeholder="电邮" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={
                            <img
                                className="w-[17px] h-[17px]"
                                src="/signincode.png"
                                alt="signincode"
                            />
                        }>
                        <Input placeholder="註冊碼" />
                    </Form.Item>
                </Form>
                <div className="mt-[50px] w-full flex justify-center">
                    <Radio
                        style={{
                            '--icon-size': '18px',
                            '--font-size': '14px',
                            '--gap': '6px',
                        }}
                    />
                    <div className="text-[#666666] text-[16px] ml-[9px]">我同意以上條款</div>
                </div>
            </div>
        </div>
    )
}

export default Register
