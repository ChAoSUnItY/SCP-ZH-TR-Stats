<template>
  <div>
    <v-alert type="warning" v-if="user.emailVerified === false" class="alert"
      >Please verify your email address.</v-alert
    >
    <div id="page-content">
      <v-tabs id="tab">
        <v-tab>
          User Info
        </v-tab>
        <v-tab-item>
          <v-layout class="leftLayout">
            <v-card class="mx-1 card" max-width="max-width">
              <v-card-text class="text-left">
                <div>Username</div>
                <p class="text-h6 text--primary">{{ user.displayName }}</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-1 card" max-width="max-width">
              <v-card-text class="text-left">
                <div>Email Address</div>
                <p class="text-h6 text--primary">{{ user.email }}</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-1 card" max-width="max-width">
              <v-card-text class="text-left">
                <div>UID</div>
                <p class="text-h6 text--primary">{{ user.uid }}</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-1 card" max-width="max-width">
              <v-card-text class="text-left">
                <div>Wikidot Username</div>
                <p class="text-h6 text--primary"><br/><v-badge color="green" v-if="wikidotUsername !== ''" content="OK">{{ wikidotUsername }}</v-badge></p>
                <v-text-field
                  v-model="wikidotUsername"
                  label="wikidot username"
                  color="green"
                  required
                />
                <v-btn @click="syncUserWikidotAccount"> 更新 </v-btn>
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
                <input id="fileUpload" type="file" hidden />
                <v-btn class="v-btn" @click="chooseFile">Upload</v-btn>
              </div>
            </div>
          </v-layout>
        </v-tab-item>
        <v-tab>
          Your Posts
        </v-tab>
        <v-tab-item>
          <v-card v-for="(item, index) in posts" :key="index" class="mx-1 card" max-width="max-width">
            <v-card-text class="text-left">
                <a :href="item.url" class="text-h5 text--primary">{{ item.title }}</a><b style="float: right;">評分 {{ item.rating }}</b>
                <p class="text-subtitle1 text--secondary">{{ item.preview }}</p>
              </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import AuthService from '@/service/AuthService'
import WikidotSevice from '@/service/WikidotService'

export default Vue.extend({
  name: 'profile',
  data () {
    return {
      wikidotUsername: '',
      posts: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user (newVal) {
      if (newVal) {
        AuthService.getWikidotUsername(newVal.uid).then(result => {
          this.wikidotUsername = result.data['wikidotUsername']
          WikidotSevice.getAllPosts(this.wikidotUsername).then(result => {
            result.data.forEach((val, i) => {
              Vue.set(this.posts, i, val)
            })
          })
        })
      }
    }
  },
  methods: {
    async chooseFile () {
      document.getElementById('fileUpload').click()
    },
    async syncUserWikidotAccount () {
      AuthService
        .linkWikidotUsername({
          uid: this.user.uid,
          wikidotUsername: this.wikidotUsername
        }).then(result => {
          this.$router.go(this.$router.currentRoute)
        })
    }
  }
})
</script>

<style scoped>
@import "../../assets/css/user/profile.css";
.v-window__container {
    height: 100%
  }
</style>
