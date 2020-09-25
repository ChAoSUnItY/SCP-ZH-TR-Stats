<template>
  <v-app id="app" style="background: url(https://i.imgur.com/krKau4c.png) repeat-x, radial-gradient(circle, rgba(125, 81, 81, 1) 0%, rgba(0, 0, 0, 1) 100%);">
    <div id="container-wrap">
        <div id="header">
            <img class="tataros" src="./assets/img/tataros.png">
            <div id="header-title">
                <h1><a href="/"><span>SCP基金會ZH-Site-17 Tartaros區資料庫</span></a></h1>
                <h2><span>控制，收容，保護</span></h2>
            </div>
        </div>
        <Navbar class="navbar"/>
    </div>
    <br>
    <router-view class="view"/>
  </v-app>
</template>

<script>
import Navbar from './components/nav/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@import './assets/css/default.css';
</style>
