<template>
  <div class="hello">
    <h1>{{ $t('message') }}</h1>
    <v-alert type="info" style="width: 90%; margin: 0 auto;">
      <strong>Dev004</strong>更新 : <br/>
      <ul>
        <li>修復 - 無法正常更新wikidot用戶名稱</li><br/>
        <li>更改 - 全網域 > <em>目前能使用/tw/及/en/來更改語言(仍在翻譯中)</em></li><br/>
      </ul><br/>
      <q><strong>&#128293; Checkout Firebase!</strong></q> - ChAoS_UnItY
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
