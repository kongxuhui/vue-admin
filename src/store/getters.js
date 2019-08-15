const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  isShow: state => state.app.showLeft,
  isShow_1: state => state.app.showLeft_1,
  isShow_2: state => state.app.showLeft_2,
  currentEvent: state => state.app.currentEvent
}
export default getters
