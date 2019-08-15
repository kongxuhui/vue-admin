<template>
  <div class="dashboard-container">
    <div style="border-bottom: 1px solid #ccc;overflow:hidden;">
      <div class="dashboard-text">培训记录</div>
    </div>
    <div style="line-height: 60px;">
      我参加过的培训
    </div>
    <el-table  border :header-cell-style="{background: '#EEEEEE', textAlign:'center',borderColor: '#e0e0e0'}" :cell-style="{ textAlign:'center' }" style="width: 100%" :data="tableData">
      <el-table-column prop="name" label="培训名称" width="450"></el-table-column>
      <el-table-column prop="timer" label="时间" width="450"></el-table-column>
      <el-table-column label="培训状态" prop="status">
          <template slot-scope="scope">{{active_status[scope.row.status]}}</template>
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="培训状态">
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getTrainingRecord } from '@/api/table'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import {baseURL, active_status, TokenKey} from '@/utils/constant'
  import {delCookid} from '@/utils/auth'

  export default {
    name: 'Dashboard',
    data(){
      return{
        active_status,
        tableData:[]
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods:{
      
      
    },
    created(){
      let _this = this
      axios.get(baseURL + '/event/myEvents/', {
        params: {
          token: _this.$store.state.user.token
        }
      })
      .then(function (response) {
        // _this.$data.tableData = response.data.data
        function myFunction(time) {  
          var dateee = new Date(time).toJSON();
          var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
          return date
        }
        response.data.data.forEach(element => {
          element.timer = myFunction(element.startTime) +' - '+ myFunction(element.endTime)
        })
        _this.$data.tableData = response.data.data
      })
      .catch(function (error) {
        localStorage.clear()
        delCookid(TokenKey)
        _this.reload()
      });
      // getTrainingRecord(this.$store.state.user.token).then(response => {
      //   this.$data.tableData = response.data
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

</style>
