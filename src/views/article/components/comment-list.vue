<template>
<!-- list 只有在可视范围内才会检查滚动位置触发 onload -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    error-text="加载失败，请点击重试"
    :error.sync="error"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, i) in list"
      :key="i"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  data() {
    return {
      //   list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记 (分页，从哪开始取这页数据)
      limit: 10, // (分页，每页多少条)
      error: false
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // default，默认值，如果是数组或者对象，需要通过函数的形式返回
      default: () => []
    },
    // 增加type参数，默认值为a，取值范围只能是a或者c
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator(val) {
        return ['a', 'c'].includes(val)
      },
      default: 'a'
    }
  },

  created() {
    this.loading = true
    // 页面一加载就获取评论数量
    this.onLoad()
  },
  components: { CommentItem },

  computed: {},

  mounted() {},

  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const res = await getComment({
          //   type: 'a', //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          type: this.type,
          source: this.source.toString(), // 去被拼接上的双引号
          offset: this.offset, // 获取评论数据的偏移量(页数)
          limit: this.limit // 获取的评论数据个数
        })

        // 2. 将数据添加到列表中
        const result = res.data.data
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...result.results)

        // 3. 将 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (result.results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = res.data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
        // 将获取到文章评论数据后传递给父组件
        this.$emit('onload-success', res.data.data)
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style scoped></style>
