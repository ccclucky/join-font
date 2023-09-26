/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-10-01 12:48:54
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-02 16:32:32
 * @FilePath: \metabubble-join\src\api\api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from './request'

// 获取文章列表
export  const signup = (data:any) => {
  return request({
    url: '/auth/signup',
    method: 'post',
    data
  })
}

export  const signin = (data:any) => {
    return request({
      url: '/auth/signin',
      method: 'post',
      data
    })
  }
  

  export  const profile = () => {
    return request({
      url: '/users/me',
      method: 'post',
    })
  }
  export  const submit = (data:any) => {
    return request({
      url: '/users/submit',
      method: 'put',
      data
    })
  }
  
