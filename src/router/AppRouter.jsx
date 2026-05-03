import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import HomePage from '../pages/HomePage'
import MobilePage from '../pages/MobilePage'
import HomeLayout from '../layouts/HomeLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import MobileLayout from '../layouts/MobileLayout'
import BookingFlowPage from '../features/bookings/BookingFlowPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/booking" element={<HomeLayout />}>
          <Route index element={<BookingFlowPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/mobile" element={<MobileLayout />}>
          <Route index element={<MobilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
