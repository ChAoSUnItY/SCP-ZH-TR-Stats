import Api from '@/service/Api'

export default {
  async register (data) {
    return Api().post('/register', data)
  },
  status () {
    return Api().get('/status')
  },
  async linkWikidotUsername (data) {
    return Api().post('/link', data)
  },
  async getWikidotUsername (uid) {
    return Api().get('/link', { params: { uid: uid } })
  }
}
