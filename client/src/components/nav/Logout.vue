<template>
  <div>
    <strong v-if="user">{{ user.displayName }} <a href="/" @click="logout">登出</a></strong>
    <strong v-else><router-link :to="`/${$i18n.locale}/register`">註冊帳號</router-link> 或 <router-link :to="`/${$i18n.locale}/login`">登入</router-link></strong>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../../store/index'
import firebase from 'firebase/app'
import 'firebase/auth'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async logout () {
      await firebase
        .auth()
        .signOut()
      store.commit('updateWikidotInfo', null)
    }
  }
})
</script>

<style scoped>
</style>
