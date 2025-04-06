import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "./globals.css";
import useWebsocket from "@/hooks/useWebsocket";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Providers } from "@/lib/providers";
import { selectUser, useSelector } from "@/lib/redux";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  // JSON.parse(window.localStorage.getItem("user") || "{}")
  const [user, setUser] = useState<Record<string, any>>({});

  const { wsData, readyState, sendMessage, reconnect, closeWebSocket } =
    useWebsocket({
      url: user.id
      ? "ws://13.211.67.47:8000/ws/chat/" + user.id + "/" + user.token
        // ? "ws://127.0.0.1:8000/ws/chat/" + user.id + "/" + user.token
        : "", // 此參數為websocket地址
    });

  const messagememo: any = useMemo(() => wsData, [wsData]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(res);
    const handleRouteChange = (url: string) => {
      // 在路由變化時執行你的邏輯
      console.log(
        "路由發生了變化",
        url,
        url.includes("login") ||
          url.includes("register") ||
          url === "/zh" ||
          url === "/"
      );
      if (
        url.includes("login") ||
        url.includes("register") ||
        url === "/zh" ||
        url === "/"
      ) {
        closeWebSocket();
        setUser({});
      } else {
        const res1 = JSON.parse(localStorage.getItem("user") || "{}");
        console.log(res1, "res1");
        if (Object.keys(res1)?.length && res1.token !== res.token) {
          setUser(res1);
        }
      }
    };

    // 監聽路由變化
    router.events.on("routeChangeStart", handleRouteChange);

    // 清除監聽器以避免内存泄漏
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      setUser({});
    };
  }, []);
  console.log(user, "user");
  //   const [data, setData] = useState<Record<string,any>[]>([]);
  useEffect(() => {
    // 接受到socket數據， 進行業務邏輯處理
    if (Object.keys(messagememo).length !== 0) {
      console.log(typeof messagememo, 'messagememo');
      const data1 = JSON.parse(messagememo?.message  || '[]');
      console.log(data1.msgValue + "\n");
      let list = localStorage.getItem("message" + user.id) || "[]";
      let pre = JSON.parse(list);
      localStorage.setItem(
        //接受方存儲 發送在chat頁面
        "message" + user.id,
        JSON.stringify([
          ...pre,
          {
            ...data1,
            id: Math.random(),
            text: data1.msgValue,
            type: "receive",
            avatar: "/user_photo2.png",
          },
        ])
      );
    }

    // 如果是已關閉且是當前頁面自動重連
    if (readyState.key === 3) {
      reconnect();
    }
  }, [readyState, messagememo]);

  const handleSend = useCallback(sendMessage, [sendMessage]);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ConfigProvider locale={enUS}>
      <Providers>
        <Layout>
          <Component
            {...pageProps}
            sendMessage={handleSend}
            messagememo={messagememo}
          />
        </Layout>
      </Providers>
    </ConfigProvider>
  );
}
