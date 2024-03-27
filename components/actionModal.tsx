import { upload } from "@/utils";
import { baseUrl } from "@/utils/request";
import { DatePicker, DatePickerRef, Form, Input, Modal } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import { RefObject, useState } from "react";

interface Iprops {
  title?: string;
  contentJson: Record<string, any>[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: (v: Record<string, any>) => void;
}

export const ActionModal = (props: Iprops) => {
  const { contentJson, title, visible, setVisible, onOk } = props;

  const [url, setUrl] = useState("");

  const [form] = Form.useForm();

  const handleUpload = (key: string) => {
    upload("/resources/add", (name: string, filetype: string) => {
      form.setFieldValue(key, name);
      setUrl(name);
    });
  };

  const getContent = (ele: Record<string, any>) => {
    switch (ele.type) {
      case "input":
        return (
          <Form.Item
            name={ele.key}
            label={ele.lable}
            rules={[
              {
                required: ele.required ? true : false,
                message: ele.lable + "不能为空",
              },
            ]}
          >
            <Input onChange={console.log} placeholder="Pleace input" />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item
            name={ele.key}
            label={ele.lable}
            trigger="onConfirm"
            onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            rules={[
              {
                required: ele.required ? true : false,
                message: ele.lable + "不能为空",
              },
            ]}
          >
            <DatePicker>
              {(value) =>
                value ? dayjs(value).format("YYYY-MM-DD") : "Please Select Date"
              }
            </DatePicker>
          </Form.Item>
        );
      case "upload":
        return (
          <Form.Item
            style={{
              "--align-items": "center",
              justifyContent: "space-between",
            }}
            childElementPosition="right"
            name={ele.key}
            label={ele.lable}
            rules={[
              {
                required: ele.required ? true : false,
                message: ele.lable + "不能为空",
              },
            ]}
          >
            <div
              className="w-20 h-20 border rounded-md flex justify-center items-center"
              onClick={() => handleUpload(ele.key)}
            >
              {url ? (
                <img
                  src={baseUrl + "/resources/downloadFile/" + url}
                  className="w-[100] h-[100%]"
                />
              ) : (
                <AddOutline fontSize={40} />
              )}
            </div>
          </Form.Item>
        );
    }
  };
  return (
    <>
      <Modal
        visible={visible}
        closeOnMaskClick={true}
        title={title || "新增"}
        content={
          <Form
            layout="horizontal"
            form={form}
            className="mt-[35px]"
            footer={null}
          >
            {contentJson.map((ele) => getContent(ele))}
          </Form>
        }
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
        actions={[
          {
            key: "confirm",
            text: "Ok",
            onClick: async () => {
              form.validateFields().then((params) => {
                console.log(params, "params");
                params.msgTime = dayjs(params.msgTime).format("YYYY-MM-DD");
                console.log(123, params);
                onOk(params);
              });
            },
          },
        ]}
      />
    </>
  );
};
