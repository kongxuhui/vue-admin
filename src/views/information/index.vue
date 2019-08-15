<template>
  <div class="dashboard-container">
    <div>
      <div class="dashboard-text">账号信息</div>
    </div>
    <div class="dahe">
      <div style="display: flex;margin-top: 80px;">
        <div style="text-align: right;width: 74px;font-size: 13px">真实姓名：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;">{{info.loginName}}</div>
      </div>
      <div style="display: flex;margin-top: 32px;">
        <div style="text-align: right;width: 74px;font-size: 13px">所在学校：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;">{{info.schoolName}}</div>
      </div>
      <div style="display: flex;margin-top: 32px;">
        <div style="text-align: right;width: 74px;font-size: 13px">身份：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;">{{info.role}}</div>
      </div>
      <div style="display: flex;margin-top: 32px;">
        <div style="text-align: right;width: 74px;font-size: 13px">身份证：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;">{{info.idCardNo}}</div>
      </div>
      <div style="display: flex;margin-top: 32px;">
        <div style="text-align: right;width: 74px;font-size: 13px;line-height: 40px">手机号：</div>
        <div style="width: 226px;margin-left: 40px;text-align: left;font-size: 13px;"><el-input style="height: 40px;" v-model="input" placeholder="请输入内容"></el-input></div>
      </div>
    </div>
    <!-- <div style="text-align: center;margin-top: 27px">提示{{}}</div> -->
    <el-button style="margin: 88px auto 0;display: block;width: 220px;" type="primary" @click="handleSubmit">保存</el-button>
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
        info: {}
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      handleSubmit(){
        let _this = this
        const partten = /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i
        if(partten.test(_this.input)){
          axios.post(baseURL + '/login/udpateMobile', qs.stringify({
              token: _this.$store.state.user.token,
              mobile: _this.input
            }))
          .then(function (response) {
            if(response.data.status == '-1'){
              _this.$message({
                message: '手机号重复，请确认',
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
            this.reload()
          })
        }else{
          _this.$message.error('请输入11位正确格式的手机号码')
        }
      }
    },
    created(){
      let _this = this
      axios.get(baseURL + '/train/getUserInfo', {
        params: {
          token: _this.$store.state.user.token
        }
      })
      .then(function (response) {
        _this.$data.info = response.data.data
        _this.$data.input = _this.$data.info.mobile
      })
      .catch(function (error) {
        console.log(error)
      })
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
