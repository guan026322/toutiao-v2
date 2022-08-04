<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
-->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResShow = false"
      />
      <!-- "onCancel" 点击取消按钮，触发cancel事件
    "onSearch" 输入搜索关键字，敲回车之后触发搜索事件
    show-action  显示搜索框右侧取消按钮-->
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-res v-if="isResShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <!-- 搜索联想 -->
    <search-sugg
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-sugg>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-hist
      v-else
      :search-hist="searchHist"
      @clear-search-hist="searchHist = []"
      @search="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHist from './components/search-hist.vue'
import SearchRes from './components/search-res.vue'
import SearchSugg from './components/search-sugg.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isResShow: false,
      searchHist: getItem('TOUTIAO_SEARCH_HIST')
        ? getItem('TOUTIAO_SEARCH_HIST')
        : [] // 搜索的历史记录数据
    }
  },

  components: { SearchHist, SearchSugg, SearchRes },

  watch: {
    searchHist(val) {
      // 同步到本地存储
      setItem('TOUTIAO_SEARCH_HIST', val)
    }
  },

  methods: {
    // 事件函数
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val // 将搜索框中的内容改为传递过来的内容
      this.isResShow = true
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const i = this.searchHist.indexOf(val)
      if (i !== -1) {
        // 如果重复，则先删除，然后再头部再添加\
        this.searchHist.splice(i, 1)
      }
      this.searchHist.unshift(val) // 在头部添加
      // 渲染搜索结果
      this.isResShow = true
    },
    onCancel() {
      this.$router.back() // 返回上一页（首页）
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
