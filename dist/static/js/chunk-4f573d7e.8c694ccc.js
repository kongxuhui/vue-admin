(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f573d7e"],{"0d4f":function(t,a,s){},"0e24":function(t,a,s){"use strict";var i=s("66ab"),e=s.n(i);e.a},"2b3e":function(t,a,s){"use strict";var i=s("0d4f"),e=s.n(i);e.a},"66ab":function(t,a,s){},a503:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"dashboard-container"},[t.isShow_2?t._e():i("div",{staticClass:"container"},[i("el-container",{attrs:{id:"container"}},[i("el-aside",[i("div",[i("el-row",[i("el-col",{staticClass:"grid-content bg-purple-dark",attrs:{span:24}},[i("div",{staticClass:"tihaoTitle"},[t._v("题号")])])],1)],1),t._v(" "),i("div",{staticClass:"tihaoDiv"},[i("el-row",{attrs:{gutter:18}},t._l(t.menu,function(a,s){return i("el-col",{key:s,attrs:{span:6,tag:"div"}},[i("div",{staticClass:"tihao",class:[s==t.currentTopic?"active_1":"","1"==a.status?"active_2":""],on:{click:function(i){return t.handleTihao(a,s)}}},[t._v(t._s(s+1))])])}),1)],1)])],1),t._v(" "),i("el-button",{staticClass:"tccp",attrs:{type:"info"},on:{click:t.handleTan}},[t._v("退出测评")]),t._v(" "),i("el-button",{attrs:{type:"info"},on:{click:t.handleSubmit}},[t._v("提交答案")])],1),t._v(" "),i("div",{staticClass:"topTitle"},[i("div",{staticClass:"min_title"},[i("img",{attrs:{src:s("f9b5"),alt:""}}),t._v(" "),i("span",[t._v(t._s(t.title)+"   ")]),t._v(" "),i("span",[t._v("    |      "+t._s(t.content))])])]),t._v(" "),i("div",{staticClass:"cyt"},[i("div",{staticClass:"dashboard-text"},[t._v("章节测评")]),t._v(" "),i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:12,offset:6}},[i("div",{staticClass:"grid-content bg-purple"},[i("p",{staticClass:"tigti"},[i("span",[t._v(t._s(t.currentTopic+1))]),t._v(" /\n            "),i("span",[t._v(t._s(t.menu.length))])]),t._v(" "),i("p",[t._v(t._s(t.obj.content))]),t._v(" "),t._l(t.activeSubjectsArr,function(a,s){return i("p",{key:s,on:{click:function(i){return t.son(a,s)}}},[i("span",{staticClass:"xuanxiang",class:t.qusetion_id+"_"+a.name==t.index?"active":""}),t._v(" "),i("span",[t._v(t._s(a.name)+"、"+t._s(a.value))])])}),t._v(" "),i("el-button",{attrs:{type:"primary",disabled:t.disabled_1},on:{click:t.handlePrevent}},[t._v("上一题")]),t._v(" "),i("el-button",{attrs:{type:"primary",disabled:t.disabled_2},on:{click:t.handleNext}},[t._v("下一题")])],2)])],1)],1),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,visible:t.dialogVisible_1,title:"退出测评","show-close":!1,width:"500px",center:""},on:{"update:visible":function(a){t.dialogVisible_1=a}}},[i("div",{staticClass:"bcdf"},[i("p",[t._v("确定要退出答题么？")]),t._v(" "),i("p",[t._v("退出后作答历史将不被保存")])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("router-link",{staticClass:"nav-link",attrs:{to:"/home1/trainingTheme_2/chapterExercises"}},[i("el-button",{staticClass:"fhzjcp",attrs:{type:"primary"},on:{click:t.handleQuitCp}},[t._v("确定退出")])],1),t._v(" "),i("el-button",{staticClass:"ckjx",on:{click:function(a){t.dialogVisible_1=!1}}},[t._v("取消")])],1)]),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,visible:t.dialogVisible_2,title:"提示","show-close":!1,width:"500px",center:""},on:{"update:visible":function(a){t.dialogVisible_2=a}}},[i("div",{staticClass:"bcdf"},[i("p",[t._v("没有完成所有题目，确定交卷么？")])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"fhzjcp",attrs:{type:"primary"},on:{click:t.handleTijao}},[t._v("确定")]),t._v(" "),i("el-button",{staticClass:"ckjx",on:{click:function(a){t.dialogVisible_2=!1}}},[t._v("取消")])],1)]),t._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,visible:t.dialogVisible,title:"本次得分","show-close":!1,width:"500px",center:""},on:{"update:visible":function(a){t.dialogVisible=a}}},[i("div",{staticClass:"bcdf"},[i("div",{staticClass:"defen"},[i("span",[t._v(t._s(t.grade))])])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("router-link",{staticClass:"nav-link",attrs:{to:"/home1/trainingTheme_2/chapterExercises"}},[i("el-button",{staticClass:"fhzjcp",attrs:{type:"primary"},on:{click:t.handleQuitCp}},[t._v("返回章节测评")])],1),t._v(" "),i("router-link",{staticClass:"nav-link",attrs:{to:{path:"/home1/trainingTheme_5",query:{resultId:t.resultId}}}},[i("el-button",{staticClass:"ckjx",on:{click:t.handleJiexi}},[t._v("查看解析")])],1)],1)])],1)},e=[],n=(s("28a5"),s("ac6a"),s("7f7f"),s("db72")),r=s("2f62"),d=s("5f87"),o=s("bc3a"),c=s.n(o),h=s("60fe"),l=s("4328"),u=s.n(l),p={name:"Dashboard",data:function(){return{dialogVisible:!1,dialogVisible_1:!1,dialogVisible_2:!1,text:"退出练习",input:"",inputs:"",index:"",disabled_1:!0,disabled_2:!1,currentTopic:0,contentList:[{id:14,chapterId:"1",content:"测试题干",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:15,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:16,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:17,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:18,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:19,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:20,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:21,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:22,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:23,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:24,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:25,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:26,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:27,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:28,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:29,chapterId:"1",content:"测试题干",answerOptions:"选项A@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"}],menu:[{id:14,chapterId:"2",content:"测试题干1",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:15,chapterId:"3",content:"测试题干2",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:16,chapterId:"4",content:"测试题干3",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:17,chapterId:"5",content:"测试题干4",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:18,chapterId:"6",content:"测试题干5",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:19,chapterId:"7",content:"测试题干6",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"},{id:20,chapterId:"8",content:"测试题干7",answerOptions:"选项A1@!@选项B@!@选项C@!@选项D",answer:"A",type:"0",analysis:"测试解析",hint:"测试提示"}],obj:{},arr:[],arr_name:["A","B","C","D"],activeSubjectsArr:[],submitArr:[],qusetion_id:"",grade:"50分",resultId:""}},computed:Object(n["a"])({},Object(r["b"])(["name"]),{isShow_2:function(){return!this.$store.getters.isShow_2}}),methods:{son:function(t,a){status,this.index=this.$data.qusetion_id+"_"+t.name,1==this.$data.menu[this.$data.currentTopic].status?this.$data.submitArr[this.$data.currentTopic]=this.$data.submitArr[this.$data.currentTopic].substr(0,this.$data.submitArr[this.$data.currentTopic].length-1)+t.name:this.$data.submitArr[this.$data.currentTopic]=this.$data.submitArr[this.$data.currentTopic]+t.name,this.$data.menu[this.$data.currentTopic].status="1"},handleTan:function(){this.dialogVisible_1=!0},handleQuitCp:function(){this.$store.dispatch("app/hideAnswerStart"),this.$router.push({name:"/home1/trainingTheme_2/chapterEvaluation"}),localStorage.setItem("currentState",JSON.stringify(this.$store.state))},handleTijao:function(){var t=this;c.a.post(h["c"]+"/chapter/saveResult/",u.a.stringify({token:t.$store.state.user.token,eventId:sessionStorage.getItem("eventId"),columnId:sessionStorage.getItem("columnId"),chapterId:sessionStorage.getItem("chapterId"),resultId:t.$data.resultId,answers:t.$data.submitArr.join("@!@")})).then(function(a){"0"==a.data.status?(t.$data.dialogVisible=!0,t.$data.grade=a.data.data+"分"):1==a.data.status?this.$message({message:a.data.message,type:"warning"}):2==a.data.status?this.$message({message:"答案解析错误",type:"warning"}):this.$message.error("保存考试结果出错")}).catch(function(a){localStorage.clear(),Object(d["a"])(h["a"]),t.reload()})},handleSubmit:function(){var t=this;t.$data.submitArr.forEach(function(a){"_"===a.charAt(a.length-1)&&(t.$data.dialogVisible_2=!0)}),t.$data.dialogVisible_2||t.handleTijao()},handlePrevent:function(){this.$data.currentTopic=this.$data.currentTopic-1,this.$data.currentTopic>0?(this.$data.obj=this.$data.menu[this.$data.currentTopic],this.$data.qusetion_id=this.$data.obj.id,this.$data.arr=this.$data.obj.answerOptions.split("@!@"),this.activeSubjectsArr=Object(d["b"])(this.$data.arr,this.$data.arr_name),this.$data.disabled_2=!1):(this.$data.obj=this.$data.menu[this.$data.currentTopic],this.$data.qusetion_id=this.$data.obj.id,this.$data.arr=this.$data.obj.answerOptions.split("@!@"),this.activeSubjectsArr=Object(d["b"])(this.$data.arr,this.$data.arr_name),this.$data.disabled_1=!0),1==this.$data.menu[this.$data.currentTopic].status&&(this.index=this.$data.qusetion_id+"_"+this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length-1),this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length-1)==this.$data.obj.answer?this.$data.active="active_1":this.$data.active="active_2")},handleNext:function(){this.$data.currentTopic=this.$data.currentTopic+1,this.$data.currentTopic+1<this.$data.menu.length?(this.$data.obj=this.$data.menu[this.$data.currentTopic],this.$data.qusetion_id=this.$data.obj.id,this.$data.arr=this.$data.obj.answerOptions.split("@!@"),this.activeSubjectsArr=Object(d["b"])(this.$data.arr,this.$data.arr_name),this.$data.disabled_1=!1):(this.$data.obj=this.$data.menu[this.$data.currentTopic],this.$data.qusetion_id=this.$data.obj.id,this.$data.arr=this.$data.obj.answerOptions.split("@!@"),this.activeSubjectsArr=Object(d["b"])(this.$data.arr,this.$data.arr_name),this.$data.disabled_2=!0),1==this.$data.menu[this.$data.currentTopic].status&&(this.index=this.$data.qusetion_id+"_"+this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length-1),this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length-1)==this.$data.obj.answer?this.$data.active="active_1":this.$data.active="active_2")},handleQuit:function(){this.$store.dispatch("app/hideAnswerStart"),this.$router.push({name:"/home1/trainingTheme_2/chapterEvaluation"}),localStorage.setItem("currentState",JSON.stringify(this.$store.state))},handleJiexi:function(){},handleTihao:function(t,a){this.$data.currentTopic=a,this.$data.obj=this.$data.menu[this.$data.currentTopic],this.$data.qusetion_id=this.$data.obj.id,this.$data.arr=this.$data.obj.answerOptions.split("@!@"),this.activeSubjectsArr=Object(d["b"])(this.$data.arr,this.$data.arr_name),1==this.$data.menu[this.$data.currentTopic].status&&(this.index=this.$data.qusetion_id+"_"+this.$data.submitArr[this.$data.currentTopic].charAt(this.$data.submitArr[this.$data.currentTopic].length-1)),this.$data.qusetion_id=this.$data.obj.id,this.$data.currentTopic>0&&this.$data.currentTopic+1<this.$data.menu.length?(this.$data.disabled_2=!1,this.$data.disabled_1=!1):0==this.$data.currentTopic?(this.$data.disabled_2=!1,this.$data.disabled_1=!0):(this.$data.disabled_2=!0,this.$data.disabled_1=!1)}},created:function(){var t=this;this.title=sessionStorage.getItem("title"),this.content=sessionStorage.getItem("content");var a=this;c.a.get(h["c"]+"/chapter/startExam/",{params:{token:a.$store.state.user.token,eventId:sessionStorage.getItem("eventId"),columnId:sessionStorage.getItem("columnId"),chapterId:sessionStorage.getItem("chapterId")}}).then(function(t){0==t.data.status?(a.$data.menu=t.data.data.questionList,a.$data.resultId=t.data.data.resultId,a.$data.obj=a.$data.menu[a.$data.currentTopic],a.$data.qusetion_id=a.$data.obj.id,a.$data.arr=a.$data.obj.answerOptions.split("@!@"),a.activeSubjectsArr=Object(d["b"])(a.$data.arr,a.$data.arr_name),a.$data.menu.forEach(function(t){t.status="0",a.$data.submitArr.push(t.id+"_")})):this.$message({message:t.data.message,type:"warning"})}).catch(function(t){localStorage.clear(),Object(d["a"])(h["a"]),a.reload()}),window.addEventListener("beforeunload",function(){localStorage.setItem("currentState",JSON.stringify(t.$store.state))})}},$=p,b=(s("0e24"),s("2b3e"),s("2877")),_=Object(b["a"])($,i,e,!1,null,"88bb7ec2",null);a["default"]=_.exports},f9b5:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAACjklEQVQ4T52UT2hUVxTGf999mUmwVCyCCwtCRTddVDpTo9iFUChu6qrFQt9oEIQuKiIi1IUgKgrRKhTaGilVSphkU4rYUggitFj6Z+Gbqihu2rrQIASNCbFOknn3k2eMBJOGtGd5OefHd+53zlGl7p+A1fyHkBHi0OVUp6bLVK17EOiOcH2hLMEu4K8s1e5noErdg4ZtQfzhyPogYmxxO+vS1X8DV+o+DTzMUu2ZBcKssLiUiGFHPm+W2VoeZ6NELJJtwoMWl25tV3NeUBJZ3kwYGBtnZGmJnpH7fPjiS2xKAq0ClEfahoa4cHuPHs2vKOdBSHgPmLC4Pxo5sxj2F2KeyBdhEo5eSzU8LyiM8Ys7WKUEP8wZvNmle//rjwK8GsfpLyXEvI3+CXi/DGfNVGuYksvsaGzR0LyKZF7Javpy1Q9uXzxMPUtVtDlnVPrcg/lnTtdkOhQ4QSQ3DJTgwKQ4EjSlKEZKzTL72sd5S4FPMBeymj6aZb9y7hDYXthtcy6r6beZcqp93mHzGXBX0N1qcf5Kl+7MNUdrPMlX6mBRiBy7nKo2nVTp9U4CnzpnXUg4aFgrSAzX8hZpAdT0ZCNea3ygk9XvvMij9GSptk2DqnVP5NAZYECwbKZSw0gu3nwGkhlD1GSixY9Zqm+Lgkqfi7eDwJ/A2zMheeQdtdEIOWenQGZro6aLc1lUrft3Q7fgtOFnwXKg0/CuYTSYXkNHsf13bb4R/D0LFDBmr8VuRb6IYifwQjBLDE3ECUE7YkSVPneTs0J6ugrP0SwUcnqdcLjo1JHVBDYLjgPJ0/TvtdAbtOZrv5y0cVNQWL4SKE0NPGMyGxYMKore6PfrMXJEphM9OS2/Gj5u1HTjMdDuV8oCM1SkAAAAAElFTkSuQmCC"}}]);