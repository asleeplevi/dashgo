import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/authContext";

let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: "/api",
});

export function setupApiClient(ctx = undefined){
  let cookies = parseCookies(ctx)

  const authApi = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['dashgo.token']}`
    }
  })
  
  authApi.interceptors.response.use( response => {
    return response
  }, (error: AxiosError) => {
    if(error.response.status === 401) {
      if(error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx)
  
        const { 'dashgo.refreshToken': refreshToken } = cookies
        const originalConfig = error.config
  
        if(!isRefreshing) {
          authApi.post('/refresh', { refreshToken })
          .then( response => {
            const { token } = response.data
    
            setCookie(ctx, 'dashgo.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
          })
    
          setCookie(ctx, 'dashgo.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
          })
          authApi.defaults.headers['Authorization'] = `Bearer ${token}`
            failedRequestsQueue.forEach( request => request.resolve(token))
            failedRequestsQueue= []
          }).catch(err => {
            failedRequestsQueue.forEach( request => request.reject(err))
            failedRequestsQueue= []
          }).finally(() => {
            isRefreshing = false
          })
        }
  
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
  
              resolve(authApi(originalConfig))
            },
            reject: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        if(typeof window !== 'undefined') {
          signOut()
        }
      }
  
      return Promise.reject(error)
    }
  })

  return authApi
}

export const  authApi = setupApiClient()