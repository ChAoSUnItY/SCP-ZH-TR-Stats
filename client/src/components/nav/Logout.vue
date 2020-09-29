<template>
  <div>
    <strong v-if="user">{{ user.displayName }} <a href="/" @click="logout">登出</a></strong>
    <strong v-else><a href="/register">註冊帳號</a>或<a href="/login">登入</a></strong>
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
