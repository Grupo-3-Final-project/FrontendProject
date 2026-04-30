import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import HomePage from '../pages/HomePage'
import MobilePage from '../pages/MobilePage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mobile" element={<MobilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
