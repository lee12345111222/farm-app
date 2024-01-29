import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "./globals.css";
import useWebsocket from "@/hooks/useWebsocket";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Providers } from "@/lib/providers";
import { selectUser, useSelector } from "@/lib/redux";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // JSON.parse(window.localStorage.getItem("user") || "{}")
  const user = {};

  const { wsData, readyState, sendMessage, reconnect } = useWebsocket({
    url: user.id
      ? "ws://54.153.241.236:8000/ws/chat/" + user.id + "/" + user.token
      : "", // 此参数为websocket地址
  });

  const messagememo = useMemo(() => wsData, [wsData]);


  //   const [data, setData] = useState<Record<string,any>[]>([]);
  useEffect(() => {
    // 接受到socket数据， 进行业务逻辑处理
    if (Object.keys(messagememo).length !== 0) {
      console.log(messagememo);
      const data1 = JSON.parse(messagememo.message);
      console.log(data1.msgValue + "\n");
      let list = localStorage.getItem("message" + user.id) || "[]";
      let pre = JSON.parse(list);
      localStorage.setItem(
        //接受方存储 发送在chat页面
        "message" + user.id,
        JSON.stringify([
          ...pre,
          {
            id: Math.random(),
            text: data1.msgValue,
            type: "receive",
            avatar: "/user_photo2.png",
          },
        ])
      );
    }

    // 如果是已关闭且是当前页面自动重连
    if (readyState.key === 3) {
      reconnect();
    }
  }, [readyState, messagememo]);

  const handleSend = useCallback(sendMessage, [sendMessage]);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Providers>
      <Component
        {...pageProps}
        sendMessage={handleSend}
        messagememo={messagememo}
      />
    </Providers>
  );
}
