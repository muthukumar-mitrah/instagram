import React, { createContext, useContext, useState, useEffect } from 'react'
import { getStories } from '../Services'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [stories, setStories] = useState([])

    const getAllStories = async () => {
        try {
            const res = await getStories()
            setStories(res)
            console.log('accessToken', res)
        } catch(error) {
            console.error('error', error)
        }
    }

    useEffect(() => {
        getAllStories()
    }, [])

    return (
        <AuthContext.Provider value={{ stories, getAllStories }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuth = () => {
    const auth = useContext(AuthContext)

    if(!auth) {
        throw new Error('Cannot access authContext outside AuthContextProvider')
    }
    return auth
}