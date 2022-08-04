/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
// 遇到问题：后端返回的超大数字无法在JS中精确表示
// 解决方案：借助 json-bigint 将超大数字转成字符串即可
// import bigint from 'json-bigint'
// const JSONBig = bigint({ storeAsString: true }) // 通过该配置，让超大数字转为字符串
// axios.create 方法：复制一个 axios
const request = axios.create({
  // create会返回一个新的axios对象
  baseURL: 'http://toutiao.itheima.net' // 基础路径

  // transformResponse 允许自定义原始的响应数据（字符串）
  // transformResponse: [
  //   function (data) {
  //     try {
  //       // 如果转换成功则返回转换的数据结果
  //       return JSONBig.parse(data)
  //     } catch (err) {
  //       // 如果转换失败，则包装为统一数据格式并返回
  //       return { data }
  //     }
  //   }
  // ]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const res = store.state.user
    if (res && res.token) {
      config.headers.Authorization = `Bearer ${res.token}`
    }
    return config
  },
  function (err) {
    // Do something with request error
    return Promise.reject(err)
  }
)
export default request
