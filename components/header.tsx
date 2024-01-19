import React from "react";
import Menu from "./side-menu";
import { useRouter } from "next/navigation";
import { LeftOutline } from "antd-mobile-icons";
interface IHeader {
  logo?: boolean;
  home?: boolean;
  back?: boolean;
  title?: string;
  styles?: string;
}
const Header = (props: IHeader) => {
  const { logo, home, back, title, styles } = props;
  const router = useRouter();
  return (
    <div
      className={`w-full flex justify-between items-center absolute top-16 right-[12px] ${styles}`}
    >
      {logo ? (
        <img
          className="ml-[40px] w-[26px] h-[26px]"
          src={`${home ? "/home_slices/logo-white.png" : "/logo.png"}`}
          alt="logo"
          onClick={() => router.push("/home")}
        />
      ) : back ? (
        <img
          className="ml-[40px] w-2 h-4"
          src={home ? "/backwhite.png" : `/back.png`}
          alt="back"
          onClick={() => router.back()}
        />
      ) : (
        <div></div>
      )}
      {title ? (
        <span
          className={`ml-[38px] font-[PingFang SC-Bold] ${
            home ? "text-white" : "text-[#000000]"
          } font-bold text-base truncate`}
        >
          {title}
        </span>
      ) : null}
      <Menu home={home} />
    </div>
  );
};

export default Header;
