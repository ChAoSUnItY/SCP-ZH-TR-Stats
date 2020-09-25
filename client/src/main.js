import Vue from 'vue'
import Vuetify from '@/plugins/vuetify'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'

const cfg = {
  apiKey: 'AIzaSyByp_f-uZ_CmDA4NCBkqBNql_WQ07YeBR4',
  authDomain: 'zh-tr-api.firebaseapp.com',
  databaseURL: 'https://zh-tr-api.firebaseio.com',
  projectId: 'zh-tr-api',
  storageBucket: 'zh-tr-api.appspot.com',
  messagingSenderId: '726820887406',
  appId: '1:726820887406:web:3ff841d63f6e92f2627f7f',
  measurementId: 'G-4VHLWW0FRB'
}

const firebaseApp = firebase.initializeApp(cfg)
window.firebase = firebaseApp
window.firebaseAuth = firebaseApp.auth()

firebase.auth().onAuthStateChanged(user => {
  store.commit('updateUser', { user })
})

Vue.use(firestorePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Vuetify,
  router,
  store,
  components: { App },
  i18n,
  template: '<App/>'
}).$mount('#app')
