import { fetchPost } from "./request";

export const upload = (url: string, fn: Function) => {
  //     var input = document.createElement("input");
  //   input.type = "file";
  //   input.click();
  //   input.onchange = function(){
  //     var file = input.files[0];
  //     var form = new FormData();
  //     form.append("file", file); // 第一个参数是后台读取的请求key值
  //     form.append("fileName", file.name);
  //     form.append("other", "666666"); // 实际业务的其他请求参数
  //     var xhr = new XMLHttpRequest();
  //     var action = "http://localhost:8080/upload.do"; // 上传服务的接口地址
  //     xhr.open("POST", action);
  //     xhr.send(form); // 发送表单数据
  //     xhr.onreadystatechange = function(){
  //       if(xhr.readyState==4 && xhr.status==200){
  //         var resultObj = JSON.parse(xhr.responseText);
  //         // 处理返回的数据......
  //       }
  //     }
  //   }
  //选择文件的 input 元素
  const fileInput: HTMLInputElement = document.createElement("input");
  fileInput.type = "file";
  fileInput.click();
  // 当文件选择后触发的函数
  fileInput.onchange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file: File = target.files[0];

      // 创建一个 FormData 对象，用于包装文件数据
      const formData: FormData = new FormData();
      //   formData.append("file", file);

      try {
        // 发送文件到服务器
        const response = await fetchPost(url, { file: file });
        if (response.code === "0") {
          console.log("文件上传成功", response);
          fn(response.data?.[0]);

          await fetchPost(
            "/chat/downloadFile/" +
              response.data?.[0],
            {}
          );
        } else {
          console.error("文件上传失败");
        }
      } catch (error) {
        console.error("发生错误:", error);
      }
    }
  };
  console.log("123");

  // // 将 input 元素添加到页面中
  // document.body.appendChild(fileInput);
};
