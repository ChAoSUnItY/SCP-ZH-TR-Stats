import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: window.webpackHotUpdate ? 'http://localhost:8081/' : 'https://scp-zh-tr-stats-backend.herokuapp.com/'
  })
}
