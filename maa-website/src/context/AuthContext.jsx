// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { adminLogin as apiLogin } from '@/services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('maa-admin-token')
    const savedUser = localStorage.getItem('maa-admin-user')
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('maa-admin-token')
        localStorage.removeItem('maa-admin-user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const { token, user: userData } = await apiLogin(email, password)
    localStorage.setItem('maa-admin-token', token)
    localStorage.setItem('maa-admin-user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('maa-admin-token')
    localStorage.removeItem('maa-admin-user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
