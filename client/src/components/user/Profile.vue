<template>
  <div>
    {{ user.email }}
    {{ user.displayName }}
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
/*
import firebase from 'firebase/app'
import 'firebase/auth'
import AuthService from '@/service/AuthService'
*/
export default Vue.extend({
  name: 'profile',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
  }
})
</script>

<style scoped>
</style>
