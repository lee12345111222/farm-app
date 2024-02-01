import React, { useState } from "react";
import { Popup, Toast } from "antd-mobile";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import { SendOutline } from "antd-mobile-icons";
import { fetchPost } from "@/utils/request";
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
      onClick: () => router.push('/farm'),
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
      onClick: () => router.push('/chat?id=0002'),
    },
  ];
  const handleOut = async() => {
    let res = await fetchPost("/user/logout", {}, {
      "Content-Type": "application/json",
    });
    if (res?.code === "0") {
      console.log(res, "res");
      Toast.show('success')
      localStorage.removeItem("user");
      router.replace('/login')
    } else {
      Toast.show('Network error')
    }
  }
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
        <div key={'out'} className="flex mb-[20px] mt-6" onClick={handleOut}>
              {/* <SendOutline className="w-[20px] h-[20px]" color="#1E84B4"/> */}
              <div className="w-[20px] h-[20px]"></div>
              <div className="text-[#708090] text-[20px] ml-[14px]">
              {language[activeLocale || "zh"]?.logout}
              </div>
            </div>
      </div>
    </Popup>
  );
};

export default SideMenuPopup;
