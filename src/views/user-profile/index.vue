<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onChange" />
    <!-- 个人信息 -->
    <van-cell
      title="头像"
      is-link
      class="photo-cell"
      center
      @click="$refs.file.click()"
    >
      <van-image round class="avatar" fit="cover" :src="user.photo" />
    </van-cell>
    <!-- 编辑头像弹层 -->
    <van-popup v-model="isPhotoShow" style="height: 100%" position="bottom">
      <update-photo
        :img="img"
        @close="isPhotoShow = false"
        v-if="isPhotoShow"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 编辑头像弹层 -->
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isNameShow = true"
    />
    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isNameShow"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <update-name
        @close="isNameShow = false"
        v-model="user.name"
        v-if="isNameShow"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isPGenderShow = true"
    />
    <!-- 编辑性别弹层 -->
    <van-popup v-model="isPGenderShow" position="bottom">
      <update-gender
        @close="isPGenderShow = false"
        v-model="user.gender"
        v-if="isPGenderShow"
      />
    </van-popup>
    <!-- 编辑性别弹层 -->
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayShow = true"
    />
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <update-birthday
        v-model="user.birthday"
        @close="isBirthdayShow = false"
        v-if="isBirthdayShow"
      />
    </van-popup>
    <!-- 编辑生日弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import updateGender from './components/update-gender.vue'
import updateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  // 组件名称
  name: 'UserProfile',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    UpdateName,
    updateGender,
    updateBirthday,
    UpdatePhoto
  },
  // 组件状态值
  data() {
    return {
      user: {}, // 个人信息
      isNameShow: false,
      isPGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async loadUserProfile() {
      try {
        const res = await getUserProfile()
        console.log(res)
        this.user = res.data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]

      // 通过调用 URL.createObjectURL(file) 来生成图片的一张缩略预览图
      this.img = window.URL.createObjectURL(file)

      // 基于文章对象获取 blob 数据
      // const data = window.IIRFilterNode.createObjectURL(file)
      // console.log(data)

      // 展示预览图片弹出层
      this.isPhotoShow = true

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.loadUserProfile()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
  .photo-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
