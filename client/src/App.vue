<template>
  <div id="app">
    <div id="container-wrap">
        <div id="header">
            <img class="tataros" src="./assets/img/tataros.png">
            <div id="header-title">
                <h1><a href="/"><span>SCP基金會ZH-Site-17 Tartaros區資料庫</span></a></h1>

                <h2><span>控制，收容，保護</span></h2>
            </div>
            <img class="tataros" src="./assets/img/tataros.png">
        </div>
    </div>
    <br>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/default.css';
</style>
