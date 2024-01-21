import Header from "@/components/header";
import { Input } from "antd-mobile";
import React, { useState, useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SearchIndex } from "emoji-mart";
import { useRouter } from "next/router";
import useWebsocket from "@/hooks/useWebsocket";
import { upload } from "@/utils";

const Chat = () => {
  const router = useRouter();

  const { query } = router;

  const [height, setHeight] = useState("100%");
  const [message, setMessage] = useState<Record<string, any>[]>([
    // {
    //   id: 1,
    //   text: "这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字",
    //   type: "receive",
    //   avatar: "/user_photo.png",
    // },
    // {
    //   id: 2,
    //   text: "这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字",
    //   type: "send",
    //   avatar: "/user_photo2.png",
    // },
  ]);
  const [val, setVal] = useState<string | undefined>();
  const [emijiShow, setEmojiShow] = useState(false);
  //   const [isConnected, fooEvents] = useSocket()

  const ref = useRef<HTMLDivElement>(null);

  const chatSocket = useRef<Record<string, any>>({});

  const { wsData, readyState, sendMessage, reconnect } = useWebsocket({
    url: query.id ? "ws://54.153.241.236:8000/ws/chat/" + query.id + "/" : "", // 此参数为websocket地址
  });
  useEffect(() => {
    // 接受到socket数据， 进行业务逻辑处理
    if (Object.keys(wsData).length !== 0) {
      console.log(wsData);
      const data1 = JSON.parse(wsData.message[0]);
      console.log(data1.msgValue + "\n");
      onEnterPress({ target: { value: data1.msgValue } } as any, "receive");
    }

    // 如果是已关闭且是当前页面自动重连
    if (readyState.key === 3) {
      reconnect();
    }
  }, [wsData, readyState]);

  useEffect(() => {
    const height = ref.current?.clientHeight!;
    const bodyHeight = document.body?.clientHeight;
    if (height > bodyHeight) {
      setHeight(height + "px");
    } else {
      setHeight(bodyHeight + "px");
    }
  }, [ref.current?.clientHeight]);

  // useEffect(() => {
  //   if (query.id) {
  //     console.log(query.id, "query");
  //     chatSocket.current = new WebSocket(
  //       "ws://" + "54.153.241.236:8000" + "/ws/chat/" + query.id + "/"
  //     );
  //     console.log(chatSocket, "chatSocket");

  //     chatSocket.current.onmessage = function (e: { data: string }) {
  //       const data = JSON.parse(e.data);
  //       const data1 = JSON.parse(data.message[0]);
  //       console.log(data1.msgValue + "\n");
  //       onEnterPress({ target: { value: data1.msgValue } } as any, "receive");
  //     };
  //   }
  // }, [query.id]);

  const onEnterPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type?: string
  ) => {
    const v = (e.target as any).value;

    if (!type) {
      //发送状态
      sendMessage(
        JSON.stringify({
          message: JSON.stringify({
            id: "0001",
            sendId: query.id,
            acceptId: query.id === "0001" ? "0002" : "0001",
            msgType: "1",
            msgValue: v,
          }),
        })
      );
    }

    setMessage((pre) => {
      return [
        ...pre,
        {
          id: message.length + 1,
          text: v,
          type: type || "send",
          avatar: "/user_photo2.png",
        },
      ];
    });
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    setVal("");
  };

  const handleAllClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEmojiShow(false);
  };

  return (
    <>
      <div
        className="w-full  bg-[#F5F5F5] relative"
        style={{ height }}
        onClick={handleAllClick}
      >
        <Header logo />
        <div className="pt-[134px] pb-[101px] text-white" ref={ref}>
          <img src={'http://54.153.241.236:8000/chat/downloadFil/1705823955736.png'} />
          {message.map((item) => {
            return (
              <div key={item.id}>
                {item.type === "receive" ? (
                  <div className="flex pl-[20px] mb-[35px] pr-[75px]">
                    <img
                      className="w-[50px] h-[50px] mr-[8px] "
                      src={item.avatar}
                      alt=""
                    />
                    <div className="p-[10px] bg-[#79E1BE] rounded-lg rounded-tl-none self-center break-all">
                      {item.text}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row-reverse pr-[20px] mb-[35px] pl-[75px]">
                    <img
                      className="w-[50px] h-[50px]"
                      src={item.avatar}
                      alt=""
                    />
                    <div className="bg-[#4682B4] p-[10px] mr-[8px] rounded-lg rounded-tr-none self-center break-all">
                      {item.text}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {emijiShow ? (
          <div className="flex w-[100%] justify-center bg-[#F5F5F5] fixed bottom-[120px]">
            <Picker
              data={data}
              onEmojiSelect={(e: any) => {
                console.log(e);
                setVal((val) => (val || "") + (e.native || ""));
              }}
            />
          </div>
        ) : null}
        <div className=" w-full flex items-center fixed bottom-0 left-0 h-[101px] bg-white pt-[14px] pl-[15px] pb-[45px] pr-[10px]">
          <Input
            onEnterPress={onEnterPress}
            value={val}
            onChange={(val) => setVal(val)}
            style={{
              padding: "8px",
            }}
            className="border border-transparent w-[272px] h-[40px] !bg-[#F5F5F5] rounded-lg"
          ></Input>
          <img
            onClick={(e) => {
              e.stopPropagation();
              setEmojiShow(true);
              console.log(123);
            }}
            className="ml-[10px] w-[27px] h-[27px]"
            src="/news/expression.png"
            alt="menu"
          />
          <img
            onClick={async (e) => {
              e.stopPropagation();
              upload('/chat/uploadFile', (name: string) => onEnterPress({ target: { value: name } } as any))
            }}
            className="ml-[10px] w-[27px] h-[27px]"
            src="/news/add.png"
            alt="menu"
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
