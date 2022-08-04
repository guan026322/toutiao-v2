/**
 * 评论接口模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getComment = (params) =>
  request({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
/**
 * 评论点赞
 */
export const addComLiked = (target) =>
  request({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
/**
 * 取消评论点赞
 */
export const delComLiked = (target) =>
  request({
    method: 'delete',
    url: `/v1_0/comment/likings/${target}`
  })
/**
 * 添加评论或评论回复
 */
export const addComment = (data) =>
  request({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
