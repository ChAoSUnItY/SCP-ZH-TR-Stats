<template>
  <div>
    <h2>註冊</h2>
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
    @click="register">註冊</button>
    <br>
    <p>{{ status }}</p>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import AuthService from '@/service/AuthService'

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
    async register () {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(this.email).toLowerCase())) {
        AuthService.register({
          email: this.email,
          password: this.password
        }).then(res => {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
            result.user.sendEmailVerification().then(() => {
              console.log('Successfully sent verification email to your email address.')
              firebase.auth().signOut()
              this.$router.push({ name: 'login' })
            })
          })
        }).catch(err => {
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
