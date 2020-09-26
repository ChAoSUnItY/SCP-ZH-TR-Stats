<template v-if="user">
  <div>
    <v-alert
    type="warning"
    v-if="user.emailVerified === false"
    class="alert"
    >Please verify your email address.</v-alert>
    <div id="page-content">
      <v-layout class="leftLayout">
      <v-card
      class="mx-auto card"
      max-width="max-width"
      >
        <v-card-text class="text-left">
          <div>Username</div>
          <p class="text-h6 text--primary">{{ user.displayName }}</p>
        </v-card-text>
      </v-card>
      <v-card
      class="mx-auto card"
      max-width="max-width"
      >
        <v-card-text class="text-left">
          <div>Email Address</div>
          <p class="text-h6 text--primary">{{ user.email }}</p>
        </v-card-text>
      </v-card>
      <v-card
      class="mx-auto card"
      max-width="max-width"
      >
        <v-card-text class="text-left">
          <div>UID</div>
          <p class="text-h6 text--primary">{{ user.uid }}</p>
        </v-card-text>
      </v-card>
      <v-card
      class="mx-auto card"
      max-width="max-width"
      >
        <v-card-text class="text-left">
          <div>Wikidot Username</div>
          <p class="text-h6 text--primary">Not available</p>
          <v-text-field
          v-model="wikidotUsername"
          label="wikidot username"
          color="green"
          required
          />
          <v-btn
          @click="syncUserWikidotAccount"
          >
          更新
          </v-btn>
        </v-card-text>
      </v-card>
      </v-layout>
      <v-layout class="rightLayout">
        <div class="avatar">
          <v-img
          v-if="user.photoUrl === undefined"
          src="https://image.flaticon.com/icons/png/512/36/36601.png"
          class="userIMG"
          />
          <v-img
          v-else
          src="https://image.flaticon.com/icons/png/512/36/36601.png"
          class="userIMG"
          />
          <div class="btn">
            <input id="fileUpload" type="file" hidden>
            <v-btn class="v-btn" @click="chooseFile">Upload</v-btn>
          </div>
        </div>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import AuthService from '@/service/AuthService'

export default Vue.extend({
  name: 'profile',
  data () {
    return {
      wikidotUsername: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async chooseFile () {
      document.getElementById('fileUpload').click()
    },
    async syncUserWikidotAccount () {
      AuthService.linkWikidotUsername({
        uid: this.user.uid,
        wikidotUsername: this.wikidotUsername
      }).then(result => {
      }).catch(err => {
        console.log(err)
      })
      AuthService.getWikidotUsername(this.user.uid).then(result => {
        console.log(result)
      })
    }
  }
})
</script>

<style scoped>
@import '../../assets/css/user/profile.css';
</style>
