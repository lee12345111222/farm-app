import { fetchPost } from "@/utils/request";
import { useState, useRef, useEffect, useCallback } from "react";

interface Iprops {
  url: string;
}

const useWebsocket = ({ url }: Iprops) => {
  const ws = useRef<WebSocket | null>(null); // socket 数据
  const [wsData, setMessage] = useState({}); //  socket 状态
  const [readyState, setReadyState] = useState<any>({
    key: 0,
    value: "正在连接中",
  });

  const creatWebSocket = () => {
    const stateArr = [
      { key: 0, value: "正在连接中" },
      { key: 1, value: "已经连接并且可以通讯" },
      { key: 2, value: "连接正在关闭" },
      { key: 3, value: "连接已关闭或者没有连接成功" },
    ];
    try {
      ws.current = new WebSocket(url);
      ws.current.onopen = () => {
        console.log(ws.current?.readyState, "ws.current?.readyState");
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onclose = () => {
        console.log(ws.current?.readyState, "ws.current?.readyState onclose");
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onerror = () => {
        console.log(ws.current?.readyState, "ws.current?.readyState onerror");
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onmessage = (e) => {
        setMessage({ ...JSON.parse(e.data) });
      };
    } catch (error) {
      console.log(error);
    }
  };

  const webSocketInit = () => {
    if (!ws.current || ws.current.readyState === 3) {
      creatWebSocket();
    }
  }; //  关闭 WebSocket

  const closeWebSocket = () => {
    ws.current?.close();
  }; // 发送数据
  console.log(readyState, "readyState");
  const sendMessage = useCallback(
    (str: string) => {
      if (readyState.key === 1) {
        ws.current?.send(str);
        return true;
      } else {
        return false;
      }
    },
    [ws.current, readyState]
  );

  const reconnect = () => {
    try {
      closeWebSocket();
      ws.current = null;
      creatWebSocket();
    } catch (e) {
      console.log(e);
    }
  }; //重连

  useEffect(() => {
    if (url) {
      getHistory()
      // getHistoryPerson()
    }
    return () => {
      ws.current?.close();
    };
  }, [ws, url]);

  const getHistory = async () => {
    const query = JSON.parse(localStorage.getItem("user") || "{}");
    let res: Record<string, any> = await fetchPost(
      "/chat/query_page?page=1&size=20",
      {
        sendId: query.id,
        acceptId:
          // query.id === "42d83d66fdf0451db16c3fe434f09e61"
          //   ? accept.id || query.id
          "42d83d66fdf0451db16c3fe434f09e61",
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "data");
      let arr = res?.data?.[0]?.list || [];
      arr = arr.map((ele) => {
        return {
          ...ele,
          text: ele.msgValue,
          type: ele.sendId === query.id ? "send" : "receive",
          avatar:
            ele.sendId === query.id ? "/user_photo2.png" : "/user_photo.png",
        };
      });
      localStorage.setItem(
        //接受方存储 发送在chat页面
        "message" + query.id,
        JSON.stringify(arr)
      );
      webSocketInit();
    }
  };

  const getHistoryPerson = async () => {
    const query = JSON.parse(localStorage.getItem("user") || "{}");
    let res: Record<string, any> = await fetchPost(
      "/chat/query_chat_object?page=1&size=20",
      {
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "data");
    }
  }

  console.log(readyState, "readyState");

  return {
    wsData,
    readyState,
    closeWebSocket,
    reconnect,
    sendMessage,
  };
};
export default useWebsocket;
