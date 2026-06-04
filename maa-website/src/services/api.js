// src/services/api.js
// API service layer — uses mock data for now, easily swappable for real backend

import axios from 'axios'
import {
  TEAM_MEMBERS,
  GALLERY_PHOTOS,
  GALLERY_VIDEOS,
  CSR_ACTIVITIES,
  SPONSOR_NEEDS,
} from '@/data/mockData'

// ---- Axios Instance ----
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ---- Request Interceptor (Auth Token) ----
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('maa-admin-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ---- Response Interceptor (Error Handling) ----
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('maa-admin-token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// ====== MOCK MODE (Development) ======
const USE_MOCK = true // flip to false when backend is ready

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ---- Public API Methods ----
export async function fetchTeam() {
  if (USE_MOCK) {
    await delay()
    return [...TEAM_MEMBERS].sort((a, b) => a.displayOrder - b.displayOrder)
  }
  const { data } = await api.get('/team')
  return data
}

export async function fetchGalleryPhotos(category = 'all') {
  if (USE_MOCK) {
    await delay()
    if (category === 'all') return GALLERY_PHOTOS
    return GALLERY_PHOTOS.filter((p) => p.category === category)
  }
  const { data } = await api.get('/gallery/photos', { params: { category } })
  return data
}

export async function fetchGalleryVideos() {
  if (USE_MOCK) {
    await delay()
    return GALLERY_VIDEOS
  }
  const { data } = await api.get('/gallery/videos')
  return data
}

export async function fetchCSRActivities() {
  if (USE_MOCK) {
    await delay()
    return CSR_ACTIVITIES
  }
  const { data } = await api.get('/csr')
  return data
}

export async function fetchSponsorNeeds() {
  if (USE_MOCK) {
    await delay()
    return SPONSOR_NEEDS
  }
  const { data } = await api.get('/sponsor/needs')
  return data
}

// ---- Contact Form ----
export async function submitContactForm(formData) {
  if (USE_MOCK) {
    await delay(600)
    console.log('Contact form submitted (mock):', formData)
    return { success: true, message: 'Message sent successfully!' }
  }
  const { data } = await api.post('/contact', formData)
  return data
}

// ---- Admin Auth ----
export async function adminLogin(email, password) {
  if (USE_MOCK) {
    await delay(400)
    // Mock auth — any email/password with "admin" works in dev
    if (email === 'admin@maa.org' && password === 'admin123') {
      const token = 'mock-jwt-token-' + Date.now()
      return { token, user: { email, name: 'Admin' } }
    }
    throw new Error('Invalid credentials')
  }
  const { data } = await api.post('/admin/login', { email, password })
  return data
}

// ---- Admin CRUD (Gallery) ----
export async function uploadPhoto(formData) {
  if (USE_MOCK) {
    await delay(800)
    return { id: Date.now(), ...Object.fromEntries(formData.entries()) }
  }
  const { data } = await api.post('/admin/gallery/photos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deletePhoto(id) {
  if (USE_MOCK) {
    await delay(300)
    return { success: true }
  }
  const { data } = await api.delete(`/admin/gallery/photos/${id}`)
  return data
}

export async function uploadVideo(videoData) {
  if (USE_MOCK) {
    await delay(500)
    return { id: Date.now(), ...videoData }
  }
  const { data } = await api.post('/admin/gallery/videos', videoData)
  return data
}

export async function deleteVideo(id) {
  if (USE_MOCK) {
    await delay(300)
    return { success: true }
  }
  const { data } = await api.delete(`/admin/gallery/videos/${id}`)
  return data
}

// ---- Admin CRUD (Team) ----
export async function addTeamMember(formData) {
  if (USE_MOCK) {
    await delay(600)
    return { id: Date.now(), ...Object.fromEntries(formData.entries()) }
  }
  const { data } = await api.post('/admin/team', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function updateTeamMember(id, formData) {
  if (USE_MOCK) {
    await delay(400)
    return { id, ...Object.fromEntries(formData.entries()) }
  }
  const { data } = await api.put(`/admin/team/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deleteTeamMember(id) {
  if (USE_MOCK) {
    await delay(300)
    return { success: true }
  }
  const { data } = await api.delete(`/admin/team/${id}`)
  return data
}

// ---- Admin CRUD (CSR) ----
export async function addCSRActivity(formData) {
  if (USE_MOCK) {
    await delay(600)
    return { id: Date.now(), ...Object.fromEntries(formData.entries()) }
  }
  const { data } = await api.post('/admin/csr', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function updateCSRActivity(id, formData) {
  if (USE_MOCK) {
    await delay(400)
    return { id, ...Object.fromEntries(formData.entries()) }
  }
  const { data } = await api.put(`/admin/csr/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deleteCSRActivity(id) {
  if (USE_MOCK) {
    await delay(300)
    return { success: true }
  }
  const { data } = await api.delete(`/admin/csr/${id}`)
  return data
}

export default api
