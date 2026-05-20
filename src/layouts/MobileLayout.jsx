import { Outlet } from 'react-router-dom'
import MobileTopBar from './mobile/MobileTopBar'

function MobileLayout() {
  return (
    <div className="h-dvh min-h-dvh overflow-hidden bg-black text-neutral-100">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[430px] flex-col border-x border-white/10 bg-[linear-gradient(180deg,#111_0%,#050505_100%)] shadow-2xl max-[430px]:border-x-0">
        <MobileTopBar />
        <Outlet />
      </div>
    </div>
  )
}

export default MobileLayout
