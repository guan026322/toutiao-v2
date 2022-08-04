<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refresh"
    >
      <!--  父子组件都需要修改error的值，所以需要添加sync -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(article, i) in list"
          :key="i"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      // 接收父组件传递过来的数据channel
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      error: false, // 是否加载失败
      timestamp: null, // 请求加载下一页的时间戳
      isLoading: false, // 控制下拉刷新的失败状态
      refresh: ''
    }
  },

  components: {
    ArticleItem
  },

  computed: {},

  mounted() {},

  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      console.log('onLoad')
      // 异步更新数据
      try {
        // 1. 请求获取数据
        const res = await getArticles({
          channel_id: this.channel.id, // 频道 id
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          // 时间戳，请求最新数据传当前的时间戳，请求某一刻的数据就传递具体的一个时间戳
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })
        // 2. 把请求结果数据放到 list 数组中
        const result = res.data.data
        this.list.push(...result.results)

        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false

        // 4. 判断数据是否全部加载完成
        if (result.results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.data.pre_timestamp
        } else {
          // 如果没有数据了，把 finished 设置为 true，之后不再触发加载更多
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const res = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 2. 将数据追加到列表的顶部
        const result = res.data.data
        this.list.unshift(...result.results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isLoading = false
        // 更新下拉刷新成功提示的文本
        this.refresh = `刷新成功，更新了${result.results.length}条数据`
      } catch (err) {
        this.refresh = '刷新失败'
        this.isLoading = false // 关闭下拉刷新的 loading 状态
      }
    }
  }
}
</script>
<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
