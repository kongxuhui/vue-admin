<template>
  <div class="dashboard-container">
    <div class="min_title">
      <img src="@/assets/image/wanch.png" alt="">
      <span>{{title}} &nbsp; </span>
      <span>&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;&nbsp;{{content}}</span>
    </div>
    
    <div class="cyt">
        <div class="dashboard-text">章节测评</div>
      <div class="cyt_top">
        <p class="cyt_topText">为了保证能够取得满意的成绩，请先学习再进行测评！</p>
        <el-button class="pqxx" type="primary" plain @click="handleLearn">跑去学习</el-button>
      </div>
      <p>可尝试次数： <span>{{cishu}}</span>   次，取最高分作为最终成绩</p>
      <p>当前最高成绩：  <span>{{fenshu}}</span>  分</p>
      <p>满分：100分  </p>
      <el-button class="kscp" type="primary" @click="handleExercises">开始测评</el-button>
    </div>


  <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible_1"
      title="提示"
      :show-close="false"
      width="500px"
      center>
      <div class="bcdf">
        <p>答题次数已达上限</p>
        <p>请您进入其他章节进行答题</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <router-link to='/home1/trainingTheme_2/chapterExercises' class="nav-link"> -->
      <!-- <el-button class="fhzjcp" type="primary" @click="handleQuitCp">确定退出</el-button></router-link> -->
      <el-button size="medium" type="primary" @click="dialogVisible_1 = false">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import {baseURL, TokenKey} from '@/utils/constant'
  import {delCookid} from '@/utils/auth'

  export default {
    name: 'Dashboard',
    data(){
      return {
        dialogVisible_1: false,
        input:'',
        inputs:'',
        cishu: '',
        content: '',
        title: '',
        fenshu: ''
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
        if(_this.cishu > 0){
          _this.$store.dispatch('app/showAnswerStart')
          _this.$router.push({path:'/home1/trainingTheme_4'})
        }else{
          this.dialogVisible_1 = true
        }
        
      },
      handleLearn(){
        this.$router.push({path:'/home1/trainingTheme_2/knowledgePoints'})
      }
    },
    created(){
      this.title = sessionStorage.getItem('title')
      this.content = sessionStorage.getItem('content')
      let _this = this
      axios.get(baseURL + '/chapter/getExamInfo/', {
        params: {
          token: _this.$store.state.user.token,
          eventId: sessionStorage.getItem('eventId'),
          columnId: sessionStorage.getItem('columnId'),
          chapterId: sessionStorage.getItem('chapterId')
        }
      })
      .then(function (response) {
        _this.cishu = response.data.data.leftExamCount
        _this.fenshu = response.data.data.bestScore
      })
      .catch(function (error) {
        localStorage.clear()
        delCookid(TokenKey)
        _this.reload()
      });
    }
  }

</script>
<style lang="scss">
    .el-dialog__header {
      background-color: #008EFF!important;
      .el-dialog__title{
        color: #fff!important;
      }
    }
</style>
<style lang="scss" scoped>
.bcdf{
  border-radius:5px;
  background-color: #fff;
  p{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
  }
}
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
    // padding: 20px 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(51,165,255,1);
    border-radius:5px;
    margin-top: 20px;
    padding: 30px 100px 0;
    position: relative;
    min-height: 666px;
    .cyt_top{
      width: 100%;
      background-color: #eee;
      height: 50px;
      padding: 0 10px;
      margin: 40px auto;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(19,36,50,0.2);
      border-radius:5px;
      .cyt_topText{  
        line-height: 22px;
        float: left;
        padding: 0;
        letter-spacing: 0px;
      }
      .pqxx{
        margin-top: 6px;
        float: right;
      }
    }
    p{
      font-size: 14px;
      color: #0a0a0a;
      padding-top: 30px;
      letter-spacing: 2px;
    }
    .kscp{
      position: absolute;
      bottom: 150px;
      margin: 0 auto;
      background-color: #FF6D33;
    }
  }
</style>
