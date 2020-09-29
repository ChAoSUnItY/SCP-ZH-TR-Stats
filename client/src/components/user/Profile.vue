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
                <p class="text-h6 text--primary"><br/><v-badge color="green" v-if="wikidotUser.username !== ''" content="OK">{{ wikidotUser.username }}</v-badge></p>
                <v-text-field
                  v-model="wikidotUser.username"
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
                v-if="!wikidotUser.avatarURL"
                src="https://image.flaticon.com/icons/png/512/36/36601.png"
                class="userIMG"
              />
              <v-img
                v-else
                :src="wikidotUser.avatarURL"
                class="userIMG"
                style="min-width: 225px;"
              />
            </div>
          </v-layout>
        </v-tab-item>
        <v-tab>
          Your Posts
        </v-tab>
        <v-tab-item>
          <div v-if="!postsLoadingStatus.done">Fetching Data......</div>
          <div v-else-if="postsLoadingStatus.empty">Your wikidot account "{{ wikidotUser.username }}" has no posts.<p></p></div>
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
import AuthService from '@/service/AuthService'
import WikidotSevice from '@/service/WikidotService'

export default Vue.extend({
  name: 'profile',
  data () {
    return {
      postsLoadingStatus: {
        done: false,
        empty: false
      },
      posts: []
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    wikidotUser () {
      return this.$store.getters.wikidotUser
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
          wikidotUser: this.wikidotUser.username
        }).then(result => {
          this.$router.go(this.$router.currentRoute)
        })
    }
  },
  mounted () {
    WikidotSevice.getAllPosts(this.$store.getters.wikidotUser.username).then(result => {
      if (!Array.isArray(result.data)) {
        console.log(result.data)
        this.postsLoadingStatus = {
          done: true,
          empty: true
        }
      } else {
        result.data.forEach((val, i) => {
          Vue.set(this.posts, i, val)
        })
        this.postsLoadingStatus = {
          done: true,
          empty: false
        }
      }
    })
  }
})
</script>

<style scoped>
@import "../../assets/css/user/profile.css";
</style>
