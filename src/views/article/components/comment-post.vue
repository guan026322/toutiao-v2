<template>
  <!-- 发布评论 -->
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  // 组件名称
  name: 'CommentPost',
  // 组件参数 接收来自父组件的数据
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      message: ''
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      // 1.获取数据
      try {
        const res = await addComment({
          target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          // 文章id，对评论内容发表回复时，需要传此参数（如果只是评论文章，该参数为null）
          art_id: this.articleId ? this.articleId.toString() : null
        })
        console.log(res.data)
        // 关闭弹出层  （这两步在父组件中做）
        // 将发布内容显示到列表顶部（这两步在父组件中做）
        // 清空文本框
        this.message = ''
        this.$emit('post-success', res.data.data)

        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>
