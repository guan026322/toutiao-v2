<template>
  <!--
  Cell 单元格的 to 属性和 VueRouter 中的 RouterLink 导航组件的 to 属性用法是一样的
    用法参考链接：https://router.vuejs.org/zh/api/#to
  :to="'article/' + article.art_id"
  :to="`article/${article.art_id}`"
 -->
 <!-- //点击某个文章，跳转到文章详情界面（上边两种写法也可以） -->
  <van-cell class="article-item" :to="{name: 'article', params: { articleId: article.art_id}}">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- type=0就是没有图片，1就是一张图片，3就是三张图片 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, i) in article.cover.images"
          :key="i"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      // 文章列表项界面需要接收文章对象数据，根据传递过来的文章数据进行显示
      type: Object,
      required: true
    }
  },
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
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    //.cover-item:last-child : 选择最后一个子元素
    //.cover-item:not(:last-child) : 选择非最后一个子元素
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        //嵌套语法里&代表父元素.cover-item
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
