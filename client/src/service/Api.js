import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://scp-zh-tr-stats-backend.herokuapp.com/'
  })
}
