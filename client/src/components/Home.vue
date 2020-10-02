<template>
  <div class="hello">
    <h1>{{ $t('message') }}</h1>
    <v-alert type="info" style="width: 90%; margin: 0 auto;">
      <strong>Dev005</strong>更新 : <br/>
      <ul>
        <li>修復 - 無法正常更新wikidot用戶名稱</li><br/>
        <li>新增 - 個人頁面 (Profile) > <em>若用戶有綁定wikidot帳戶則頭貼將自動更新</em></li><br/>
      </ul><br/>
      <q><strong>&#128293; hot update!</strong></q> - ChAoS_UnItY
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
