<template>
  <div class="retieve">
    <div class="logo">
      <h3>海南省中小学教师培训平台</h3>
      <div class="avatar-wrapper">
        <img src="@/assets/image/pp.png" class="user-avatar">
        <router-link to='/login' class="nav-link">
          <span style="font-size: 12px;line-height: 50px;margin-right: 20px;color:#fff">登录</span>
        </router-link>
      </div>
    </div>
    <div class="headss">
      <div>
        <span>找回密码</span>
      </div>
    </div>
    
    <div class="hm">
      <div class="sf">
        <el-steps :active="1" align-center style="width: 670px;margin: 0 auto;">
          <el-step title="身份验证" description=""></el-step>
          <el-step title="设置新密码" description=""></el-step>
          <el-step title="完成" description=""></el-step>
        </el-steps>
      </div>
      <div style="font-size: 14px;color: #333333;margin-left: 292px;margin-bottom: 26px">请输入重置密码的手机号</div>
      <div style="font-size: 14px;color: #333333;margin-left: 292px;margin-bottom: 24px">
        手机号
        <el-input style="width: 250px;height: 39px;margin-left: 26px" v-model="input" placeholder="请输入手机号"></el-input>
      </div>
      <div style="font-size: 14px;color: #333333;margin-left: 292px;">
        验证码
        <el-input style="width: 120px;height: 39px;margin-left: 26px" v-model="yzm" placeholder="请输入验证码"></el-input>
        <el-button v-show="show" style="margin-left: 14px;width: 112px;" @click="getCode">{{title}}</el-button>
        <el-button v-show="!show" style="margin-left: 14px;width: 112px;" @click="getCode" disabled="">重新发送({{count}}s)</el-button>
      </div>
      <!-- <div style="text-align:center;font-size: 14px;line-height: 66px">提示:{{ts}}</div> -->
      <el-button type="primary" style="width: 225px;margin:30px auto 0;display: block" @click="handleNext">下一步</el-button>
    </div>
    <el-main>版权所有 教育部全国青少年普法网   京ICP备10216160号-14</el-main>
  </div>
</template>

<script>
import axios from 'axios'
import {baseURL} from '@/utils/constant'
import qs from 'qs'
  export default {
    name: 'retrieve',
    data(){
      return{
        input:'',
        yzm:'',
        ts:'',
        title: '发送验证码',
        show: true,
        count: '',
        timer: null,
      }
    },
    computed: {

    },
    methods: {
      handleNext(){
        // this.$router.push({path:'/password'})
        let _this = this
        axios.get(baseURL + '/SMS/verifySMSCode', {
          params: {
            mobile: _this.input,
            code: _this.yzm
          }
        })
        .then(function (response) { 
          if(response.data.status === '0'){
            _this.$router.push({path:'/password?mobile=' + _this.input})
          }else{
            _this.$message({
              message: response.data.message,
              type: 'warning'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      getCode(){
        let _this = this
        const partten = /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i
        if(partten.test(_this.input)){
          const TIME_COUNT = 30
          if (!_this.timer) {
           _this.count = TIME_COUNT
           _this.show = false
           _this.timer = setInterval(() => {
           if (_this.count > 0 && _this.count <= TIME_COUNT) {
             _this.count--
            } else {
             _this.show = true
             clearInterval(_this.timer);
             _this.timer = null
              _this.title = '重新发送'
            }
           }, 1000)
          }
          axios.post(baseURL + '/SMS/sendSMSCode', qs.stringify({
              mobile: _this.input
            }))
          .then(function (response) { 
            if(response.data.status === '0'){
              _this.$message({
                message: '验证码发送成功',
                type: 'success'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        }else{
          _this.$message.error('您输入的手机号码格式有误，请重新输入.')
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-step__icon{
    background: #DCDCDC!important;
    border: none!important;
    color: #fff;
  }
  .el-step__head.is-finish {
      color: #fff;
  }
  .el-step__head.is-finish .el-step__icon{
      background: #008EFF!important;
      border-color: none;
  }
  .el-step__title {
    font-weight: 700;
    color: #303133;
  }
  .el-step__title.is-finish {
    color: #303133;
  }
</style>

<style lang="scss" scoped>
  
  .retieve{
    width: 100%;
  }
  .logo{
    background: #022541;
    color: #ffffff;
    height: 50px;
    padding: 0 100px;
    h3{
      line-height: 50px;
      float: left;
      margin: 0;
    }
  }
  .avatar-wrapper {
    float: right;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 8px;
        }
      }
  .headss{
    width: 900px;
    margin: 100px auto 0;
    span{
      font-size: 18px;
      font-weight: 700;
    }
  }
  .sf{
    width: 900px;
    margin: 0 auto;
    padding-top: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 50px;
    padding-bottom: 20px;
  }
  .hm{
    width: 900px;
    background:rgba(255, 255, 255, 1);
    // height: 383px;
    margin: 50px auto 0;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(19,36,50,0.2);
    border-radius:5px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 50px;
    margin-top: 270px;
    font-size: 12px;
    color: #999999;
  }
</style>
