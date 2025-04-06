import { fetchPost } from "@/utils/request";
import { useState, useRef, useEffect, useCallback } from "react";

interface Iprops {
  url: string;
}

const useWebsocket = ({ url }: Iprops) => {
  const ws = useRef<WebSocket | null>(null); // socket 數據
  const [wsData, setMessage] = useState({}); //  socket 狀態
  const [readyState, setReadyState] = useState<any>({
    key: 0,
    value: "正在連接中",
  });

  const creatWebSocket = () => {
    const stateArr = [
      { key: 0, value: "正在連接中" },
      { key: 1, value: "已經連接並且可以通訊" },
      { key: 2, value: "連接正在關閉" },
      { key: 3, value: "連接已關閉或者没有連接成功" },
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
  }; //  關閉 WebSocket

  const closeWebSocket = () => {
    ws.current?.close();
  }; // 發送數據
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
  }; //重連

  useEffect(() => {
    if (url) {
      const query = JSON.parse(localStorage.getItem("user") || "{}");
      // if(query.admin === "1"){
      //   getHistoryPerson() 
      // }else{
        getHistory();
      // }
    }
    return () => {
      ws.current?.close();
    };
  }, [ws, url]);

  const getHistory = async (acceptId?: string) => {
    const query = JSON.parse(localStorage.getItem("user") || "{}");
    let res: Record<string, any> = await fetchPost(
      "/chat/query_self_page?page=1&size=100",
      {
        // sendId: query.id,
        // acceptId: acceptId || "42d83d66fdf0451db16c3fe434f09e61",
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
        //接受方存儲 發送在chat頁面
        "message" + query.id,
        JSON.stringify(arr)
      );
      webSocketInit();
    }
  };

  const adminGetHistory = async (acceptId?: string) => {
    const query = JSON.parse(localStorage.getItem("user") || "{}");
    let res: Record<string, any> = await fetchPost(
      "/chat/query_page?page=1&size=20",
      {
        sendId: query.id,
        acceptId: acceptId || "42d83d66fdf0451db16c3fe434f09e61",
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
      return arr;
    }
  };

  const getHistoryPerson = async () => {
    const query = JSON.parse(localStorage.getItem("user") || "{}");
    let res: Record<string, any> = await fetchPost(
      "/chat/query_chat_object?page=1&size=4",
      {},
      {
        "Content-Type": "application/json",
      }
    );
    if (res?.code === "0") {
      console.log(res, "data");
      let data = res.data?.[0]?.list || [];
      data.reverse()
      Promise.all(
        data.map((ele: { acceptId: string }) => adminGetHistory(ele.acceptId))
      ).then((res) => {
        let all = [];
        res.forEach((ele: any) => {
          all = all.concat(ele);
        });
        console.log(all, "all");

        localStorage.setItem(
          //接受方存儲 發送在chat頁面
          "message" + query.id,
          JSON.stringify(all)
        );
        webSocketInit();
      });
    }
  };

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
