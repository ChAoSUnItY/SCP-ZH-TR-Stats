import Api from '@/service/Api'

export default {
  register (data) {
    return Api().post('/register', data)
  },
  status () {
    return Api().get('/status')
  }
}
