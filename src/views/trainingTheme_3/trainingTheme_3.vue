<template>
  <div class="dashboard-container">
    <div class="container" v-if="!isShow_2">
      <el-container id="container" class="tuichu">
        <el-aside>
          <div>
            <el-row>
              <el-col class="grid-content bg-purple-dark" :span="24">
                <div class="tihaoTitle">题号</div>
              </el-col>
            </el-row>
          </div>
          <div class="tihaoDiv">
            <el-row :gutter="18">
              <el-col :span="6" v-for="(value,index) in menu" tag="div" :key="index">
                  <div class="tihao" @click="handleTihao(value,index)" :class='[ index==currentTopic? "active_lv" : "", value.status=="1"?"active_lv":""]'>{{index + 1}}</div>
              </el-col>
            </el-row>
          </div>
        </el-aside>
      </el-container>
      <router-link tag="div" to='/home1/trainingTheme_2/chapterExercises' class="nav-link">
          <el-button type="info" class="tuichulx" @click="handleQuit">退出练习</el-button>
          <!-- <el-button type="info" @click="handleQuit">提交答案</el-button> -->
      </router-link>
    </div>
    <div class="topTitle">
      <div class="min_title">
        <img src="@/assets/image/wanch.png" alt="">
        <span>{{title}} &nbsp; </span>
        <span>&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;&nbsp;{{content}}</span>
      </div>
    </div>
    <div class="cyt">
      <div class="dashboard-text">章节练习</div>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <p class="tigti">
              <span>{{currentTopic + 1}}</span> /
              <span>{{menu.length}}</span>
            </p>
            <p>{{obj.content}}</p>
            <p v-for="(item,idx) in activeSubjectsArr" @click="son(item,idx)" :key="idx">
              <span class="xuanxiang" :class="qusetion_id +'_'+ item.name == index ? active: ''"></span>
              <span :class="qusetion_id +'_'+ item.name == index ? active1: ''">{{item.name}}、{{item.value}}</span>
            </p>
            <el-button type="primary" :disabled="disabled_1" @click="handlePrevent">上一题</el-button>
            <el-button type="primary" :disabled="disabled_2" @click="handleNext">下一题</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="answerAnalysis" v-if="obj.jiexiStatus == '1'">
          <span class="answerTitle">答案解析</span>
          <p>
              <span class="youduiqi">正确答案: &nbsp;</span>
              <span>  {{obj.answer}}</span>
          </p>
          <p>
              <span class="youduiqi">解析: &nbsp;</span>
              <span class="jiexi">  {{obj.analysis}}</span>
          </p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex"
import store from '../../store/index' 
// import { promises } from 'dns';
import { getArr } from '@/utils/auth'
import axios from 'axios'
import {baseURL, TokenKey} from '@/utils/constant'
import {delCookid} from '@/utils/auth'

export default {
  name: "Dashboard",
  // beforeRouteEnter(to, from, next) {
  //     axios.get(baseURL + '/chapter/startPractice/', {
  //       params: {
  //         token: store.state.user.token,
  //         eventId: 222,
  //         // eventId: sessionStorage.getItem('eventId'),
  //         columnId: sessionStorage.getItem('columnId'),
  //         chapterId: sessionStorage.getItem('chapterId')
  //     }}).then(function (response) {
  //       if(response.data.status == "0"){
  //         next(vm => {
  //           vm.$data.menu = response.data.data
  //           vm.$data.obj = vm.$data.menu[vm.$data.currentTopic]
  //           vm.$data.qusetion_id = vm.$data.obj.id
  //           vm.$data.arr = vm.$data.obj.answerOptions.split('@!@')
  //           vm.activeSubjectsArr = getArr(vm.$data.arr,vm.$data.arr_name)
  //           vm.$data.menu.forEach(ele => {
  //             ele.status = '0'
  //             ele.jiexiStatus = '0'
  //             vm.$data.submitArr.push(ele.id + '_')
  //           })
  //         })
  //       }else{
  //         next(false)
  //         store.dispatch('app/hideAnswerStart')
  //         localStorage.setItem("currentState",JSON.stringify(store.state))
  //         // vm.$message({
  //         //   message: response.data.message,
  //         //   type: 'warning'
  //         // })
  //       }
  //     })
  //     .catch(function (error) {
  //       next(false)
  //       store.dispatch('app/hideAnswerStart')
  //       localStorage.setItem("currentState",JSON.stringify(store.state))
  //       debugger
  //       // this.$store.dispatch('app/showKnowledgeStart')
  //       // next(false)
  //     })
  // },
  data() {
    return {
      text:'退出练习',
      // text:'退出测评',
      input: "",
      inputs: "",
      index: '',
      disabled_1: true,
      disabled_2: false,
      currentTopic: 0,
      contentList: [],
      menu:[],
      obj: {},
      arr:[],
      arr_name:['A','B','C','D'],
      activeSubjectsArr:[],
      submitArr:[],
      qusetion_id: '',
      content: '',
      title: '',
      active: '',
      active1: ''
    }
  },

  computed: {
    ...mapGetters(["name"]),
    // currentTopic() {
    //   return this.$store.state.currentTopic
    // },
    isShow_2() {
			return !this.$store.getters.isShow_2	
		},
  },
  methods: {
      
      son(item,idx){
        this.index = this.$data.qusetion_id +'_'+ item.name
        if(item.name == this.$data.obj.answer){
          this.$data.obj.jiexiStatus = '1'
          this.$data.active = 'active_1'
          this.$data.active1 = 'active_11'
        }else{
          this.$data.active = 'active_2'
          this.$data.active1 = 'active_22'
          this.$data.obj.jiexiStatus = '0'
        }
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.$data.submitArr[this.$data.currentTopic] = this.$data.submitArr[this.$data.currentTopic].substr(0, this.$data.submitArr[this.$data.currentTopic].length - 1) + item.name          
        }else{
          this.$data.submitArr[this.$data.currentTopic] = this.$data.submitArr[this.$data.currentTopic] + item.name
        }
        this.$data.menu[this.$data.currentTopic].status = '1'
      },
      handlePrevent(){
        this.$data.currentTopic = this.$data.currentTopic - 1
        if(this.$data.currentTopic > 0){
          this.$data.obj = this.$data.menu[this.$data.currentTopic]
          this.$data.qusetion_id = this.$data.obj.id
          this.$data.arr = this.$data.obj.answerOptions.split('@!@')
          this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name)
          this.$data.disabled_2 = false
        }else{
          this.$data.obj = this.$data.menu[this.$data.currentTopic]
          this.$data.qusetion_id = this.$data.obj.id
          this.$data.arr = this.$data.obj.answerOptions.split('@!@')
          this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name)
           this.$data.disabled_1 = true
        }
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.index = this.$data.qusetion_id +'_'+ this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1)
          if(this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1) == this.$data.obj.answer){
            this.$data.active = 'active_1'
            this.$data.active1 = 'active_11'
          } else{
            this.$data.active = 'active_2'
            this.$data.active1 = 'active_22'
          }      
        }
      },
      handleNext(){
        this.$data.currentTopic = this.$data.currentTopic + 1
        if(this.$data.currentTopic + 1 < this.$data.menu.length){
          this.$data.obj = this.$data.menu[this.$data.currentTopic]
          this.$data.qusetion_id = this.$data.obj.id
          this.$data.arr = this.$data.obj.answerOptions.split('@!@')
          this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name)
          this.$data.disabled_1 = false
        }else{
          this.$data.obj = this.$data.menu[this.$data.currentTopic]
          this.$data.qusetion_id = this.$data.obj.id
          this.$data.arr = this.$data.obj.answerOptions.split('@!@')
          this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name)
          this.$data.disabled_2 = true
        }
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.index = this.$data.qusetion_id +'_'+ this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1)
          if(this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1) == this.$data.obj.answer){
            this.$data.active = 'active_1'
            this.$data.active1 = 'active_11'
          } else{
            this.$data.active = 'active_2'
            this.$data.active1 = 'active_22'
          }      
        }
      },
      handleQuit(){
        this.$store.dispatch('app/hideAnswerStart');
        this.$router.push({name:'/home1/trainingTheme_2/chapterExercises'})
        localStorage.setItem("currentState",JSON.stringify(this.$store.state))
      },
      handleTihao(item,idx){
        this.$data.currentTopic = idx
        this.$data.obj = this.$data.menu[this.$data.currentTopic]
        this.$data.qusetion_id = this.$data.obj.id
        this.$data.arr = this.$data.obj.answerOptions.split('@!@')
        this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name)
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.index = this.$data.qusetion_id +'_'+ this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1)
          if(this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1) == this.$data.obj.answer){
            this.$data.active = 'active_1'
            this.$data.active1 = 'active_11'
          } else{
            this.$data.active = 'active_2'
            this.$data.active1 = 'active_22'
          }      
        }
        if(this.$data.currentTopic > 0 && this.$data.currentTopic+1 < this.$data.menu.length){
          this.$data.disabled_2 = false;
          this.$data.disabled_1 = false;
        }else if(this.$data.currentTopic == 0){
          this.$data.disabled_2 = false;
          this.$data.disabled_1 = true;
        }else{
          this.$data.disabled_2 = true;
          this.$data.disabled_1 = false;
        }
      },
  },
  created() {
    this.title = sessionStorage.getItem('title')
    this.content = sessionStorage.getItem('content')
    let _this = this
    axios.get(baseURL + '/chapter/startPractice/', {
      params: {
        token: _this.$store.state.user.token,
        eventId: sessionStorage.getItem('eventId'),
        columnId: sessionStorage.getItem('columnId'),
        chapterId: sessionStorage.getItem('chapterId')
      }
    })
    .then(function (response) {
      if(response.data.status == 0){
        _this.$data.menu = response.data.data
        _this.$data.obj = _this.$data.menu[_this.$data.currentTopic]
        _this.$data.qusetion_id = _this.$data.obj.id
        _this.$data.arr = _this.$data.obj.answerOptions.split('@!@')
        _this.activeSubjectsArr = getArr(_this.$data.arr,_this.$data.arr_name)
        _this.$data.menu.forEach(ele => {
          ele.status = '0'
          ele.jiexiStatus = '0'
          _this.$data.submitArr.push(ele.id + '_')
        })
      }else{
        _this.$message({
          message: response.data.message,
          type: 'warning'
        })
      }
    })
    .catch(function (error) {
      localStorage.clear()
      delCookid(TokenKey)
      _this.reload()
    })
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("currentState",JSON.stringify(this.$store.state))
    })
  }
};


</script>

<style lang="scss" scoped>
.container .tuichu{
    height: 80%!important;
}
.tuichulx{
  border: none;
  background: transparent;
  margin-left: 50px;
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
.active_1{
  color: #fff!important;
  // position: relative;
  &::after{
    content: '';
    position: absolute;
    border-radius: 4px;
    left: 5px;
    top: 5px;
    display: block;
    width: 8px;
    height: 8px;
    background-color: #00CF13;
  }
}
.active_lv{
  background-color: #00CF13!important;
  color: #fff!important;
}
.active_11{
  color: #00CF13!important;
}
.active_22{
  color: #FF1C1C!important;
}
.active_2{
  color: #FF1C1C!important;
  // position: relative;
  &::after{
    content: '';
    position: absolute;
    border-radius: 4px;
    left: 5px;
    top: 5px;
    display: block;
    width: 8px;
    height: 8px;
    background-color: #FF1C1C;
  }
}
.dashboard-container .topTitle{
      overflow:hidden;
      position: relative;
      .el-button{
          position: absolute;
          right: 0;
          top: 0;
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
  }
.cyt {
  justify-content: space-around;
    // padding: 20px 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(51,165,255,1);
    border-radius:5px;
    margin-top: 20px;
    padding: 30px 100px 20px;
    position: relative;
    min-height: 666px;
  .el-row{
      .el-button{
          margin: 30px 50px 10px;
      }
      .tigti{
        text-align: center;
        font-weight: 600;
      }
      p {
        margin-top: 30px;
        line-height: 30px;
        .xuanxiang {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            display: inline-block;
            background:rgba(255,255,255,1);
            border:1px solid rgba(51,165,255,1);
            border-radius:10px;
            cursor: pointer;
            position: relative;
            top: 4px;
            margin-right: 8px;
        }
        // .active {
        //     background-color: #f40;
        //     color: #ffffff;
        // }
    }
  }
}
.answerAnalysis{
    width: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(19,36,50,0.2);
    border-radius:5px;
    position: relative;
    padding-left: 120px;
    padding-top: 10px;
    height: 100px;
    .answerTitle{
        padding: 26px 26px;
        text-align: center;
        letter-spacing: 4px;
        color: white;
        font-size: 19px;
        font-weight: 500;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: #008EFF;
        width: 100px;
        height: 100px;
        border-radius: 5px;
        line-height: 22px;
        font-family: 'PingFangSC-';
    }
    p{
      margin-top: 0;
      margin-bottom: 2px;
        .youduiqi{
            display:block;
            float: left;
        }
        .jiexi{
            display:block;
            float:left;
            width:88%;
            line-height: 20px;
            height: 60px;
            text-align:justify;
            overflow-x: hidden;
            overflow-y: auto;
            padding-right: 4px;
        }
        .jiexi::-webkit-scrollbar {
            width: 2px;    
            /*height: 4px;*/
        }
        .jiexi::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .jiexi::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);

        }
    }
    
}
.container{
    transition: width 0.28s;
    width: 210px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    .el-container{
      height: 100%;
    }
    .el-menu {
      height: 100%;
    }
    .el-aside{
      width: 100%!important;
      height: 100%;
    }
    .el-menu-item:nth-child(4),
    .el-menu-item:last-child{
      width: 100%;
      position: absolute;
      bottom: 0;
    }
    .el-menu-item:nth-child(4){
      bottom: 60px;
    }
    .tihaoDiv{
      padding: 0 10px;
    }
    .tihaoTitle{
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 16px;
      letter-spacing: 4px;
      color: #fff;
    }
    .tihao{
      width: 25px;
      height: 25px;
      // border: 1px solid #838383;
      border-radius: 50%;
      color: #000;
      margin-top: 14px;
      font-size: 16px;
      text-align: center;
      line-height: 25px;
      background-color: #fff;
      cursor: pointer;
    }
  }
</style>
