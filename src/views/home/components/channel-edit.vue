<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        round
        size="mini"
        plain
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, i) in myChannels"
        :key="i"
        class="grid-item"
        @click="onMyChannelClick(channel, i)"
      >
        <!-- v-bind:class  语法
      一个对象，对象中的 key 表示要作用的 css 类名
      对象中的 value 要计算出布尔值
      true，则作用该类名
      false，不作用类名 -->
        <van-icon
          name="clear"
          slot="icon"
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
        ></van-icon>
        <span slot="text" :class="{ active: i === active }" class="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(channel, i) in recomChannels"
        :key="i"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="onAddChannel(channel)"
      />
      <!-- 1.添加点击事件 -->
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAll, addUser, deleteUser } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0] // 固定频道，不允许删除
    }
  },

  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },

  created() {
    this.loadAll()
  },

  methods: {
    // 加载所有频道
    async loadAll() {
      try {
        const res = await getAll()
        this.allChannels = res.data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // 点击添加频道
    async onAddChannel(channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel)
      if (this.user) {
        try {
          // 已登录, 数据存储到线上
          await addUser({
            id: channel.id, // 频道 id
            seq: this.myChannels.length // 频道的 序号
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 2.定义事件处理函数
    // 点击我的频道
    onMyChannelClick(channel, i) {
      if (this.isEdit) {
        // 编辑状态，删除频道
        // 1. 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 2. 删除频道项
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(i, 1)
        // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1：要删除的元素的开始索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (i <= this.active) {
          // 让激活频道的索引 - 1
          // 当前频道被删除之后，上一个频道高亮，并且不关闭弹出层
          this.$emit('update-active', this.active - 1, true)

          // 4. 处理持久化
          this.deleteChannel(channel)
        }
      } else {
        // 非编辑状态，切换频道
        this.$emit('update-active', i, false)
      } // 4.通过子向父传值，通知父组件改变当前高亮的视频项
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUser(channel.id)
        } else {
          // 未登录，将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  },
  computed: {
    // 获取user
    ...mapState(['user']),
    recomChannels() {
      // 遍历全部频道每一项，如果这一项 不在 我的频道中，那么该项是推荐频道
      return this.allChannels.filter(
        (channel) => !this.myChannels.find((it) => it.id === channel.id)
      )
    }
    // 实现方案2
    // recomChannels() {
    //   const rechannels = []
    //   this.allChannels.forEach((channel) => {
    //     if (this.myChannels.findIndex(it => it.id === channel.id) === -1) { return rechannels.push(channel) }
    //   })
    //   return rechannels
    // }
  }
}
</script>
<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}
/deep/ .grid-item {
  width: 160px;
  height: 86px;
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
    /* 在.grid-item 新增这一行代码 去除定位设置 */
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}

/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      //   .van-grid-item__text {
      //     margin-top: 0;
      //   }
    }
  }
}
/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
</style>
