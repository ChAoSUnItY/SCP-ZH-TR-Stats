<template>
  <div>
    <input
    name="email"
    type="email"
    placeholder="電子信箱"
    v-model="email"/>
    <br>
    <input
    name="password"
    type="password"
    placeholder="密碼"
    v-model="password"/>
    <br>
    <button
    @click="register">註冊</button>
    <br>
    <p>{{ status }}</p>
  </div>
</template>

<script>
import AuthService from '@/service/AuthService'

export default {
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
        await AuthService.register({
          email: this.email,
          password: this.password
        })
      } else {
        this.status = 'ERROR: Email is invalid.'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/input.css';
</style>
