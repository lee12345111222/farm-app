import React, { useState } from "react";
import { Popup } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
interface IProps {
  visible: boolean;
  open: () => void;
  close: () => void;
}

const SideMenuPopup = (props: IProps) => {
  const { visible, close } = props;
  const router = useRouter();
  const { locale: activeLocale } = router;
  const menus = [
    {
      img: "/home_slices/mysquare.png",
      label: language[activeLocale || "zh"]?.myfarm,
      onClick: () => router.push('/home'),
    },
    {
      img: "/home_slices/medicine.png",
      label: language[activeLocale || "zh"]?.buymedications,
      onClick: () => router.push('/shop'),
    },
    {
      img: "/home_slices/news.png",
      label: language[activeLocale || "zh"]?.latestnews,
      onClick: () => () => router.push('/news'),
    },
    {
      img: "/home_slices/table.png",
      label: language[activeLocale || "zh"]?.usefulforms,
      onClick: () => router.push('/table'),
    },
    {
      img: "/home_slices/connectus.png",
      label: language[activeLocale || "zh"]?.contactus,
      onClick: () => router.push('/chat'),
    },
  ];
  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        close();
      }}
      position="right"
      bodyStyle={{ width: "270px" }}
    >
      <div className="pt-[59px] pl-[43.5px]">
        {menus.map((menu) => {
          return (
            <div key={menu.label} className="flex items-center mb-[20px]" onClick={menu.onClick}>
              <img className="w-[20px] h-[20px]" src={menu.img} alt="" />
              <div className="text-[#708090] text-[20px] ml-[14px]">
                {menu.label}
              </div>
            </div>
          );
        })}
      </div>
    </Popup>
  );
};

export default SideMenuPopup;
