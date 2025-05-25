import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Removed erroneous Tailwind import from JS entry
import AuthApp from './AuthApp.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-right" />
    <AuthApp />
  </StrictMode>,
)
