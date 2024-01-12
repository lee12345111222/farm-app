import React from "react";
import Menu from "./side-menu";
import { useRouter } from "next/navigation";
interface IHeader {
  logo?: boolean;
  home?: boolean;
  back?: boolean;
  title?: string;
}
const Header = (props: IHeader) => {
  const { logo, home, back,title } = props;
  const router = useRouter();
  return (
    <div className="w-full flex justify-between items-center absolute top-[67px] right-[12px]">
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
          src={`/back.png`}
          alt="back"
          onClick={() => router.back()}
        />
      ) : (
        <div></div>
      )}
      {title ? <span className="ml-[38px] font-[PingFang SC-Bold] text-[#000000] font-bold text-base truncate">{title}</span> : null}
      <Menu home={home} />
    </div>
  );
};

export default Header;
