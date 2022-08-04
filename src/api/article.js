/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
 * 获取频道的文章列表
 */
export const getArticles = (params) =>
  request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
/**
 * 获取频道的文章列表
 */
export const getArtId = (articleId) =>
  request({
    method: 'get',
    url: '/v1_0/articles/' + articleId
  })
/**
 * 收藏文章
 */
export const addCollect = (target) =>
  request({
    method: 'post',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
/**
 * 取消收藏文章
 */
export const delCollect = (target) =>
  request({
    method: 'delete',
    url: `/v1_0/article/collections/${target}`
  })
  /**
 * 点赞
 */
export const addLike = target => request({
  method: 'post',
  url: '/v1_0/article/likings',
  data: {
    target
  }
})
/**
 * 取消点赞
 */
export const delLike = target => request({
  method: 'delete',
  url: `/v1_0/article/likings/${target}`
})
