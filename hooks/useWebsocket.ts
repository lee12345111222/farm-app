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
        console.log(ws.current?.readyState, 'ws.current?.readyState')
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onclose = () => {
        console.log(ws.current?.readyState, 'ws.current?.readyState onclose')
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onerror = () => {
        console.log(ws.current?.readyState, 'ws.current?.readyState onerror')
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

  const sendMessage = useCallback((str: string) => {
    console.log(readyState)
    if(readyState.key === 1){
        ws.current?.send(str);
        return true
    }else{
        return false
    }
  },[ ws.current, readyState]);


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
      webSocketInit();
    }
    return () => {
      ws.current?.close();
    };
  }, [ws, url]);

  console.log(readyState, 'readyState')

  return {
    wsData,
    readyState,
    closeWebSocket,
    reconnect,
    sendMessage,
  };
};
export default useWebsocket;
