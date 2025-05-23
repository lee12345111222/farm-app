import { Dialog, Toast } from "antd-mobile";
import { fetchPost } from "./request";
import * as PDFJS from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function urlToBase64(url) {
  console.log(url, "url");
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
}

const readFileData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

//param: file -> the input file (e.g. event.target.files[0])
//return: images -> an array of images encoded in base64
export const convertPdfToImages = async (file) => {
  const images: any = [];
  const data = await urlToBase64(file);
  console.log(data, "data", file);
  const pdf = await PDFJS.getDocument(data).promise;
  const canvas = document.createElement("canvas");
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    images.push(canvas.toDataURL());
  }
  canvas.remove();
  return images;
};

export const upload = (url: string, fn: Function, allowed?: any[]) => {
  //選擇文件的 input 元素
  const fileInput: HTMLInputElement = document.createElement("input");
  fileInput.type = "file";
  fileInput.click();

  const allowedFormats = allowed || [
    "pdf",
    "doc",
    "docx",
    "txt",
    "ppt",
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "jpg",
    "png",
    "gif",
    "jpeg",
  ];
  // 當文件選擇後觸發的函數
  fileInput.onchange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      console.log(target.files, "target");
      const file: File = target.files[0];
      var fileExtension = file?.name?.split(".").pop().toLowerCase() || "";
      if (!allowedFormats.includes(fileExtension)) {
        // alert('只能上傳 ' + allowedFormats.join(', ') + ' 格式的文件');
        Dialog.alert({
          content: "只能上傳 " + allowedFormats.join(", ") + " 格式的文件",
          onConfirm: () => {
            console.log("Confirmed");
          },
        });
        return;
      }
      try {
        Toast.show({
          icon: "loading",
          content: "uploading…",
          duration: 0,
        });
        // 發送文件到服務器
        const response: Record<string, any> = await fetchPost(url, {
          file: file,
        });
        if (response?.code === "0") {
          fn(response.data?.id || "", response.data?.type || "");

          // await fetchPost("/chat/downloadFile/" + response.data?.[0], {});
        } else {
          console.error("文件上傳失败");
          Toast.show({
            content: "文件上傳失败",
          });
        }
        Toast.clear();
      } catch (error) {
        console.error("發生錯誤:", error);
        Toast.show({
          content: "發生錯誤" + error,
        });
        Toast.clear();
      }
    }
  };
  console.log("123");

  // // 將 input 元素添加到頁面中
  // document.body.appendChild(fileInput);
};
export const isImage = (filename: string) => {
  var ext = filename.split(".").pop().toLowerCase();
  return ext === "jpg" || ext === "png" || ext === "gif" || ext === "jpeg";
};
export const isFile = (str: string) => {
  var commonFormatsRegex = /\.(pdf|docx?|xlsx?|pptx?|txt)$/i;
  var archiveFormatsRegex = /\.(zip|rar|7z|tar|gz)$/i;
  return commonFormatsRegex.test(str) || archiveFormatsRegex.test(str);
};
