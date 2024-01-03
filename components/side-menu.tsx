import React, { useState } from 'react'
import SideMenuPopup from './side-menu-popup'
const imgs = {
    language: {
        home: '/home_slices/language.png',
        default: '/language.png',
    },
    menu: {
        home: '/home_slices/menu.png',
        default: '/menu.png',
    },
}

const SideMenu = (props: { home?: boolean }) => {
    const [visible, setVisible] = useState(false)
    const isHome = props.home ? 'home' : 'default'
    return (
        <div className="flex items-center">
            <img
                className="mr-[25px] w-[20px] h-[19px]"
                src={imgs['language']?.[isHome]}
                alt="language"
            />
            <img
                className="w-[18.5px] h-[14.5px]"
                src={imgs['menu']?.[isHome]}
                alt="menu"
                onClick={() => setVisible(true)}
            />
            <SideMenuPopup
                visible={visible}
                close={() => setVisible(false)}
                open={() => setVisible(true)}
            />
        </div>
    )
}

export default SideMenu
