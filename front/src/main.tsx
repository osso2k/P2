import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { Toaster } from 'react-hot-toast'
import { ProtectedRoute1, ProtectedRoute2 } from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex min-h-screen w-full bg-[hsl(0,0%,15%)] text-white'>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute1><App/></ProtectedRoute1>} />
          <Route path='/signup' element={<ProtectedRoute2><SignupPage/></ProtectedRoute2>} />
          <Route path='/login' element={<ProtectedRoute2><LoginPage/></ProtectedRoute2>} />
        </Routes>
      </BrowserRouter>

    </div>
  </StrictMode>,
)
