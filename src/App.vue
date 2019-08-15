<template>
  <div id="app">
    
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data(){
    return{
      isRouterAlive: true,
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
  computed: {
		isShow() {
			return this.$store.getters.isShow;		
		}
	},
	methods: {
      handleSelect(key, index) {
        console.log(key, index);
      },
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
  provide () {
    return {
      reload: this.reload
    }
  },
  name: 'App'
}
</script>
