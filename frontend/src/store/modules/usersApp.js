
const usersApp = {
  state: {
    usersApp: [],
    showMenu: true
  },
  mutations: {
    SET_USERS_APP(state, payload) {
      state.usersApp = payload
    },
    UPDATE_SHOW_MENU(state, payload) {
      state.showMenu = payload
    }
  }

}

export default usersApp
