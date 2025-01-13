import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import { Form, Input, Button } from "antd-mobile";
import FooterToolBar from "@/components/footer-tool-bar";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import { selectUser, useSelector } from "@/lib/redux";

const Home = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const query = useSelector(selectUser);
  const menus = [
    {
      img: "/home_slices/mysquare.png",
      label: language[activeLocale || "zh"]?.myfarm,
      onClick: () => router.push("/farm"),
    },
    {
      img: "/home_slices/table.png",
      label: language[activeLocale || "zh"]?.chickenbatchname,
      onClick: () => router.push("/chickenBatch"),
    },
    {
      img: "/home_slices/medicine.png",
      label: language[activeLocale || "zh"]?.buymedications,
      onClick: () => router.push("/shop"),
    },
    {
      img: "/home_slices/news.png",
      label: language[activeLocale || "zh"]?.latestnews,
      onClick: () => router.push("/news"),
    },
    {
      img: "/home_slices/connectus.png",
      label: language[activeLocale || "zh"]?.contactus,
      onClick: () => router.push("/chat"),
    },
  ];
  return (
    <div className="w-full h-full relative bg-[#F6F9FF] firstPage">
      <div className="relative bg-[url('/background.png')] bg-cover h-[38%]">
        <Header home logo />
        <div className="absolute top-[118px] left-[30px] text-white text-[19px]">
          {language[activeLocale || "zh"]?.goodnight.replace(
            "Ronald",
            query.username
          )}
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
