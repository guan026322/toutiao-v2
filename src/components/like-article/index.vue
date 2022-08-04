<template>
  <!-- isLiked===1的时候就是点赞 -->
  <van-button
    :icon="isLiked === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: isLiked === 1 }"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  data() {
    return {
      loading: false
    }
  },
  model: {
    prop: 'isLiked',
    event: 'update.is_liked'
  },
  props: {
    isLiked: {
      type: Number, // 点赞的数据是-1,0,1（点赞）这样的数据
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    async onLike() {
      // 开始请求
      this.loading = true
      try {
        let status = -1
        if (this.isLiked === 1) {
          // 已点赞，取消点赞
          await delLike(this.articleId)
        } else {
          // 没有点赞，添加点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('update.is_liked', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      // 请求结束
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.liked {
  :deep .van-icon {
    color: #e5645f;
  }
}
</style>
