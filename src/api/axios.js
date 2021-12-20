import axios from "axios"

// specify backend service url here
// URL variable in .env

const service = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_API
})

export default service