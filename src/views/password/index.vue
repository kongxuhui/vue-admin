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
        <el-steps :active="2" align-center style="width: 670px;margin: 0 auto;">
          <el-step title="身份验证" description=""></el-step>
          <el-step title="设置新密码" description=""></el-step>
          <el-step title="完成" description=""></el-step>
        </el-steps>
      </div>
      <div style="font-size: 14px;color: #333333;margin-left: 292px;margin-bottom: 24px;">
        新密码
        <el-input style="width: 229px;height: 39px;margin-left: 26px;margin-right:10px;" v-model="input" placeholder="请输入新密码" show-password></el-input>
        <span style="color: #999">6~16个字符，区分大小写</span>
      </div>
      <div style="font-size: 14px;color: #333333;margin-left: 278px;margin-bottom: 24px;margin-right:10px;">
        确认密码
        <el-input style="width: 229px;height: 39px;margin-left: 26px" v-model="inputs" placeholder="请再次填写密码" show-password></el-input>
        <span style="color: #999">请再次填写密码</span>
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
    name: 'retieve',
    data(){
      return{
        input:'',
        inputs:'',
        ts:''
      }
    },
    computed: {

    },
    methods: {
      handleNext(){
        let _this = this
              // _this.$router.push({path:'/complete'})

        if(_this.input !== _this.inputs){
          _this.$message({
            message: '两次填写的密码不一致,请重新输入',
            type: 'warning'
          })
        }else if(_this.input == ''){
          _this.$message({
            message: '密码不能为空,请输入密码',
            type: 'warning'
          })
        }else{
          axios.post(baseURL + '/login/resetPassword', qs.stringify({
              mobile: _this.$route.query.mobile,
              password: _this.inputs
            }))
          .then(function (response) {
            if(response.data.status === '0'){
              _this.$router.push({path:'/complete'})
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
    overflow: hidden;
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
