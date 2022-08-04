<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onProfile"
    />
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  // 组件名称
  name: 'UpdateName',
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: String,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      message: this.value
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onProfile() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const message = this.message
        if (!message.length) {
          return this.$toast('昵称不能为空')
        }
        await updateUserProfile({
          name: message
        })
        // 更新视图
        this.$emit('input', message)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        if (err.response && err.response.status === 409) {
          return this.$toast.fail('用户名已存在')
        }
        this.$toast.fail('更新失败')
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
