<template>
  <div class="dashboard-container">
    <div>
      <div class="dashboard-text">使用手册</div>
    </div>
    <div class="chosce">
      <span class="yuan"></span> 海南省中小学教师培训平台使用手册
      <!-- <el-button class="upload"><a href="@/assets/fileList/learnn.pdf" download >下载</a></el-button> -->
      <el-button class="upload">下载</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
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
  .chosce{
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    line-height: 40px;
    box-shadow: 0px 0px 8px 0px #DCDCDC;
  }
  .yuan{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-color: #008EFF;
    border-radius: 6px;
  }
  .upload{
    float: right;
    color: #fff;
    width: 88px;
    background-color: #FF6D33;
  }

</style>
