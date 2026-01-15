import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>

    </div>
  </StrictMode>,
)
