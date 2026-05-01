import { Outlet } from 'react-router-dom'
import Navbar from './home/Navbar'

function HomeLayout() {
  return (
    <div className="flex min-h-screen bg-black">
      <Navbar />

      <main className="ml-64 min-h-screen flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout
