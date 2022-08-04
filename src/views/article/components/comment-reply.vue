<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <template #left>
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment"></comment-item>

      <van-cell title="全部回复" />

      <!-- 评论的回复列表 -->
      <comment-list :source="comment.com_id" type="c" :list="commentList" />
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /发布评论 -->
    <!-- 发布评论的弹层，视频里面没有提到，自行补充 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        @post-success="onPostSuc"
        :articleId="articleId"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuc(data) {
      console.log(123, data)

      // 更新回复的数量
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.reply_count++

      // 关闭弹层
      this.isPostShow = false

      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
</style>
