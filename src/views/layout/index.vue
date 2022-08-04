<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->
    <!--
      route: 开启路由模式，路由模式下会匹配路径和标签的to属性，并自动选中标签
     -->
    <van-tabbar route class="layout-tabbar">
      <van-tabbar-item replace :to="{name: 'home'}">
        <template #icon>
          <i class="icon icon-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa">
        <template #icon>
          <i class="icon icon-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video">
        <template #icon>
          <i class="icon icon-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my">
        <template #icon>
          <i class="icon icon-wode"></i>
        </template>
        <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style scoped lang="less">
 .layout-container {
  .layout-tabbar {
    i.icon {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
