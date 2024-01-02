import React from 'react'
import Image from 'next/image'
import { Form, Input, Button } from 'antd-mobile'

const Login = () => {
    return (
        <div className="w-full h-full">
            <div className="relative bg-[url('/background.png')] bg-cover h-[56.5%]">
                <div className="flex items-center absolute top-[67px] right-[12px]">
                    <img
                        className="mr-[25px] w-[20px] h-[19px]"
                        src="/language.png"
                        alt="language"
                    />
                    <img className="w-[18.5px] h-[14.5px]" src="/menu.png" alt="menu" />
                </div>
            </div>
            <div className="p-[27px] pt-[27.5px]">
                <div className="mb-[54.5px] text-light-color text-[26px] font-light">
                    您好！歡迎登錄
                </div>
                <div className="text-center">
                    <Button
                        color="primary"
                        fill="solid"
                        className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button">
                        登入
                    </Button>
                    <Button
                        color="primary"
                        fill="outline"
                        className="w-[321px] !h-[46px] primary-outline-button">
                        註冊
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
