<template>
  <div class="hello">
    <h1>{{ $t('message') }}</h1>
    <v-alert type="info" style="width: 90%; margin: 0 auto;">
      <strong>Dev003</strong>更新 : <br/>
      <ul>
        <li>修復 - 無法正常更新wikidot用戶名稱</li><br/>
        <li>更改 - 個人頁面(Profile) > <em>若未登入則會先跳轉至登入頁面</em></li><br/>
        <li>更改 - 個人頁面(Profile) > <em>若用戶未有文章則顯示無；若資料仍在同步中則顯示<q>同步中</q></em></li><br/>
        <li>更改 - 頂欄帳戶(NavBar - Account) > <em>新增欄位<q>個人頁面</q></em></li><br/>
        <li>新增 - 首頁訊息</li>
      </ul><br/>
      <q><strong>這只是一個小修復，別緊張。:)</strong></q> - ChAoS_UnItY
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
