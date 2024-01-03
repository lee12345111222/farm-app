import React, { useState } from 'react'
import { Popup } from 'antd-mobile'
interface IProps {
    visible: boolean
    open: () => void
    close: () => void
}

const SideMenuPopup = (props: IProps) => {
    const { visible, close } = props
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
            label: '联络我们',
            onClick: () => 1,
        },
    ]
    return (
        <Popup
            visible={visible}
            onMaskClick={() => {
                close()
            }}
            position="right"
            bodyStyle={{ width: '270px' }}>
            <div className="pt-[59px] pl-[43.5px]">
                {menus.map((menu) => {
                    return (
                        <div key={menu.label} className="flex items-center mb-[20px]">
                            <img className="w-[20px] h-[20px]" src={menu.img} alt="" />
                            <div className="text-[#708090] text-[20px] ml-[14px]">{menu.label}</div>
                        </div>
                    )
                })}
            </div>
        </Popup>
    )
}

export default SideMenuPopup
