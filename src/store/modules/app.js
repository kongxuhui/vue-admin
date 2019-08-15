import Cookies from 'js-cookie'

const state = {
  showLeft: false,
  showLeft_1: false,
  showLeft_2: false,
  currentEvent: 0,
  sidebar: {
    // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  LEARN_STARTSHOW: (state) => {
    state.showLeft = true
  },
  LEARN_STARTFALSE: (state) => {
    state.showLeft = false
  },
  LEARN_KNOWLEDGESHOW: (state) => {
    state.showLeft_1 = true
  },
  LEARN_KNOWLEDGEFALSE: (state) => {
    state.showLeft_1 = false
  },
  ANSWER_SHOW: (state) => {
    state.showLeft_2 = true
  },
  ANSWER_FALSE: (state) => {
    state.showLeft_2 = false
  },
  CURRENT_EVENT: (state, currentEvent) => {
    state.currentEvent = currentEvent
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  hidelearnStart(context) {
    context.commit('LEARN_STARTFALSE')
  },
  showlearnStart(context) {
    context.commit('LEARN_STARTSHOW')
  },
  hideKnowledgeStart(context) {
    context.commit('LEARN_KNOWLEDGEFALSE')
  },
  showKnowledgeStart(context) {
    context.commit('LEARN_KNOWLEDGESHOW')
  },
  hideAnswerStart(context) {
    context.commit('ANSWER_FALSE')
  },
  showAnswerStart(context) {
    context.commit('ANSWER_SHOW')
  },
  currentEvent({ commit }, currentEvent) {
    commit('CURRENT_EVENT', currentEvent)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
