<template>
  <div>
    <input
    name="email"
    type="email"
    placeholder="email"
    v-model="email"/>
    <br>
    <input
    name="password"
    type="password"
    placeholder="password"
    v-model="password"/>
    <br>
    <button
    @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from '@/service/AuthService'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const resR = await AuthService.register({
        email: this.email,
        password: this.password
      })
      console.log(resR.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
