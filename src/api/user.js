/**
 * 用户相关的请求模块
 */

import request from '@/utils/request'

// import store from '@/store'
/**
 * 用户登录
 */
// data是形参，调用login时，需要将这次请求的数据传递过来
export const login = (data) =>
  request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })

// data是形参，调用login时，需要将这次请求的数据传递过来
export const sendSms = (mobile) =>
  request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () =>
  request({
    method: 'get',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   // token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })

/**
 * 获取用户自己的信息
 */
export const getUserChannels = () =>
  request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
/**
 * 关注用户
 */
export const addFollow = (target) =>
  request({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      // post请求方式，要传递的数据，放入data对象中
      target // target关注目标（被关注的用户id）
    }
  })
/**
 * 取消关注用户
 */
export const delFollow = (target) =>
  request({
    method: 'delete',
    url: `v1_0/user/followings/${target}` // target目标用户（被取消关注的用户id）
  })
/**
 * 获取用户个人资料
 */
// 获取指定用户信息
export const getUserProfile = () => request({
  method: 'get',
  url: '/v1_0/user/profile'
})
/**
 * 更新用户资料
 */
export const updateUserProfile = data => request({
  method: 'patch',
  url: '/v1_0/user/profile',
  data
})
/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => request({
  method: 'patch',
  url: '/v1_0/user/photo',
  data
})
