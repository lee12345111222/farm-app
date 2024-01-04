import Header from '@/components/header'
import { Input } from 'antd-mobile'
import React from 'react'

const Chat = () => {
    return (
        <div className="w-full h-full bg-[#F5F5F5] relative">
            <Header logo />
            <div className="pt-[134px]">
                <div className="flex pl-[20px]">
                    <img className="w-[50px] h-[50px] mr-[8px] " src="/user_photo.png" alt="" />
                    <div className="bg-[#79E1BE] w-[221px] p-[10px]">
                        这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字
                    </div>
                </div>
            </div>
            <div className=" w-full flex items-center fixed bottom-0 left-0 h-[101px] bg-white pt-[14px] pl-[15px] pb-[45px] pr-[10px]">
                <Input className="border border-transparent	 w-[272px] h-[40px] !bg-[#F5F5F5] rounded-lg"></Input>
                <img className="ml-[10px] w-[27px] h-[27px]" src="/menu.png" alt="menu" />
                <img className="ml-[10px] w-[27px] h-[27px]" src="/menu.png" alt="menu" />
            </div>
        </div>
    )
}

export default Chat
