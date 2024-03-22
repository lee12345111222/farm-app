import Header from "@/components/header";
import { Button, Input, Toast } from "antd-mobile";
import React, { useState, useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SearchIndex } from "emoji-mart";
import { useRouter } from "next/router";
import useWebsocket from "@/hooks/useWebsocket";
import { isFile, isImage, upload } from "@/utils";
import { baseUrl, fetchPost } from "@/utils/request";
import { selectUser, useSelector } from "@/lib/redux";

interface Iprops {
  sendMessage: Function;
  messagememo: Record<string, any>;
}
const Chat = ({ sendMessage, messagememo }: Iprops) => {
  const router = useRouter();

  const query = useSelector(selectUser);

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
  const [accept, setAccept] = useState<{ name?: string; id?: string }>({});

  const ref = useRef<HTMLDivElement>(null);

  const inputRef = useRef(null);
  useEffect(() => {
    if (Object.keys(messagememo).length !== 0) {
      console.log(messagememo);
      const data1 = JSON.parse(messagememo?.message || '[]');
      console.log(data1, "data1");
      onEnterPress(
        { target: { val: data1, value: data1.msgValue } } as any,
        "receive"
      );
    }
  }, [messagememo]);
  useEffect(() => {
    if (query.id) {
      let list = localStorage.getItem("message" + query.id) || "[]";
      let arr = JSON.parse(list);
      setMessage(arr);
      // getHistory();
    }
  }, [query.id]);

  useEffect(() => {
    if (ref.current) {
      window.scrollTo(0, ref.current?.clientHeight);
    }
  }, [ref.current?.clientHeight]);

  const getHistory = async () => {
    let res: Record<string, any> = await fetchPost(
      "/chat/query_page?page=1&size=20",
      {
        sendId: query.id,
        acceptId:
          query.id === "42d83d66fdf0451db16c3fe434f09e61"
            ? accept.id || query.id
            : "42d83d66fdf0451db16c3fe434f09e61",
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
      setMessage(arr);
    }
  };

  const onEnterPress = (e: Record<string, any>, type?: string) => {
    const v = (e.target as any).value;
    const val = e.target.val || {};

    if (!type) {
      //发送状态
      let res = sendMessage?.(
        JSON.stringify({
          message: JSON.stringify({
            msgId: "0001",
            sendId: query.id,
            acceptId:
              query.id === "42d83d66fdf0451db16c3fe434f09e61"
                ? accept.id || query.id
                : "42d83d66fdf0451db16c3fe434f09e61",
            msgType: "1",
            msgValue: v,
          }),
        })
      );
      console.log(res, "res");
      if (!res) {
        Toast.show({
          content: "network error",
        });
        return;
      }
      let list = localStorage.getItem("message" + query.id) || "[]";
      let pre = JSON.parse(list);
      localStorage.setItem(
        "message" + query.id,
        JSON.stringify([
          ...pre,
          {
            ...val,
            id: message.length + 1,
            text: v,
            type: "send",
            avatar: "/user_photo2.png",
          },
        ])
      );
    }

    setMessage((pre) => {
      return [
        ...pre,
        {
          ...val,
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

  const getFiledom = (ele: Record<string, any>) => {

    const filetype = isImage(ele.text) ? "img" : isFile(ele.text) ? "file" : "";
    const text = ele.text?.split('.')?.[0]
    console.log(ele.text, 'ele', text, isImage(ele.text))

    if (filetype === "img") {
      return (
        <img
          src={baseUrl + "/resources/downloadFile/" + text}
          className="rounded-lg w-[100%]"
        />
      );
    } else if (filetype === "file") {
      return (
        <a
          className="text-white underline"
          onClick={() =>
            window.open(baseUrl + "/resources/downloadFile/" + text)
          }
        >
          {text}
        </a>
      );
    } else {
      return text;
    }
  };
  console.log(accept, "accept");
  return (
    <>
      <div
        className="w-full bg-[#F5F5F5]  relative min-h-screen"
        // style={{ height }}
        onClick={handleAllClick}
      >
        <Header logo title={accept.name} styles='!fixed !top-0 pt-8 bg-[#F5F5F5] w-screen z-[999]'/>
        <div className="pt-[134px] pb-[101px] text-white" ref={ref}>
          {/* <img src={'http://54.153.241.236:8000/chat/downloadFil/1705823955736.png'} /> */}
          {message.map((item) => {
            return (
              <div key={item.id}>
                {item.type === "receive" ? (
                  <div
                    className="flex pl-[20px] mb-[35px] pr-[75px] items-center"
                    onClick={() => {
                      query.admin === "1" &&
                        setAccept({ name: item.sendName, id: item.sendId });
                      console.log(item);
                    }}
                  >
                    <img
                      className="w-[50px] h-[50px] mr-[8px] "
                      src={item.avatar}
                      alt=""
                    />
                    <div>
                      <div className="text-[#999] text-sm text-left mb-2">
                        {item.sendName}
                      </div>
                      <div
                        className={` ${
                          isImage(item.text)
                            ? "bg-white"
                            : "bg-[#79E1BE] p-[10px]"
                        } rounded-lg rounded-tl-none self-center break-all`}
                      >
                        {/* {item.text} */}
                        {getFiledom(item)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row-reverse pr-[20px] mb-[35px] pl-[75px] items-center">
                    <img
                      className="w-[50px] h-[50px]"
                      src={item.avatar}
                      alt=""
                    />
                    <div>
                      <div className="text-[#999] text-sm text-right mb-2 mr-[8px]">
                        {query.username}
                      </div>

                      <div
                        className={`${
                          isImage(item.text)
                            ? "bg-white"
                            : "bg-[#4682B4] p-[10px]"
                        }   mr-[8px] rounded-lg rounded-tr-none self-center break-all`}
                      >
                        {/* {item.text} */}
                        {getFiledom(item)}
                      </div>
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
                setVal((val) => (val || "") + (e.native || ""));
                inputRef.current?.focus();
              }}
            />
          </div>
        ) : null}
        <div className=" w-full flex items-center fixed bottom-0 left-0 h-[101px] bg-white pt-[14px] pl-[15px] pb-[45px] pr-[10px]">
          <Input
            onEnterPress={onEnterPress}
            value={val}
            ref={inputRef}
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
              upload("/resources/add", (name: string, filetype: string) => {
                onEnterPress({
                  target: { value: name + (filetype ? `.${filetype}` : "") },
                } as any);
              });
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
