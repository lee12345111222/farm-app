import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "./globals.css";
import useWebsocket from "@/hooks/useWebsocket";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Providers } from "@/lib/providers";
import { selectUser, useSelector } from "@/lib/redux";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const router = useRouter()
  // JSON.parse(window.localStorage.getItem("user") || "{}")
  const [user, setUser] = useState<Record<string, any>>({});

  const { wsData, readyState, sendMessage, reconnect, closeWebSocket } = useWebsocket({
    url: user.id
      ? "ws://54.153.241.236:8000/ws/chat/" + user.id + "/" + user.token
      : "", // 此参数为websocket地址
  });

  const messagememo: any = useMemo(() => wsData, [wsData]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(res);
    const handleRouteChange = (url: string) => {
      // 在路由变化时执行你的逻辑
      console.log("路由发生了变化", url, url.includes("login")||url.includes("register")||url==='/zh'||url==='/');
      if(url.includes("login")||url.includes("register")||url==='/zh'||url==='/'){
        closeWebSocket()
        setUser({})
      }else{
        const res1 = JSON.parse(localStorage.getItem("user") || "{}");
        console.log(res1, 'res1');
        if (Object.keys(res1)?.length && res1.token !== res.token) {
          setUser(res1);
        }
      }
     
    };

    // 监听路由变化
    router.events.on("routeChangeStart", handleRouteChange);

    // 清除监听器以避免内存泄漏
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      setUser({})
    };
  }, []);
  console.log(user, "user");
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
            ...data1,
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
      <Layout>
        <Component
          {...pageProps}
          sendMessage={handleSend}
          messagememo={messagememo}
        />
      </Layout>
    </Providers>
  );
}
