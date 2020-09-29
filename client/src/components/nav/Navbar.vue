<template>
  <nav>
      <div class="menu-item"><router-link :to="`/${$i18n.locale}`">主頁</router-link></div>
      <div class="menu-item"><router-link :to="`/`">N/A</router-link></div>
      <div class="menu-item"><router-link :to="`/`">N/A</router-link></div>
      <Dropdown title="帳戶" :items="services" />
  </nav>
</template>

<script>
import Dropdown from './Dropdown'

export default {
  name: 'navbar',
  components: {
    Dropdown
  },
  data () {
    return {
      services: [
        {
          title: '註冊',
          link: 'register'
        },
        {
          title: '帳戶',
          link: 'profile'
        },
        {
          title: '登入',
          link: 'login'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/nav/navbar.css';
</style>
