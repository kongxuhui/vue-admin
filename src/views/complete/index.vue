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
        <el-steps :active="3" align-center style="width: 670px;margin: 0 auto;">
          <el-step title="身份验证" description=""></el-step>
          <el-step title="设置新密码" description=""></el-step>
          <el-step title="完成" description=""></el-step>
          <!--      <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>-->
        </el-steps>
      </div>
      <div style="line-height: 150px;text-align: center;"><img style="vertical-align: middle;" src="@/assets/image/yes.png" alt=""> &nbsp;&nbsp;&nbsp;密码重置成功</div>
      <el-button type="primary" style="width: 225px;margin:30px auto 0;display: block" @click="handleLogin">登录</el-button>
    </div>
    <el-main>版权所有 教育部全国青少年普法网   京ICP备10216160号-14</el-main>
  </div>
</template>

<script>

  export default {
    name: 'retieve',
    data(){
      return{
        input:'',
        yzm:'',
        ts:''
      }
    },
    computed: {

    },
    methods: {
      handleLogin(){
        this.$router.push({ path: '/login' })
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
