import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)
/* eslint-disable */
export default new Vuex.Store({
  state: {
    isSidebarActive: false,
    themeColor: '#2962ff'
  },
  mutations: {
    //This is for Sidbar trigger in mobile
    IS_SIDEBAR_ACTIVE(state, value) {
      state.isSidebarActive = value
    }
  },
  modules: modules
})
