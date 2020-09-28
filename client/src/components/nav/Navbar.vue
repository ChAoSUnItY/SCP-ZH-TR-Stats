<template>
  <nav>
      <div class="menu-item"><a href="/">主頁</a></div>
      <div class="menu-item"><a href="#">從缺</a></div>
      <div class="menu-item"><a href="#">從缺</a></div>
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
          link: '/register'
        },
        {
          title: '帳戶',
          link: '/profile'
        },
        {
          title: '登入',
          link: '/login'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/nav/navbar.css';
</style>
