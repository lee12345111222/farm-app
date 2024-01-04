import React from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { Form, Input, Button } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import FooterToolBar from '@/components/footer-tool-bar'

const Home = () => {
    const router = useRouter()
    const menus = [
        {
            img: '/home_slices/mysquare.png',
            label: '我的農場',
            onClick: () => 1,
        },
        {
            img: '/home_slices/medicine.png',
            label: '購買藥物',
            onClick: () => 1,
        },
        {
            img: '/home_slices/news.png',
            label: '最新消息',
            onClick: () => 1,
        },
        {
            img: '/home_slices/table.png',
            label: '有用表格',
            onClick: () => 1,
        },
        {
            img: '/home_slices/connectus.png',
            label: '聯絡我們',
            onClick: () => router.push('/chat'),
        },
    ]
    return (
        <div className="w-full h-full relative bg-[#F6F9FF]">
            <div className="relative bg-[url('/home_slices/bg.png')] bg-cover h-[38%]">
                <Header home logo />
                <div className="absolute top-[118px] left-[30px] text-white text-[19px]">
                    晚安，Ronald的農場！
                </div>
            </div>
            <div className="home-cards-wrapper">
                {menus.map((menu) => {
                    return (
                        <div
                            key={menu.label}
                            className="flex justify-center items-center home-card"
                            onClick={menu.onClick}>
                            <img className="w-[20px] h-[20px]" src={menu.img} alt="" />
                            <div className="text-[#708090] text-[20px] ml-[14px]">{menu.label}</div>
                        </div>
                    )
                })}
            </div>
            <FooterToolBar />
        </div>
    )
}

export default Home
