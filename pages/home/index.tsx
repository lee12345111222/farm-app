import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button } from "antd-mobile";
import FooterToolBar from "@/components/footer-tool-bar";
import { useRouter } from "next/router";
import { language } from "@/utils/language";

const Home = () => {
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
      onClick: () => router.push('/news'),
    },
    {
      img: "/home_slices/table.png",
      label: language[activeLocale || "zh"]?.usefulforms,
      onClick: () => router.push('/table'),
    },
    {
      img: "/home_slices/connectus.png",
      label: language[activeLocale || "zh"]?.contactus,
      onClick: () => router.push("/chat"),
    },
  ];
  return (
    <div className="w-full h-full relative bg-[#F6F9FF]">
      <div className="relative bg-[url('/home_slices/bg.png')] bg-cover h-[38%]">
        <Header home logo />
        <div className="absolute top-[118px] left-[30px] text-white text-[19px]">
          {language[activeLocale || "zh"]?.goodnight}
        </div>
      </div>
      <div className="home-cards-wrapper">
        {menus.map((menu) => {
          return (
            <div
              key={menu.label}
              className="flex justify-center items-center home-card"
              onClick={menu.onClick}
            >
              <img className="w-[20px] h-[20px]" src={menu.img} alt="" />
              <div className="text-[#708090] text-[20px] ml-[14px]">
                {menu.label}
              </div>
            </div>
          );
        })}
      </div>
      <FooterToolBar />
    </div>
  );
};

export default Home;
