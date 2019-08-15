<template>
  <div class="dashboard-container">
    <div class="min_title">
      <img src="@/assets/image/wanch.png" alt="">
      <span>{{title}} &nbsp; </span>
      <span>&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;&nbsp;{{content}}</span>
    </div>
    <div class="cyt" v-if="!learn">
      <div class="dashboard-text">知识点</div>
        <div class="dv" v-for="(item,idx) in list" :key='idx'> 
          <p> {{item.title}} </p>
          <el-button type="primary" plain @click="handleLearn(item.id)">开始学习</el-button>
          <div class="clear"></div>
        </div>
    </div>
    <div v-else class="cyt">
        <div class="dashboard-text">{{title_1}}<el-button class="learnNext" type="primary" @click="handleLearnNext">下一知识点</el-button></div>
        <div v-html="content_1" class="coon"> {{content_1}} </div>
        <!-- <div class="btn">
          <el-button type="primary" @click="handleLearnNext">学习下一知识点</el-button>
          <el-button type="primary" @click="handleTotop">置顶</el-button>
        </div> -->
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible_3"
      title="提示"
      :show-close="false"
      width="500px"
      center>
      <div class="bcdf">
        <p>已是最后一个知识点，如需学习更多请返回主题页。</p>
      </div>
      <span slot="footer" class="dialog-footer">
      <router-link to="/home1/trainingTheme_1"  style="height:55px;" class="nav-link">
          <el-button class="fhzjcp" type="primary"  @click="handleHistory">确定</el-button>
      </router-link>
      <el-button class="ckjx" @click="dialogVisible_3 = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import {baseURL, TokenKey} from '@/utils/constant'
  import {delCookid, getIdx} from '@/utils/auth'

  export default {
    name: 'Dashboard',
    data(){
      return {
        input:'',
        inputs:'',
        learn: false,
        content: '',
        content_1: '',
        title: '',
        title_1: '',
        currentChapterId: '',
        current_id: '',
        list:[],
        currentReload: false,
        knowledgeArr: [],
        dialogVisible_3: false
      }
    },

    computed: {
      ...mapGetters([
        'name'
      ]),
      sessionStorage11(){
        return sessionStorage
      }
    },
    methods:{
      handleLearn(id){
        this.$data.learn = true
        this.$data.current_id = id
        let _this = this
        axios.get(baseURL + '/content/getContent', {
          params: {
            contentId: this.$data.current_id
          }
        })
        .then(function (response) {
          _this.content_1 = response.data.data.content.content
          _this.title_1 = response.data.data.content.title
        })
        .catch(function (error) {
          localStorage.clear()
          delCookid(TokenKey)
          _this.reload()
        })
      },
      handleLearnNext(){
        let _this = this
        let cuurenIdx
        if(getIdx(_this.$data.current_id, _this.knowledgeArr) <= _this.knowledgeArr.length - 2){
          cuurenIdx = getIdx(Number(_this.$data.current_id), _this.knowledgeArr) + 1
          _this.$data.current_id = _this.knowledgeArr[cuurenIdx]
          axios.get(baseURL + '/content/getContent', {
            params: {
              contentId: _this.$data.current_id
            }
          })
          .then(function (response) {
            _this.content_1 = response.data.data.content.content
            _this.title_1 = response.data.data.content.title
          })
          .catch(function (error) {
            localStorage.clear()
            delCookid(TokenKey)
            _this.reload()
          })
        }else{
          cuurenIdx = _this.knowledgeArr.length
        }

        if(_this.knowledgeArr.length - 1 <= cuurenIdx - 1){
          _this.$data.dialogVisible_3 = true
        }else{
          _this.$data.dialogVisible_3 = false
        }
      },
      handleHistory(){
        this.$data.dialogVisible_3 = false
        this.$store.dispatch('app/hideKnowledgeStart')
      }
    },
    created(){
      let _this = this
      window.addEventListener('setItem', ()=> {
        axios.get(baseURL + '/content/getContentList/', {
          params: {
            chapterId: sessionStorage.getItem('chapterId'),
            columnId: sessionStorage.getItem('columnId')
          }
        })
        .then(function (response) {
          _this.$data.currentChapterId = sessionStorage.getItem('chapterId')
          _this.list = response.data.data.contentList
          _this.title = sessionStorage.getItem('title')
          _this.content = response.data.data.chapterName
          sessionStorage.setItem('content', _this.content)
          _this.list.forEach(item => {
            _this.knowledgeArr.push(item.id)
          })
        })
        .catch(function (error) {
          localStorage.clear()
          delCookid(TokenKey)
          _this.reload()
        })
      })
      if(_this.$data.currentChapterId != sessionStorage.getItem('chapterId')){
        axios.get(baseURL + '/content/getContentList/', {
          params: {
            chapterId: sessionStorage.getItem('chapterId'),
            columnId: sessionStorage.getItem('columnId')
          }
        })
        .then(function (response) {
          _this.$data.currentChapterId = sessionStorage.getItem('chapterId')
          _this.list = response.data.data.contentList
          _this.title = sessionStorage.getItem('title')
          _this.content = response.data.data.chapterName
          sessionStorage.setItem('content', _this.content)
          _this.list.forEach(item => {
            _this.knowledgeArr.push(item.id)
          })
        })
        .catch(function (error) {
          localStorage.clear()
          delCookid(TokenKey)
          // _this.reload()
        })
      }else{
        _this.title = sessionStorage.getItem('title')
        _this.content = sessionStorage.getItem('content')
        axios.get(baseURL + '/content/getContentList/', {
          params: {
            chapterId: sessionStorage.getItem('chapterId'),
            columnId: sessionStorage.getItem('columnId')
          }
        })
        .then(function (response) {
          _this.$data.currentChapterId = sessionStorage.getItem('chapterId')
          _this.list = response.data.data.contentList
          _this.list.forEach(item => {
            _this.knowledgeArr.push(item.id)
          })
        })
        .catch(function (error) {
          localStorage.clear()
          delCookid(TokenKey)
          _this.reload()
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
.bcdf{
  border-radius:5px;
  background-color: #fff;
  p{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
  }
  .ckjx{
    background-color: #A7A7A7;
  }
}
.learnNext{
  float: right;
  margin-right: 20px;

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
  .coon{
    height: calc(100vh - 380px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .coon::-webkit-scrollbar {
      width: 2px;    
      /*height: 4px;*/
  }
  .coon::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
  }
  .coon::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);

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
    padding-left: 20px;
  }
  .cyt{
    padding: 20px 10px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(51,165,255,1);
    border-radius:5px;
    margin-top: 20px;
    max-height: 656px;
    overflow-x: hidden;
    overflow-y: auto;
    .btn{
      text-align: center; 
      position: fixed;  
      bottom: 20px; 
      border-bottom: 0px solid #eee;
      .el-button{
        float: none;
      }
    }
    .dv{
      width: 96%;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(19,36,50,0.2);
      border-radius:5px;
      border-bottom: 1px solid #eee;
      margin: 8px auto;
      height:50px;
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-height: 50px;
        float: left;
        font-size: 14px;
        color: #000;
        width: 80%;
        -webkit-box-orient: vertical;
        margin: 0;
        padding: 0 20px;
      }
      .el-button{
        float: right;
        background:rgba(255,109,51,1);
        border-radius:4px;
        margin-right: 20px;
        margin-top: 6px;
        font-size:10px;
        font-family:'PingFangSC-';
        font-weight:400;
        color:rgba(255,255,255,1)
      }
      .clear{
        border: 0px solid #000;
        clear: both;
      }
    }
  }
  .cyt::-webkit-scrollbar {
        width: 2px;    
        /*height: 4px;*/
    }
    .cyt::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.6);
    }
    .cyt::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
</style>
