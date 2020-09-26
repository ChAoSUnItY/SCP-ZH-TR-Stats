<template>
  <div class="inputs">
    <h2>註冊</h2>
      <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="用戶名"
          color="green"
          required
      />
      <v-text-field
          v-model="email"
          :rules="emailRules"
          v-bind:label="$t('registry.email_address')"
          color="green"
          required
      />
      <v-text-field
          v-model="password"
          :rules="passwordRules"
          v-bind:label="$t('registry.password')"
          color="green"
          required
      />
      <v-btn
      @click="register"
      >
      註冊
      </v-btn>
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
      username: '',
      usernameRules: [
        v => !!v || 'Username is required.',
        v => /^[0-9a-zA-z]+$/.test(v) || 'Username contains invalid characters.'
      ],
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
    async register () {
      AuthService.register({
        displayName: this.username,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.error !== undefined) {
          switch (res.data.error) {
            case 'ALREADY_EXISTS':
              this.status = 'ERROR: Email is already existed.'
              break
            default:
              this.status = 'ERROR: Unexpected error.'
          }
        } else {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
            result.user.sendEmailVerification().then(() => {
              console.log('Successfully sent verification email to your email address.')
              firebase.auth().signOut()
              this.$router.push({ name: 'login' })
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
</script>

<style scoped>
@import '../../assets/css/auth.css';
</style>
