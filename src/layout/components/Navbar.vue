<template>
  <div class="navbar">
    <!-- <hamburger v-if="isShow" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <breadcrumb class="breadcrumb-container" />

    

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/image/pp.png" class="user-avatar">
          <span style="font-size: 12px;line-height: 50px;margin-right: 20px;color:#fff">欢迎您，{{name}}</span>
          <i class="el-icon-caret-bottom" />
          <span class="shu">|</span>
          <!-- <span style="font-size: 12px;line-height: 50px;margin-right: 20px;color:#fff;cursor: pointer;" @click="logout">退出</span> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/information">
            <el-dropdown-item>
              账号信息
            </el-dropdown-item>
          </router-link>
          <router-link to="/modify">
            <el-dropdown-item divided>
             修改密码
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="font-size: 12px;line-height: 50px;padding-right: 20px;color:#fff;cursor: pointer;" @click="logout">退出</span>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    isShow() {
			return !this.$store.getters.isShow;		
    },
    name() {
			return this.$store.getters.name;		
		},
    ...mapGetters([
      'sidebar',
      'name'
      // 'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      localStorage.clear()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-popper[x-placement^=bottom] .popper__arrow::after{
  border-bottom-color: #008EFF!important;
  top: 0px!important;
  margin-left: 24px!important;
}
.el-breadcrumb__inner, .el-breadcrumb__inner a{
  font-family: 'PingFangSC-';
  font-size: 15px; 
  color: #ffffff!important;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background-color:transparent;
}
.el-dropdown-menu{
  background: #022541;
  top: 50px;
  border-radius: 10px;
}
.el-dropdown-menu__item{
  color: #fff;
}
.el-dropdown-menu__item--divided:before {
    content: '';
    height: 0px;
    display: block;
    border-bottom-color: #21557E!important;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #022541;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 0 0 30px;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        position: relative;
        .shu{
          font-size: 26px;
          cursor: pointer;
        }
        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 8px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 16px;
          top: 25px;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
