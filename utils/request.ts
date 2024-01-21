const baseUrl = '/base'

//get请求封装
export const fetchGet = function(url: any, params: { [x: string]: any; }) {
    let list = [];
    for (let key in params) {
        let str = `${key}=${params[key]}`
        list.push(str);
    }
    const data = list.join('&');
    let allUrl = `${baseUrl}/${url}?${data}`;
    // debugger
    return fetch(allUrl).then(res => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
};
// post请求封装
export const fetchPost = function(url: string | URL | Request, params: { [x: string]: string | Blob; }) {
    let formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key])
    };
    return fetch(baseUrl + url, {
        body: formData,
        method: 'POST'
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log(err);
    })
};
// 这个其实写不写都不行
const fetchAll = function(url: string | URL | Request, params: { [x: string]: any; }, method='GET') {
    if (method === 'GET' || method === 'get') {
        return fetchGet(url, params);
    } 
    return fetchPost(url, params);
}
export default {
    fetchGet,
    fetchPost,
    fetchAll
}
 
