import { createContext, ReactNode, useEffect, useState } from "react";
import { authApi } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from "next/router";

type User = {
    email: string
    permissions: string[]
    roles: string[]
}

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
    isAuthenticated: boolean
    user: User
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
    children: ReactNode
}

let authChannel: BroadcastChannel

export function signOut(){
    destroyCookie(undefined, 'dashgo.token')
    destroyCookie(undefined, 'dashgo.refreshToken')
    authChannel.postMessage('signOut')
    Router.push('/')
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>()

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await authApi.post('sessions', {
                email, password
            })
            const { permissions, roles, token, refreshToken } = response.data

            setCookie(undefined, 'dashgo.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            setUser({ email, permissions, roles })
            authApi.defaults.headers['Authorization'] = `Bearer ${token}`
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const { 'dashgo.token': token } = parseCookies()
        
        if(token) [
            authApi.get('/me').then(response => {
                const { email, permissions, roles } = response.data

                setUser({email, permissions, roles})
            }).catch(() => {
               signOut()
            })
        ]
    }, [])

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')
        authChannel.onmessage = (message) => {
            switch(message.data){
                case 'signOut':
                    signOut()
                    break
                default: 
                    break
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated: !!user, user, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}