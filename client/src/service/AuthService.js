import Api from '@/service/Api'

export default {
  async register (data) {
    return Api().post('/register', data)
  },
  status () {
    return Api().get('/status')
  }
}
