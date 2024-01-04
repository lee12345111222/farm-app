import React from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { Form, Input, Button } from 'antd-mobile'
import { useRouter } from 'next/navigation'

const FooterToolBar = () => {
    const router = useRouter()
    const menus = [
        {
            img: '/home_slices/home.png',
            label: '主頁',
            onClick: () => 1,
        },
        {
            img: '/home_slices/message.png',
            label: '最新消息',
            onClick: () => 1,
        },
        {
            img: '/home_slices/connect.png',
            label: '聯絡我們',
            centerIcon: true,
            onClick: () => router.push('/chat'),
        },
        {
            img: '/home_slices/user-record.png',
            label: '用户紀錄',
            onClick: () => 1,
        },
        {
            img: '/home_slices/square.png',
            label: '農場資料',
            onClick: () => 1,
        },
    ]

    return (
        <div className="w-full h-[91px] pt-[18px] px-[26px] pb-[34px]  flex  fixed bottom-0 bg-white rounded-t-2xl">
            {menus.map((menu, index) => {
                const mr = `${index == 0 ? '2.4375rem' : '1.6875rem'}`
                const wd = `${index == 0 ? '1.5rem' : '3rem'}`
                return (
                    <div
                        key={menu.label}
                        className={`flex flex-col items-center ${
                            menu.centerIcon ? 'home-center-icon-wrapper' : ''
                        }`}
                        style={{ marginRight: mr, height: menu.centerIcon ? '5rem' : 'auto' }}
                        onClick={menu.onClick}>
                        <div className={`${menu.centerIcon ? 'home-center-icon' : ''}`}>
                            <img className="w-[20px] h-[20px]" src={menu.img} alt="" />
                        </div>

                        <div className="mt-[6px] text-[#708090] text-[12px]" style={{ width: wd }}>
                            {menu.label}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FooterToolBar
