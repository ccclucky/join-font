
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
// import { ElMessage } from 'element-plus'
// import store from '../store'
// import router from '@/router'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  // withCredentials: true,
})

// 拦截请求
service.interceptors.request.use(
  (config:AxiosRequestConfig<any>) => {
    // const { authorization } = store.state.app
    // if (authorization) {
    //   config.headers.Authorization = `Bearer ${authorization.token}`
    // }
    return config
  },
  error => {
    // console.log(error);
    return Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  // 响应成功进入第1个函数，该函数的参数是响应对象
  response => {
    return response.data
  },
)

export default service
