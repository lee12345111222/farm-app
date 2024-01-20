import { useEffect, useState } from "react";

import { socket } from "@/utils/socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any[]>([]);

  useEffect(() => {
    function onConnect() {
        console.log('con')
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      console.log(value, "value");
      setFooEvents((previous) => [...previous, value]);
    }
    
    console.log(socket, "2324");
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onFooEvent);
    socket.on("connect_error", (err) => {
        console.log("socket 连接err", err);
        socket.connect()
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onFooEvent);
    };
  }, [socket]);

  return [isConnected, fooEvents];
};
