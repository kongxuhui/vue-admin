<template>
  <div class="dashboard-container">
    <div class="min_title">
      <img src="@/assets/image/wanch.png" alt="">
      <span>{{title}} &nbsp; </span>
      <span>&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;&nbsp;{{content}}</span>
    </div>
    
    <div class="cyt">
        <div class="dashboard-text">章节练习</div>
      <p>章节练习不限次数，不计分</p>
      <p>题目数量：{{lianxi.sum}}道题</p>
      <p>当前已练习：{{lianxi.count}}次</p>
      <el-button class="cheng" type="primary" @click="handleExercises">开始练习</el-button>
    </div>
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
        inputs:'',
        lianxi: '',
        content: '',
        title: '',
      }
    },

    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods:{
      handleExercises(){
        let _this = this
        _this.$store.dispatch('app/showAnswerStart')
        _this.$router.push({path:'/home1/trainingTheme_3'})
      }
    },
    created(){
      this.title = sessionStorage.getItem('title')
      this.content = sessionStorage.getItem('content')
      let _this = this
      axios.get(baseURL + '/chapter/getPracticeCount/', {
        params: {
          token: _this.$store.state.user.token,
          eventId: sessionStorage.getItem('eventId'),
          columnId: sessionStorage.getItem('columnId'),
          chapterId: sessionStorage.getItem('chapterId')
        }
      })
      .then(function (response) {
        _this.lianxi = response.data.data
      })
      .catch(function (error) {
        localStorage.clear()
        delCookid(TokenKey)
        _this.reload()
      });
    }
  }

</script>

<style lang="scss" scoped>
.min_title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 30px;
    color: #000000;
    background:rgba(255,255,255,1);
    border:1px solid rgba(51,165,255,1);
    border-radius:5px;
    font-weight:400;
    img{
      width: 24px;
      vertical-align: middle;
      margin-right: 16px;
    }
  }
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .dashboard-text{
    font-size:16px;
    font-family:'PingFangSC-';
    font-weight:400;
    color:rgba(0,0,0,1);
    margin-left: -66px;
    // padding-left: 20px;
  }
  .cyt{
    justify-content: space-around;
    padding: 10px 100px 0;
    position: relative;
    min-height: 666px;
    // padding: 20px 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(51,165,255,1);
    border-radius:5px;
    margin-top: 20px;
    p{
      font-size: 14px;
      color: #0a0a0a;
      padding-top: 30px;
      letter-spacing: 2px;
    }
    .el-button{
      position: absolute;
      bottom: 200px;
      margin: 0 auto;
    }
  }
  .cheng{
    background-color: #FF6D33;
  }
</style>
