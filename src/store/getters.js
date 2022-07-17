const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  username: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  userInfo: state => state.user.userInfo
}
export default getters
