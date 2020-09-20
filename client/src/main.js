// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import router from './router'

import tw from './i18n/tw.json'

Vue.use(VueI18n)
const locales = {
  tw: tw
}
Vue.config.productionTip = false

Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
