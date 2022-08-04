<template>
  <div class="search-sugg">
    <van-cell
      v-for="(item, i) in sugg"
      :key="i"
      icon="search"
      @click="$emit('search', item)"
    >
    <span slot="title" v-html="high(item)"></span>
    </van-cell>
    <!--双花括号绑定会直按输山纯文本内容-->
    <!--<div>{{ htmlstr }} </div> -->
    <!--使川v-htm1指令可以绑定淮装带有HTL标签的字符带-->
    <!--<div v-html="htmlstr"></div> -->
  </div>
</template>

<script>
import { getSearchSugg } from '@/api/search'
// 防抖处理 lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  name: 'SearchSugg',
  data() {
    return {
      sugg: [] // 联想建议数据列表
      // htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 只要searchText发生变化，我们都需要发起请求，显示最新的联想建议
    // (联想建议会随着输入的内容变化而变化），所以我们需要监听searchText的变化，那么就需要使用watch

    searchText: {
      // 当 searchText 发生改变的时候就会调用 handler 函数
      // 注意：handler 函数名称是固定的
      // 监视的处理函数
      // handler(val) {
      //   // console.log(val)
      //   this.loadSearchSugg(val)
      // },

      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (val) {
        this.loadSearchSugg(val)
      }, 200),
      // 首次监视触发（如果不添加这个属性，那么handler无法监听到第一次searchText的变化）
      immediate: true // immediate立即的意思
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    async loadSearchSugg(q) {
      try {
        const res = await getSearchSugg(q)
        console.log(res)
        // 补充过滤返回空值的处理，视频中没有。
        // 后台返回的列表中有的项为空，导致展示一个空的项，所以此处过滤掉这种数据
        this.sugg = res.data.data.options.filter((it) => it)
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    high(item) {
      const highStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式//中可的内容都会当作儿！学符米使用，而不是数据变量
      // 果需要根据数据变量动态的创建正则表达式，则手动new RegExp
      // RegExp正则表达式构造啊数
      // 参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数2：匹模式，装与到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, highStr)
    }
  }
}
</script>
<style scoped lang="less">
.search-sugg{
  /deep/ span.active{
    color: #3296fa
  }
}
</style>
