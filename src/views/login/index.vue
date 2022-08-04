<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- from表单 -->
    <!-- 登录表单 -->
    <!--
      表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit
     -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        maxlength="11"
        type="number"
        :rules="userRules.mobile"
      >
        <!-- 通过插槽处理自定义图标 -->
        <i slot="left-icon" class="icon icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type="number"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="userRules.code"
      >
        <i slot="left-icon" class="icon icon-yanzhengma"></i>
        <template #button>
          <!-- 新版本插槽的写法 ， 相当于slot="button" -->
          <!-- time: 倒计时时间 -->
          <!--time属性表示倒计时总时长，单位为毫秒 ： 1000*5 表示5s通过format属性设置倒计时文本的格式 ： ss s ，
          ss表示时间格式只有秒，s表示字符格式finish是完成事件：倒计时结束时会触发-->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            type="default"
            round
            size="small"
            class="send-sms-btn"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      console.log('submit')
      //   增加 toast 交互提示
      this.$toast.loading({
        duration: 0, // 持续时间，默认时间2s，0表示持续展示不停止，直到成功或失败
        forbidClick: true, // 是否禁止背景点击（forbid：禁止）
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(this.user)
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')

        // 登录成功，跳转回原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败，请稍候重试', err)
          this.$toast.fail('登录失败，请稍候重试')
        }
      }
    },
    async onSendSms() {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        // 这里为啥添加await，是因为validate返回一个Promise
        // 参数是van-field的name
        await this.$refs.loginForm.validate('mobile') // 调用validate手动校验
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err) // 这个写法其实就是在执行完log，然后结束代码执行，后续代码不执行
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        console.log(err)
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
