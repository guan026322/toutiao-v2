<template>
  <van-button
    :icon="isCollected ? 'star' : 'star-o'"
    :class="{ collected: isCollected }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  data() {
    return {
      loading: false
    }
  },
  model: {
    prop: 'isCollected',
    event: 'update.is_collected'
  },
  props: {
    isCollected: {
      type: Boolean,
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
    async onCollect() {
      // 开始请求
      this.loading = true
      try {
        // 是否收藏
        if (this.isCollected) {
          // 父组件 传递articleId
          await delCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('update.is_collected', !this.isCollected)
        // 自定义事件修改数据并不是立即的，所以这里也是!this.isCollected
        this.$toast.success(this.isCollected ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      // 请求结束
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
