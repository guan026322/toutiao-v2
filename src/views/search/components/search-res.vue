<template>
  <div class="search-res">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，请重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(art, i) in list" :key="i" :title="art.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchRes } from '@/api/search'
export default {
  name: 'SearchRes',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },

  props: {
    searchText: {
      type: String,
      require: true
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        // 1. 请求获取数据
        const res = await getSearchRes({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 搜索关键字
        })
        // 2. 将数据添加到列表中
        const result = res.data.data
        this.list.push(...result.results)

        // 3. 设置加载状态结束
        this.loading = false

        // 4. 判断数据是否加载完毕
        if (result.results.length) {
          this.page++ // 如果有，更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true

        // 加载失败了 loading 也要关闭
        this.loading = false
      }
    }
  }
}
</script>
<style scoped></style>
