<template>
  <div class="home-container">
    <!-- 导航栏 原本只能通过title属性设置一个导航栏的标题，现在添加一个搜索按钮，需要插槽-->
    <!-- 这样的效果就是将原本标题的位置，换成一个按钮进行显示 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!--增加一个名字为title的插槽 -->
      <template #title>
        <van-button
          class="search-btn"
          type="info"
          round
          size="small"
          icon="search"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 视频列表 -->
    <!--
      通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过animated属性可以开启切换标签内容时的转场动画
      通过swipeable属性可以开启滑动切换标签页
     -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="(channel, i) in channels" :key="i" :title="channel.name">
        <!-- 视频的文章列表 -->
        <article-list :channel="channel"></article-list>
        <!-- \视频的文章列表 -->
      </van-tab>
      <!-- placeholder 占位符 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isShow = true">
        <i class="icon icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 视频列表 -->
    <!-- 视频编辑 -->
    <van-popup
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 传递channels 传递active高亮索引 定义update-active事件-->
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
    <!-- /视频编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 2,
      channels: [], // 视频列表
      isShow: false // 这里我们先设置为 true 就能看到弹窗的页面了
    }
  },

  created() {
    this.loadChannels()
  },

  components: {
    ArticleList,
    ChannelEdit
  },

  computed: {
    ...mapState(['user'])
  },

  mounted() {},

  methods: {
    async loadChannels() {
      try {
        let channels = []
        const loadChannels = getItem('TOUTIAO_CHANNELS')
        if (this.user || !loadChannels) {
          // 已登录，请求获取线上的频道数据
          // 这时获取到的是“登录用户的频道列表”
          // 登录 或者 未登录本地没有存储 获取后端数据
          const res = await getUserChannels()
          channels = res.data.data.channels
        } else {
          // 未登录
          // 未登录并且本地有数据
          // const loadChannels = getItem('TOUTIAO_CHANNELS')
          channels = loadChannels
          // if (loadChannels) {
          //   // 有本地频道数据，则使用
          //   channels = loadChannels
          // } else {
          //   // 没有本地频道数据，则请求获取默认推荐的频道列表
          //   const res = await getUserChannels() // 这时获取到的是“默认的频道列表”
          //   channels = res.data.data.channels
          // }
        }
        // 将数据更新到组件中
        this.channels = channels
      } catch (err) {
        console.log(err)
        // this.$toast('获取用户频道失败')
        this.$toast('获取频道列表数据失败')
      }
    },
    onUpdateActive(i, isChennelEditShow = true) {
      // 更新激活的频道项
      this.active = i
      // 关闭编辑频道弹层
      this.isChennelEditShow = isChennelEditShow
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  padding-top: 175px;
  padding-bottom: 100px;
  /* 视频问题 */
  /* #这里需要添加deep，这个标签样式并不是我们自己添加的标签所带的样式，所以需要添加/deep/或者全局控制，只有是自己添加的标签才可以直接在scoped中控制样式 */
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
//样式只能作用于根组件，我们想给子组件设置样式，就需要使用深度操作符：/deep/，或者添加全局样式

//什么情况下要添加/deep/，就去看渲染的时候，这个标签有没有data-v-5954443c这个标记，没有就需要添加/deep/
/deep/ .channel-tabs {
  .van-tabs__wrap {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
    // width: 100vw;
    // overflow-x: auto;
  }

  .van-tab {
    //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    color: #333333;
  }

  .van-tabs__nav {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    padding-bottom: 0;
  }

  .van-tabs__line {
    //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
}
.placeholder {
  //占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
  flex-shrink: 0; //此元素不参与flex的
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: '';
    position: absolute;
    left: 0;
    width: 1px; //在模拟器上看不到（手机上没问题），如果想看到改为2px
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
