<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">教师、教育行政干部法治素养提升平台</h3>
      </div>
      <div class="hydl">
        <h3 class="hydl_title">欢迎登录</h3>
      </div>
      <el-form-item prop="idCardNo">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="idCardNo"
          v-model="loginForm.idCardNo"
          placeholder="请输入身份证号"
          name="idCardNo"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="code" class="noborder">
        <div class="yzm_title">
          <el-input v-model="loginForm.code" placeholder="验证码" class="yzm"></el-input>
          <div id="szm" @click="szm"><img :src="imgUrl" alt=""></div>
        </div>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:285px;margin: 20px 32px;" @click.native.prevent="handleLogin">登录</el-button>
      <div class="wjmm"><a href="#/retrieve" class="forget">忘记密码</a></div>
    </el-form>
    <el-main>版权所有 教育部全国青少年普法网   京ICP备10216160号-14</el-main>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { get_uuid } from '@/utils/auth'
import {getCaptcha} from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/  
      // if (!validUsername(value)) {
      if (reg.test(value) == false) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    const validateCode= (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    
    return {
      imgUrl:'',
      loginForm: {
        idCardNo: '',
        password: '',
        code: '',
        uuid: ''
      },
      loginRules: {
        idCardNo: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      yzm:'',
    }
  },
  watch: {
    $route: {
      handler: function(route) { 
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleHistory(){
      this.$router.push({name:'retrieve'})
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
          .catch(() => {
            this.$message({
              message: JSON.parse(sessionStorage.getItem('loginStatus')).message,
              type: 'warning'
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    szm(){
      this.$data.loginForm.uuid = get_uuid()
      getCaptcha({ uuid: this.$data.loginForm.uuid }).then(response => {
        this.$data.imgUrl = 'https://hainantraining.qspfwadmin.com/login/getCaptcha?uuid=' + this.$data.loginForm.uuid
        resolve(data)
      }).catch(error => {
      })
    }
  },
  created(){
    localStorage.clear()
    this.$data.loginForm.uuid = get_uuid()
    getCaptcha({ uuid: this.$data.loginForm.uuid }).then(response => {
      this.$data.imgUrl = 'https://hainantraining.qspfwadmin.com/login/getCaptcha?uuid=' + this.$data.loginForm.uuid
      resolve(data)
    }).catch(error => {
      // reject(error)
    })
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.wjmm{
  text-align: center;
  padding-bottom: 10px;
}
.forget{
  font-size: 12px;
  color: #337DF7;
}
.yzm_title{
  width: 285px;
  margin: 0 auto;
}
.yzm{
  background: #283443;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 60%!important;
}
.el-main {
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 50px;
  position: fixed;
  font-size: 12px;
  bottom: 20px;
  left: calc(50% - 175px);

  font-size: 12px;
  // color: #999999;
}
#szm{
  float: right;
  width: 34%;
  border: 1px solid #ccc;
  height: 42px;
  background: #283443;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #ccc;
  text-align: center;
  line-height: 42px;
  font-family: "Adobe Gothic Std B";
  img{
    width: 100%;
    height: 100%;  
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 80%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: #000;
      // height: 47px;
      caret-color: #000;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    color: #454545;
    .el-form-item__content {
        width: 285px;
        height: 44px;
        border: 1px solid rgba(25, 21, 21, 0.1);
        line-height: 40px;
        position: relative;
        font-size: 14px;
        margin: 0 auto;
    }
  }
  .noborder {
    .el-form-item__content {
      border: 0px solid rgba(25, 21, 21, 0.1);
  }
  }
}
</style>

<style lang="scss" scoped>
$bg:#8addff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('../../assets/image/loginBg1.png');
  background-size: calc(100% + 360px) calc(100% + 800px);
  background-repeat: no-repeat;
  background-position: -180px -400px;
  overflow: hidden;

  .login-form {
    position: relative;
    // width: 350px;
    /* max-width: 100%; */
    /* padding: 12% 0px 0; */
    margin-left: 68%;
    /* overflow: hidden; */
    margin-top: 350px;
    width: 348px;
    // height: 325px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 4px 8px 0px rgba(230,230,230,0.5);
    border-radius: 3px;
    position: relative;
    &::before{
      content: '';
      height: 200%;
      position: absolute;
      left: -280%;
      top: -66%;
      width: 250%;
      background-image: url('../../assets/image/lgin.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .hydl{
    width:100%;
    font-size:20px;
    font-family: '59--Regular';
    text-align: center;
    font-weight:400;
    color:rgba(87,148,255,1);
    padding-bottom: 10px;
    h3{
      margin: 0;
      letter-spacing: 2px;
    }
  }
  .title-container {
    position: relative;
    top: -30px;

    .title {
      font-size: 20px;
      // color: $light_gray;
      margin: 0px auto 10px auto;
      font-family: 'Adobe Heiti Std R';
      font-weight:normal;
      color:rgba(255,255,255,1);
      line-height:17px;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
