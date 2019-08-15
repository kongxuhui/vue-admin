<template>
  <div :class="classObj" class="app-wrapper">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible_2"
      title="提示"
      :show-close="false"
      width="500px"
      center>
      <div class="bcdf">
        <p>已是最后一个章节，如需学习更多请返回主题页。</p>
      </div>
      <span slot="footer" class="dialog-footer">
      <router-link to="/home1/trainingTheme_1"  style="height:55px;" class="nav-link">
          <el-button class="fhzjcp" type="primary"  @click="handleHistory">确定</el-button>
      </router-link>
      <el-button class="ckjx" @click="dialogVisible_2 = false">取消</el-button>
      </span>
    </el-dialog>
    <div class="header">
      <navbar />
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="isShow" class="sidebar-container" />
    <div class="container" v-if="!isShow && isShow_1 && isShow_2">
      <el-container id="container">
        <el-aside>
          <el-menu router :default-active="'/home1/trainingTheme_1?columnId=' + defaultActive_1" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" @select="handleSelect">
            <el-menu-item class="zhuti" disabled>
              <template slot="title">
                <img src="@/assets/image/zhuti.png" alt="">
                <span>培训主题</span>						
              </template>
            </el-menu-item>
            <el-menu-item :index="'/home1/trainingTheme_1?columnId=' + value.columnId" :key='key' v-for="(value, key) in columnList">
              <template slot="title">
                <span>{{value.columnName}}</span>						
              </template>
            </el-menu-item>
            <el-menu-item>
              <template slot="title">
                <router-link tag="div" to='/'  style="height:55px;" class="nav-link">
                    <el-button  @click="handleHome" class="getBack">返回</el-button>
                </router-link>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-container>
    </div>
    <div class="container add" v-if="!isShow_1 && isShow_2">
      <el-container id="container">
        <el-aside width="210">
          <el-menu router :default-active="defaultActive" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" @select="handleSelect">
            <el-menu-item :index="value.url" :key='key' v-for="(value, key) in ulList">
              <template slot="title">
                <span>{{value.sideName}}</span>						
              </template>
            </el-menu-item>
            <el-menu-item v-if="nextChapterShow">
              <template slot="title">
                <el-button  @click="handleNextChapter" class="getBack">学习下一章节</el-button>
              </template>
            </el-menu-item>
            <el-menu-item>
              <template slot="title">
                <router-link to="/home1/trainingTheme_1"  style="height:55px;" class="nav-link">
                    <el-button  @click="handleHistory" class="getBack">返回</el-button>
                </router-link>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-container>
    </div>
    <!-- <div class="container" v-if="!isShow_2">
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
              <el-col :span="6" v-for="(value,index) in contentList" tag="div" :key="index">
                  <div class="tihao" @click="handleTihao(value,index)" :class="index==currentTopic?'active_1':''">{{index + 1}}</div>
              </el-col>
            </el-row>
          </div>
        </el-aside>
      </el-container>
    </div> -->
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!-- <navbar /> -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { getColumn } from '@/api/table'
import axios from 'axios'
import {baseURL} from '@/utils/constant'
import {getIdx} from '@/utils/auth'
import Cookies from 'js-cookie'

export default {
  inject: ['reload'],
  data(){
    return{
      currentId:'',
      dialogVisible_2: false,
      nextChapterShow: true,
      prevChapterId:'',
      curreChapterId: '',
      current_columnId:'',
      ulList: [
          {
            url: '/home1/trainingTheme_2/knowledgePoints',
            sideName: "知识点"
          },
          {
            url: '/home1/trainingTheme_2/chapterExercises',
            sideName: "章节练习"
          },
          {
            url: '/home1/trainingTheme_2/chapterEvaluation',
            sideName: "章节测评"
          }
      ],
      columnList:[],
      list: {
          columnInfo: [
              {
                  columnId: 2,
                  sum: "2/4",
                  columnName: "宪法与国家"
              },
              {
                  columnId: 6,
                  sum: "1/4",
                  columnName: "教室职业的法律解读"
              },
              {
                  columnId: 7,
                  sum: "0/4",
                  columnName: "远离伤害，建设和谐校园"
              }
          ],
          eventName: "海南法治教室培训",
          eventDate: "2019.07.09~2019.07.20"
      }
    }
  },
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    defaultActive() {
			return this.$route.query.chapterId != 'undefined' || this.$data.prevChapterId != this.$data.curreChapterId ? '/home1/trainingTheme_2/knowledgePoints' : this.$route.path	
    },
    defaultActive_1() {
			return this.$route.query.columnId == 'undefined' ? Number(sessionStorage.getItem('columnId')) :  this.$route.query.columnId
		},
    isShow() {
      if(this.$route.query.taskId){
        let _this = this
        axios.get(baseURL + '/sysColumn/getColumnList', {
          params: {
            token: _this.$store.state.user.token,
            taskId: this.$route.query.taskId
          }
        })
        .then(function (response) {
          _this.columnList = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        });
      }else{
        let _this = this
        axios.get(baseURL + '/sysColumn/getColumnList', {
          params: {
            token: _this.$store.state.user.token,
            taskId: sessionStorage.getItem('eventId')
          }
        })
        .then(function (response) {
          _this.columnList = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        });
      }
			return !this.$store.getters.isShow	
    },
    isShow_1() {
			return !this.$store.getters.isShow_1	
    },
    isShow_2() {
			return !this.$store.getters.isShow_2	
		},
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    currentEvent() {
      return this.$store.state.app.currentEvent
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    handleSelect(key, index) {  
      
    },
    handleHome(){
      this.$store.dispatch('app/hidelearnStart')
      // this.$router.push({name:'/'})
    },
    handleHistory(){
      this.$data.dialogVisible_2 = false
      this.$store.dispatch('app/hideKnowledgeStart')
      // this.$router.push({path:'/home1/trainingTheme_1'})
    },
    handleNextChapter(){
      const currentColumnArr = JSON.parse(sessionStorage.getItem('columnArr'))
      this.$data.prevChapterId = sessionStorage.getItem('chapterId')
      let currentColumnArrIdx
      if(getIdx(this.$data.prevChapterId, currentColumnArr) <= currentColumnArr.length - 2){
        currentColumnArrIdx = getIdx(this.$data.prevChapterId, currentColumnArr) + 1
        this.resetSetItem('chapterId', Number(currentColumnArr[currentColumnArrIdx]))
        this.$router.push({path:'/home1/trainingTheme_2/knowledgePoints'})
      }else{
        currentColumnArrIdx = currentColumnArr.length
      }
      // sessionStorage.setItem('chapterId', Number(currentColumnArr[currentColumnArrIdx]))
      this.$data.curreChapterId = sessionStorage.getItem('chapterId')
      // this.reload()
      if(currentColumnArr.length - 1 <= currentColumnArrIdx - 1){
        this.$data.dialogVisible_2 = true
      }else{
        this.$data.dialogVisible_2 = false
      }
    },
  },
  created(){
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("currentState") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("currentState"))))
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("currentState",JSON.stringify(this.$store.state))
    })
    //禁用后退
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
    })
  }
}
</script>
<style lang="scss">

.el-menu-item.is-disabled{
  opacity: 1;
}
</style>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  // #app .main-container {
  //   margin-top: 100px;
  // }
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
  .header{
    width: 100%;
    background-color: #efefef;
    // position: fixed;
    // top: 0;
  }
  .active_1{
    background: green;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
.add{
  .el-menu-item:nth-last-child(2),
  .el-menu-item:last-child{
      width: 100%;
      position: absolute;
      bottom: 130px;
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
      height: 90%;
    }
    .el-menu {
      height: 100%;
    }
    .el-menu-item .is-active {
        color: #fff;
        background-color: #295274;
    }
    .el-aside{
      width: 100%!important;
      height: 100%;
    }
    
    .el-menu-item:last-child{
      width: 100%;
      position: absolute;
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
  .getBack{
    background: transparent;
    border: none;
    font-weight:400;
    color: rgba(255,255,255,1);
    letter-spacing: 2px;
  }
</style>
