import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: null,
    wikidotUser: null
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },
    updateWikidotInfo (state, wikidotInfo) {
      Vue.set(state, 'wikidotUser', wikidotInfo)
    }
  },
  getters: {
    user: state => state.user,
    isLoggedIn: state => state.user !== null,
    wikidotUser: state => state.wikidotUser
  },
  actions: {},
  modules: {},
  plugins: [
    vuexLocal.plugin
  ]
})
