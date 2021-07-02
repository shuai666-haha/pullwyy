import axios from 'axios'

let request = axios.create({
    baseURL: 'http://39.106.201.40:3000'
})

export default request