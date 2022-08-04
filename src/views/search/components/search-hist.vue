<template>
  <div class="search-hist">
    <!-- 历史记录 -->
    <!-- 注意 props中引用类型的数据只能修改，不能重新赋值（否则会造成父组件关联数据无法同步） -->
    <van-cell title="搜索历史">
      <!-- //如果isDeleteShow为true显示此模板 -->
      <div v-if="isDelShow">
        <!-- 子组件点击全部删除时触发事件clear-search-hist -->
        <span @click="$emit('clear-search-hist')">全部删除</span>
        <!-- //点击完成退出删除状态 -->
        <span @click="isDelShow = false">完成</span>
      </div>
      <!-- //如果isDeleteShow为false，则显示删除按钮。点击删除按钮将isDeleteShow变为true，进入删除状态 -->
      <van-icon name="delete" v-else @click="isDelShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, i) in searchHist"
      :key="i"
      :title="item"
      @click="onSearchItem(item, i)"
    >
      <van-icon name="close" v-show="isDelShow" />
    </van-cell>
  </div>
  <!-- /历史记录 -->
</template>

<script>
export default {
  name: 'SearchHist',
  data() {
    return {
      // 定义当前是否是删除状态
      isDelShow: false // 控制删除显示状态
    }
  },

  props: {
    searchHist: {
      type: Array,
      required: true
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    onSearchItem(item, i) {
      // 如果是删除状态，则执行删除操作
      if (this.isDelShow) {
        // 删除状态， 删除历史记录数据
        // eslint-disable-next-line vue/no-mutating-props
        this.searchHist.splice(i, 1)
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style scoped></style>
