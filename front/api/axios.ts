import axios from 'axios'

const api = axios.create({
    baseURL: (import.meta as any).env.VITE_SERVER_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},(err)=>{return Promise.reject(err)})

api.interceptors.response.use((response)=>response,(err)=>{
    if(err.response?.status === 401){
        localStorage.removeItem("token")
        window.location.href = "/login"
    }    
    return Promise.reject(err)
})

export default api