<template>
    <div class="inputs">
      <h2>登入</h2>
      <v-text-field
          v-model="email"
          :rules="emailRules"
          type="email"
          v-bind:label="$t('registry.email_address')"
          color="green"
          required
      />
      <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          v-bind:label="$t('registry.password')"
          color="green"
          required
      />
      <v-btn
      @click="login"
      >
      登入
      </v-btn>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '../../store/index'
import authService from '../../service/AuthService'
import wikidotService from '../../service/WikidotService'
import firebase from 'firebase/app'
import 'firebase/auth'

import storeOBJ from '../../store/StoreObject'

export default Vue.extend({
  name: 'register',
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'Email address is required.',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid email address form.'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required.',
        v => v.length >= 6 || 'Password length should be greater than 8 characters.'
      ],
      status: ''
    }
  },
  methods: {
    async login () {
      let user = null
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          user = result.user
        })
        .catch(err => {
          console.log(err)
        })
      await authService
        .getWikidotUsername(user.uid)
        .then(result => {
          wikidotService
            .getAvatarURL(result.data['wikidotUsername'])
            .then(resultB => {
              store.commit('updateWikidotInfo', new storeOBJ.WikidotAccount(result.data['wikidotUsername'], resultB.data['avatarURL']))
              this.$router.push({ name: `profile`, params: { lang: `${this.$i18n.locale}` } })
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
</script>

<style scoped>
@import '../../assets/css/auth.css';
</style>
