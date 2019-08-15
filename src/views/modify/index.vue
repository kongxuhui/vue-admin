<template>
  <div class="dashboard-container">
    <div>
      <div class="dashboard-text">修改密码</div>
    </div>
    <div class="dahe">
      <div style="display: flex;margin-top: 80px;">
        <div style="text-align: right;width: 74px;font-size: 13px">用户名：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;">{{name}}</div>
      </div>
      <div style="display: flex;margin-top: 32px;">
        <div style="text-align: right;width: 74px;font-size: 13px;line-height: 40px">原始密码：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;"><el-input style="height: 40px;" placeholder="请输入旧密码" v-model="input" show-password></el-input></div>
      </div>
      <div style="display: flex;margin-top: 32px;">
        <div style="text-align: right;width: 74px;font-size: 13px;line-height: 40px">新密码：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;"><el-input style="height: 40px;" placeholder="请输入新密码(6-16位)" v-model="inputs" show-password></el-input></div>
      </div>
    </div>
    <!-- <div style="text-align: center;margin-top: 27px">提示{{}}</div> -->
    <el-button style="margin: 0 auto;display: block;margin-top: 27px;width: 140px;" @click="handleUpdatePwd">确定</el-button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import {baseURL, TokenKey} from '@/utils/constant'
  import {delCookid} from '@/utils/auth'
  import qs from 'qs'

  export default {
    name: 'Dashboard',
    data(){
      return {
        input:'',
        inputs:''
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods:{
      handleUpdatePwd(){
        let _this = this
        const partten = /^[\w_-]{6,16}$/
        if(partten.test(_this.input)){
          axios.post(baseURL + '/login/updatePassword', qs.stringify({
              token: _this.$store.state.user.token,
              oldPassword: _this.input,
              newPassword: _this.inputs
            }))
          .then(function (response) {
            if(response.data.status != '0'){
              _this.$message({
                message: response.data.message,
                type: 'warning'
              })
            }else{
              _this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          })
          .catch(function (error) {
            localStorage.clear()
            delCookid(TokenKey)
            _this.reload()
          })
        }else{
          _this.$message.error('密码格式错误，请重新输入')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      min-height: calc(100vh - 160px);
      border-top-left-radius: 0px;
      position: relative;
    }
    &-text {
      font-size: 16px;
      line-height: 36px;
    }
  }
  .dashboard-text{
    width: 100px;
    position: absolute;
    top: -30px;
    left: 0;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    color: #33A5FF;
  }
  .dahe{
    width: 370px;
    margin: 0 auto;
  }
</style>
