import request from '@/utils/request'

/**
 * 获取搜索联想建议
 */
export const getSearchSugg = q =>
  request({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })

/**
 * 获取搜索结果
 */
export const getSearchRes = params => request({
  method: 'get',
  url: '/v1_0/search',
  params
})
