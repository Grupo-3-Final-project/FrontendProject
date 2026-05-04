import { Outlet } from 'react-router-dom'
import Navbar from './home/Navbar'

function HomeLayout() {
  return (
    <div className="flex min-h-screen bg-black">
      <Navbar />

      <main className="min-h-screen flex-1 overflow-y-auto pt-20 md:ml-64 md:pt-0">
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout
