import Api from '@/service/Api'

export default {
  async getAllPosts (username) {
    return Api().get(`/user/${username}/posts`)
  }
}
