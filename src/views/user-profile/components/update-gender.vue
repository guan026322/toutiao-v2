<template>
  <div class="update-gender">
    <!-- 选择器 -->
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @change="onChange"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  // 组件名称
  name: 'UpdateGender',
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onChange(picker, value, index) {
      this.gender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const gender = this.gender
        await updateUserProfile({
          gender
        })
        // 更新视图
        this.$emit('input', gender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
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

<style scoped lang="less"></style>
