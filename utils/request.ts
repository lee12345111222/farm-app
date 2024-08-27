export const baseUrl = process.env.NODE_ENV === 'production' ? "/api" : "/base";
console.log(baseUrl, 'base')
const checkLogin = (res: { data: string; code: string }) => {
  if (res.data === "未登錄" && location.href.indexOf("login") === -1){
    window.location.href = "/login/home";
  }
  return res;
};

//get请求封装
export const fetchGet = function (url: any, params: { [x: string]: any }) {
  let list = [];
  for (let key in params) {
    let str = `${key}=${params[key]}`;
    list.push(str);
  }
  const data = list.join("&");
  let allUrl = `${baseUrl}/${url}?${data}`;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // debugger
  return fetch(allUrl, {
    headers: {
      token: user?.token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(checkLogin)
  .catch((err) => {
    console.log(err);
    // return err;
  });
};
// post请求封装
export const fetchPost = function (
  url: string | URL | Request,
  params: { [x: string]: string | Blob | any },
  header?: Record<string, any>
) {
  let formData = new FormData();
  for (let key in params) {
    formData.append(key, params[key]);
  }
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return fetch(baseUrl + url, {
    body: header ? JSON.stringify(params) : formData,
    method: "POST",
    headers: {
      token: user?.token,
      ...header,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(checkLogin)
  .catch((err) => {
    console.log(err);
    return err;
  });
};
// 这个其实写不写都不行
const fetchAll = function (
  url: string | URL | Request,
  params: { [x: string]: any },
  method = "GET"
) {
  if (method === "GET" || method === "get") {
    return fetchGet(url, params);
  }
  return fetchPost(url, params);
};
export default {
  fetchGet,
  fetchPost,
  fetchAll,
};
