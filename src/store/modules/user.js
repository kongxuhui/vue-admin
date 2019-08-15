import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'
import { baseURL } from '@/utils/constant'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {

  // user login
  login({ commit }, userInfo) {
    const { idCardNo, password, code, uuid } = userInfo
    // let _this = this
    return new Promise((resolve, reject) => {
      login({ idCardNo: idCardNo.trim(), password: password, code: code, uuid: uuid }).then(response => {
        const { data } = response
        sessionStorage.setItem('loginStatus', JSON.stringify(response))
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_NAME', data.loginName)
        // setToken(data.loginName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //       const { name, avatar } = data
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/login/checkout', {
        params: {
          token: state.token
        }
      }).then(function(response) {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(function(error) {
        console.log(error)
        reject(error)
      })
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

