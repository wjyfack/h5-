// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    isUserInfo: false // 是否能获取用户信息
    ,userData:{} // 用户信息
  },
  mutations: {

    changeIsUserInfo(state,data){
      state.isUserInfo = data
    }
    ,changeUserData(state,data){
      state.userData = data
    }
  }
})

export default store
