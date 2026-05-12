import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import EntryValidationPage from '../pages/EntryValidationPage'
import HomePage from '../pages/HomePage'
import MobilePage from '../pages/MobilePage'
import HomeLayout from '../layouts/HomeLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import MobileLayout from '../layouts/MobileLayout'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/mobile" element={<MobileLayout />}>
          <Route index element={<MobilePage />} />
          <Route path=":mobileAccessToken" element={<MobilePage />} />
        </Route>
        <Route path="/entry" element={<MobileLayout />}>
          <Route path=":entryToken" element={<EntryValidationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
