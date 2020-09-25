<template>
  <div>
    <h2>登入</h2>
    <v-alert type="success">OOPS</v-alert>
    <input
    name="email"
    type="email"
    id="email-input"
    v-bind:placeholder="$t('registry.email_address')"
    v-model="email"/>
    <br>
    <input
    name="password"
    type="password"
    id="password-input"
    v-bind:placeholder="$t('registry.password')"
    v-model="password"/>
    <br>
    <button
    @click="login">登入</button>
    <br>
    <p>{{ status }}</p>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default Vue.extend({
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      status: ''
    }
  },
  methods: {
    async login () {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(this.email).toLowerCase())) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            console.log(user)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.status = 'ERROR: Email is invalid.'
      }
    }
  }
})
</script>

<style scoped>
@import '../../assets/css/auth.css';
</style>
