import { fetchPost } from "@/utils/request";
import { Dialog, Toast } from "antd-mobile";
import { useRouter } from "next/router";

interface Iprops {
    data: any[];
    sendMessage: Function;
    query: Record<string,any>;
}

export const useAddOrder = ({data, sendMessage, query}: Iprops) => {
    const router = useRouter()
    const handleAddOrder = () => {
        Dialog.confirm({
          content: "Are you sure to submit your order?",
          confirmText: 'Ok',
          cancelText: 'Cancel',
          onConfirm: async () => {
            let result = await fetchPost(
              "/order/add",
              data.map((ele) => ({
                commodityId: ele.id,
                number: Number(ele.number),
              })),
              {
                "Content-Type": "application/json",
              }
            );
            console.log(result, 'result')
            if (result?.code === "0") {
              Toast.show("success");
              //发送状态
              let res = sendMessage?.(
                JSON.stringify({
                  message: JSON.stringify({
                    msgId: "0001",
                    sendId: query.id,
                    acceptId:
                      "42d83d66fdf0451db16c3fe434f09e61",
                    msgType: "1",
                    msgValue: '生成一条订单:' + result.data?.order_id,
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
                    id: Math.random(),
                    text: '生成一条订单:' + result.data?.order_id,
                    type: "send",
                    avatar: "/user_photo2.png",
                  },
                ])
              );
              router.push('/chat')
            } else {
              Toast.show("Network error");
            }
          },
        });
      };
    return [handleAddOrder]
}