import storage from '@/utils/storage'

const state = {
  token: storage.getToken(),
  userInfo: storage.getUser(),
  isPractice: false,
  sidebarCollapsed: false
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      storage.setToken(token)
    } else {
      storage.removeToken()
    }
  },

  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    if (userInfo) {
      storage.setUser(userInfo)
    } else {
      storage.removeUser()
    }
  },

  SET_PRACTICE(state, status) {
    state.isPractice = status
  },

  TOGGLE_SIDEBAR(state) {
    state.sidebarCollapsed = !state.sidebarCollapsed
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  userRole: state => state.userInfo ? state.userInfo.role : null,
  userName: state => state.userInfo ? state.userInfo.name : '',
  userId: state => state.userInfo ? state.userInfo.id : null
}

const actions = {
  login({ commit }, { token, userInfo }) {
    commit('SET_TOKEN', token)
    commit('SET_USER_INFO', userInfo)
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
    commit('SET_USER_INFO', null)
    storage.clear()
  },

  setPractice({ commit }, status) {
    commit('SET_PRACTICE', status)
  },

  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
