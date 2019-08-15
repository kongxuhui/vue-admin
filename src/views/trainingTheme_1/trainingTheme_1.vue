<template>
  <div class="dashboard-container">
    <div>
      <div class="dashboard-text">{{columnName}}</div>
    </div>
    <el-row :gutter="20">
        <el-col v-for="(value,index) in list" :span="6" :key="index">
            <div class="grid-content cyt" @click="handleZjList(value.chapterId, value.columnName, value.chapterValue +' '+ value.chapterName)">
                <div class="cytss">
                    <div class="cytss_t">
                        <img :src="value.coverImg" alt="">
                    </div>
                    <div class="cytss_b">
                    {{value.chapterValue }} &nbsp;&nbsp;{{ value.chapterName}}
                    <!-- <div class="cytss_num"><img src="@/assets/image/zj.png" alt="">{{value.num}}</div> -->
                    <div v-if="value.score == '0'" class="cytss_num">未完成</div>
                    <div v-else class="cytss_num1">已完成</div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
    <div class="cyt">
      
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
import {getChapter} from '@/api/table'
import axios from 'axios'
import {baseURL, TokenKey} from '@/utils/constant'
import {delCookid} from '@/utils/auth'


  export default {
    name: 'Dashboard',
    data(){
      return {
        list: [],
        input:'',
        inputs:'',
        taskId:'',
        columnId:'',
        columnName:'',
        columnArr: []
      }
    },

    computed: {
      ...mapGetters([
        'name',
        'currentEvent'
      ])
    },
    watch: {
      $route(val) {
        let _this = this
        axios.get(baseURL + '/chapter/getChapter', {
          params: {
            token: _this.$store.state.user.token,
            taskId: sessionStorage.getItem('eventId'),
            columnId: _this.$route.query.columnId
          }
        })
        .then(function (response) {
          _this.list = response.data.data
          _this.columnName = _this.list[0].columnName
          _this.columnArr = []
          _this.list.forEach(item => {
            _this.columnArr.push(item.chapterId)
          })
          sessionStorage.setItem('columnArr',JSON.stringify(_this.columnArr))
        })
        .catch(function (error) {
          localStorage.clear()
          delCookid(TokenKey)
          _this.reload()
        })
      }
    },
    methods:{
      handleZjList(n,title,content){
        this.$store.dispatch('app/showKnowledgeStart')
        sessionStorage.setItem('chapterId', n)
        if(this.$route.query.columnId){
          sessionStorage.setItem('columnId', this.$route.query.columnId)
        }
        sessionStorage.setItem('title', title)
        sessionStorage.setItem('content', content)
        // const currentColumnArr = JSON.parse(sessionStorage.getItem('columnArr'))
        // if(currentColumnArr[currentColumnArr.length - 1] == n){
        //   sessionStorage.setItem('nextChapterShow', false)
        // }else{
        //   sessionStorage.setItem('nextChapterShow', true)          
        // }
        this.$router.push({path:'/home1/trainingTheme_2/knowledgePoints?columnId=' + sessionStorage.getItem('columnId') + '&chapterId=' + n})
      }
    },
    created(){
      let _this = this
      if(_this.$route.query.columnId){
        _this.taskId = sessionStorage.getItem('eventId')
        _this.columnId = _this.$route.query.columnId
      }else{
        _this.taskId = sessionStorage.getItem('eventId')
        _this.columnId = sessionStorage.getItem('columnId')
      }
      axios.get(baseURL + '/chapter/getChapter', {
        params: {
          token: _this.$store.state.user.token,
          taskId: _this.taskId,
          columnId: _this.columnId
        }
      })
      .then(function (response) {
        _this.list = response.data.data
        _this.columnName = _this.list[0].columnName
        _this.list.forEach(item => {
          _this.columnArr.push(item.chapterId)
        })
        sessionStorage.setItem('columnArr',JSON.stringify(_this.columnArr))
      })
      .catch(function (error) {
        localStorage.clear()
        delCookid(TokenKey)
        _this.reload()
      })
    }
  }

</script>

<style lang="scss" scoped>
  .main-container {
    margin-left: 210px!important;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
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
    padding: 4px 10px;
    position: absolute;
    top: -30px;
    left: 0;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    color: #33A5FF;
  }
  .cyt{
    // height: 224px;
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
  }
  .cytss{
    width: 198px;
    // height: 224px;
    border: 1px solid #ccc;
    overflow: hidden;
    cursor: pointer;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(19,36,50,0.2);
    border-radius:5px;
  }
  .cytss_b{
    font-size: 13px;
    margin-top: 10px;
    padding: 0 10px;
  }
   .cytss_num1{
    // float: left;
    // clear: both;
    width: 66%;
    height: 30px;
    background: #DDDDDD;
    border-radius: 15px;
    margin: 10px auto 10px;
    line-height: 30px;
    letter-spacing: 4px;
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    // img{
    //   margin-right: 10px;
    //   width: 20px;
    //   height: 20px;
    //   vertical-align: bottom;
    // }
  }
  .cytss_num{
    // float: left;
    // clear: both;
    width: 66%;
    height: 30px;
    background: #ff6d33;
    border-radius: 15px;
    margin: 10px auto 10px;
    line-height: 30px;
    letter-spacing: 4px;
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    // img{
    //   margin-right: 10px;
    //   width: 20px;
    //   height: 20px;
    //   vertical-align: bottom;
    // }
  }
  .cytss_t{
    width: 100%;
    height: 138px;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
