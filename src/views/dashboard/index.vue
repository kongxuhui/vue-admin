<template>
  <div class="dashboard-container">
    <div>
      <div class="dashboard-text">首页</div>
    </div>
    <div style="line-height: 60px;border-bottom: 1px solid #ccc">
      我的培训
    </div>
    <div v-if="trainingList.length !== 0" class="train" v-for="(value, index) in trainingList" :key='index'>
      <div class="train_t">
        {{value.eventName}}<br>
        <span style="font-size: 12px;color: #999999;">{{value.eventDate}}</span>
         <router-link tag="div" :to="{path:'/home1/trainingTheme_1', query:{taskId:value.eventId,columnId:value.columnInfo[0].columnId}}"  style="height:55px;" class="nav-link">
            <el-button style="float: right;position: absolute;right: 40px;top: 16px; background: #FF6D33;color: #fff;border-radius: 4px;" @click="handleLearnStart(value.eventId)">开始学习</el-button>
        </router-link>
      </div>
      <div class="train_b">
        <div style="line-height: 40px;font-size: 12px;"><img src="@/assets/image/wanch.png" style="vertical-align: middle;" alt=""> 各主题测评完成情况：</div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, idx) in value.columnInfo" :key='idx'>
            <div class="grid-content bg-purple">
              <div class="train_b_b">
                <div class="trainbb_l">
                  <div class="title">{{item.columnName}}</div>
                  <div class="progress">
                    <el-progress :show-text='showText' :stroke-width="strokeWidth" color="#409eff" :percentage="item.num.split('/')[0] * 100 / item.num.split('/')[1]"></el-progress>
                    <!-- <div class="jj">{{item.num}}</div> -->
                    {{item.num}}
                  </div>
                  </div>
              </div>
            </div>
          </el-col>
        </el-row>        
      </div>
    </div>
    <div v-else style="height: 102px;border: 1px solid #ccc;line-height: 102px;text-align: center;font-size: 13px;color: #333333;margin-top: 17px">
      暂无培训
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import Cookies from 'js-cookie'
import {baseURL, TokenKey} from '@/utils/constant'
import {delCookid} from '@/utils/auth'


export default {
  name: 'Dashboard',
  data(){
    return{
      a:'1',
      baseURL,
      showText:false,
      strokeWidth:10,
      trainingList:[]
    }
  },
  methods:{
    handleLearnStart(eventId){
      this.$store.dispatch('app/showlearnStart');
      sessionStorage.setItem('eventId', eventId)
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'name'
    ])
  },
  created(){
    let _this = this
    
    axios.get(baseURL + '/sysColumn/getColumn/', {
      params: {
        token: _this.$store.state.user.token
      }
    })
    .then(function (response) {
      _this.trainingList = response.data.data
    })
    .catch(function (error) {
      // this.$store.dispatch('user/logout')
      localStorage.clear()
      delCookid(TokenKey)
      _this.reload()
    });
    // getColumn(this.$store.state.user.token).then(response => {
    //   // this.$data.TrainingList = response.data
    //   resolve(data)
    // }).catch(error => {
    //   // reject(error)
    // })
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
  .train{
    margin-top: 17px;
    border-radius: 10px;
    position: relative;
    box-shadow: 0px 0px 8px 0px #DCDCDC;
    padding-bottom: 16px;
  }
  .train_t{
    height:70px;
    border-bottom: 1px solid #ccc;
    padding-top: 16px;
    line-height: 24px;
    padding-left: 20px;
    font-family: 'PingFangSC-';
  }
.train_b{
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  .el-col{
    margin-top: 6px;
  }
}
  .train_b_b{
    height: 40px;
    background-color: #fff; 
  }
  .trainbb_l{
    // height: 40px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    font-size: 12px;
    border-radius: 6px;
    .title{
      text-align: center;
      margin-bottom: 10px;
    }
    .el-progress{
      float: left;
      width: 80%;
      // margin-top: 16px;
      margin-right: 4px;
    }
    .progress{
      text-align: center;
      letter-spacing: 4px;

    }
    .jj{
      letter-spacing: 4px;
    }
  }
</style>
