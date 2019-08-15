<template>
  <div class="dashboard-container">
    <div class="container" v-if="!isShow_2">
      <el-container id="container">
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
                  <div class="tihao" @click="handleTihao(value,index)
                  " :class='[ index==currentTopic? "active_1" : "", value.status=="1"?"active_2":""]'>{{index + 1}}</div>
              </el-col>
            </el-row>
          </div>
        </el-aside>
      </el-container>
      <el-button type="info" @click="handleTan" class="tccp">退出测评</el-button>
      <el-button type="info" @click="handleSubmit">提交答案</el-button>
    </div>
    <div class="topTitle">
      <div class="min_title">
        <img src="@/assets/image/wanch.png" alt="">
        <span>{{title}} &nbsp; </span>
        <span>&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;&nbsp;{{content}}</span>
      </div>
    </div>
    <div class="cyt">
      <div class="dashboard-text">章节测评</div>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <p class="tigti">
              <span>{{currentTopic + 1}}</span> /
              <span>{{menu.length}}</span>
            </p>
            <p>{{obj.content}}</p>
            <p v-for="(item,idx) in activeSubjectsArr" @click="son(item,idx)" :key="idx">
              <span class="xuanxiang" :class="qusetion_id +'_'+ item.name == index?'active':''"></span>
              <span>{{item.name}}、{{item.value}}</span>
            </p>
            <el-button type="primary" :disabled="disabled_1" @click="handlePrevent">上一题</el-button>
            <el-button type="primary" :disabled="disabled_2" @click="handleNext">下一题</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible_1"
      title="退出测评"
      :show-close="false"
      width="500px"
      center>
      <div class="bcdf">
        <p>确定要退出答题么？</p>
        <p>退出后作答历史将不被保存</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <router-link to='/home1/trainingTheme_2/chapterExercises' class="nav-link">
      <el-button class="fhzjcp" type="primary" @click="handleQuitCp">确定退出</el-button></router-link>
      <el-button class="ckjx" @click="dialogVisible_1 = false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible_2"
      title="提示"
      :show-close="false"
      width="500px"
      center>
      <div class="bcdf">
        <p>没有完成所有题目，确定交卷么？</p>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button class="fhzjcp" type="primary" @click="handleTijao">确定</el-button>
      <el-button class="ckjx" @click="dialogVisible_2 = false">取消</el-button>
      </span>
    </el-dialog>



    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      title="本次得分"
      :show-close="false"
      width="500px"
      center>
      <div class="bcdf">
        <div class="defen">
          <span>{{grade}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <router-link to='/home1/trainingTheme_2/chapterExercises' class="nav-link">
      <el-button class="fhzjcp" type="primary" @click="handleQuitCp">返回章节测评</el-button></router-link>
      <!-- <el-button class="ckjx" @click="handleJiexi">查看解析</el-button> -->
        <router-link :to="{path:'/home1/trainingTheme_5', query:{resultId:resultId}}" class="nav-link"><el-button class="ckjx" @click="handleJiexi">查看解析</el-button></router-link>
      </span>
    </el-dialog>
  </div>
  
  
</template>


<script>
import { mapGetters } from "vuex" 
// import { promises } from 'dns';
import { getArr } from '@/utils/auth'
import axios from 'axios'
import {baseURL, TokenKey} from '@/utils/constant'
import {delCookid} from '@/utils/auth'
import qs from 'qs'


export default {
  name: "Dashboard",
  data() {
    return {
      dialogVisible:false,
      dialogVisible_1: false,
      dialogVisible_2: false,
      text:'退出练习',
      // text:'退出测评',
      input: "",
      inputs: "",
      index: '',
      disabled_1: true,
      disabled_2: false,
      currentTopic: 0,
      contentList: [
          {
              "id": 14,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A1@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 15,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 16,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 17,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 18,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 19,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 20,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 21,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 22,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 23,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 24,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 25,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 26,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 27,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 28,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          },
          {
              "id": 29,
              "chapterId": "1",
              "content": "测试题干",
              "answerOptions": "选项A@!@选项B@!@选项C@!@选项D",
              "answer": "A",
              "type": "0",
              "analysis": "测试解析",
              "hint": "测试提示"
          }
      ],
      menu:[
          {
            id: 14,
            chapterId: "2",
            content: "测试题干1",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },{
            id: 15,
            chapterId: "3",
            content: "测试题干2",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },{
            id: 16,
            chapterId: "4",
            content: "测试题干3",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },{
            id: 17,
            chapterId: "5",
            content: "测试题干4",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },{
            id: 18,
            chapterId: "6",
            content: "测试题干5",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },{
            id: 19,
            chapterId: "7",
            content: "测试题干6",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },{
            id: 20,
            chapterId: "8",
            content: "测试题干7",
            answerOptions: "选项A1@!@选项B@!@选项C@!@选项D",
            answer: "A",
            type: "0",
            analysis: "测试解析",
            hint: "测试提示"
          },
      ],
      obj: {},
      arr:[],
      arr_name:['A','B','C','D'],
      activeSubjectsArr:[],
      submitArr:[],
      qusetion_id: '',
      grade:'50分',
      resultId:''
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
      
      son(item,idx){status
        this.index = this.$data.qusetion_id +'_'+ item.name
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.$data.submitArr[this.$data.currentTopic] = this.$data.submitArr[this.$data.currentTopic].substr(0, this.$data.submitArr[this.$data.currentTopic].length - 1) + item.name          
        }else{
          this.$data.submitArr[this.$data.currentTopic] = this.$data.submitArr[this.$data.currentTopic] + item.name
        }
        this.$data.menu[this.$data.currentTopic].status = '1'
      },
      handleTan(){
        this.dialogVisible_1 = true
      },
      handleQuitCp(){
        this.$store.dispatch('app/hideAnswerStart')
        this.$router.push({name:'/home1/trainingTheme_2/chapterEvaluation'})
        localStorage.setItem("currentState",JSON.stringify(this.$store.state))
      },
      handleTijao(){
        let _this = this
         axios.post(baseURL + '/chapter/saveResult/', qs.stringify({
            token: _this.$store.state.user.token,
            eventId: sessionStorage.getItem('eventId'),
            columnId: sessionStorage.getItem('columnId'),
            chapterId: sessionStorage.getItem('chapterId'),
            resultId: _this.$data.resultId,
            answers: _this.$data.submitArr.join("@!@")
          })).then(function (response) {
          if(response.data.status == '0'){
            _this.$data.dialogVisible = true
            _this.$data.grade = response.data.data + '分'
              // _this.$store.dispatch('app/hideAnswerStart')
              // _this.$router.push({name:'/home1/trainingTheme_2/chapterEvaluation'})
              // localStorage.setItem("currentState",JSON.stringify(this.$store.state))
          }else if(response.data.status == 1){
            this.$message({
              message: response.data.message,
              type: 'warning'
            })
          }else if(response.data.status == 2){
            this.$message({
              message: '答案解析错误',
              type: 'warning'
            })
          }else{
             this.$message.error('保存考试结果出错')
          }
        })
        .catch(function (error) {
          localStorage.clear()
          delCookid(TokenKey)
          _this.reload()
        })
      },
      handleSubmit(){
        let _this = this
        // _this.$data.dialogVisible = true
        _this.$data.submitArr.forEach(item => {
          if(item.charAt(item.length-1) === '_'){
            _this.$data.dialogVisible_2 = true
          }
        })
        if(!_this.$data.dialogVisible_2){
          _this.handleTijao()
        }
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
          } else{
            this.$data.active = 'active_2'
          }      
        }
      },
      handleNext(){
        this.$data.currentTopic = this.$data.currentTopic + 1;
        if(this.$data.currentTopic + 1 < this.$data.menu.length){
          this.$data.obj = this.$data.menu[this.$data.currentTopic];
          this.$data.qusetion_id = this.$data.obj.id
          this.$data.arr = this.$data.obj.answerOptions.split('@!@');
          this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name);
          this.$data.disabled_1 = false;
        }else{
          this.$data.obj = this.$data.menu[this.$data.currentTopic];
          this.$data.qusetion_id = this.$data.obj.id
          this.$data.arr = this.$data.obj.answerOptions.split('@!@');
          this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name);
          this.$data.disabled_2 = true;
        }
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.index = this.$data.qusetion_id +'_'+ this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1)
          if(this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1) == this.$data.obj.answer){
            this.$data.active = 'active_1'
          } else{
            this.$data.active = 'active_2'
          }      
        }
      },
      handleQuit(){
        this.$store.dispatch('app/hideAnswerStart')
        this.$router.push({name:'/home1/trainingTheme_2/chapterEvaluation'})
        localStorage.setItem("currentState",JSON.stringify(this.$store.state))
      },
      handleJiexi(){
          // this.$router.push({path:'/home1/trainingTheme_5/trainingTheme_5',params:{resultId: this.$data.resultId}})
      },
      handleTihao(item,idx){
        this.$data.currentTopic = idx
        this.$data.obj = this.$data.menu[this.$data.currentTopic]
        this.$data.qusetion_id = this.$data.obj.id
        this.$data.arr = this.$data.obj.answerOptions.split('@!@')
        this.activeSubjectsArr = getArr(this.$data.arr,this.$data.arr_name)
        if(this.$data.menu[this.$data.currentTopic].status == 1){
          this.index = this.$data.qusetion_id +'_'+ this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length - 1)          
        }
        // this.$data.menu[this.$data.currentTopic].status
        this.$data.qusetion_id = this.$data.obj.id
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
    axios.get(baseURL + '/chapter/startExam/', {
      params: {
        token: _this.$store.state.user.token,
        eventId: sessionStorage.getItem('eventId'),
        columnId: sessionStorage.getItem('columnId'),
        chapterId: sessionStorage.getItem('chapterId')
      }
    })
    .then(function (response) {
      if(response.data.status == 0){
         _this.$data.menu = response.data.data.questionList
        _this.$data.resultId = response.data.data.resultId
        _this.$data.obj = _this.$data.menu[_this.$data.currentTopic]
        _this.$data.qusetion_id = _this.$data.obj.id
        _this.$data.arr = _this.$data.obj.answerOptions.split('@!@')
        _this.activeSubjectsArr = getArr(_this.$data.arr,_this.$data.arr_name)
        _this.$data.menu.forEach(ele => {
          ele.status = '0'
          _this.$data.submitArr.push(ele.id + '_')
        })
      }else{
        this.$message({
          message: response.data.message,
          type: 'warning'
        })
      }
    })
    .catch(function (error) {
      localStorage.clear()
      delCookid(TokenKey)
      _this.reload()
    });
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("currentState",JSON.stringify(this.$store.state))
    })
  }
};


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
  .defen{
    background-image: url('../../assets/image/defen.png');
    background-size: 100% 100%;
    width: 250px;
    height: 188px;
    margin: 0 auto;
    position: relative;
    span{
      position: absolute;
      top: 60px;
      left: 94px;
      color: #BC1E1E;
      font-size: 24px;
    }
  }
  p{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
  }
  .ckjx{
    background-color: #A7A7A7;
  }
}
.active_1{
  background: #00CF13!important;
}
.active_2{
  background: #00CF13!important;
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
.container{
  .el-button{
      position: absolute;
      right: 56px;
      bottom: 250px;
      border: none;
      background: transparent;
      font-size: 16px;
      letter-spacing: 2px;
  }
  .tccp{
    bottom: 180px;
  }
}
.dashboard-container .topTitle{
      border-bottom: 1px solid #ccc;
      overflow:hidden;
      position: relative;
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
.dashboard-text {
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
            &:visited{
                background-color: #00CF13!important;
            }
        }
        .active {
          border: 1px solid #008EFF;
            &::after{
              content: '';
              position: absolute;
              border-radius: 4px;
              left: 5px;
              top: 5px;
              display: block;
              width: 8px;
              height: 8px;
              background-color: #008EFF;
            }
        }
    }
  }
}
.answerAnalysis{
    width: 100%;
    border-top: 1px solid #ccc;
    position: relative;
    padding-left: 200px;
    padding-top: 30px;
    .answerTitle{
        padding: 10px 30px;
        text-align: center;
        letter-spacing: 2px;
        color: #000;
        font-size: 16px;
        font-weight: 500;
        border: 1px solid #ccc;
        position: absolute;
        left: 100px;
        top: -21px;
        background-color: #fff;
    }
    p{
        padding: 8px 0;
        .youduiqi{
            width: 80px;
            text-align: right;
            display:block;
            float: left;
        }
        .jiexi{
            display:block;
            float:left;
            width:80%;
            line-height: 20px;
            text-align:justify;
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
      border: 1px solid #838383;
      border-radius: 50%;
      color: #fff;
      margin-top: 14px;
      font-size: 16px;
      text-align: center;
      line-height: 25px;
      cursor: pointer;
    }
  }
</style>
