import axios from 'axios'
import { useUserStore } from './stores/useUserStore'

const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const token = useUserStore.getState().token
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        const clearUser = useUserStore.getState().clearUser
        clearUser()
        return Promise.reject(err)
    }
)

export default api