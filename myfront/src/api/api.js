import axios from 'axios'

const Api= axios.create({
    baseURL:"http://localhost:2500"
})

export default Api