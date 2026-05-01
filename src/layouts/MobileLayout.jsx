import { Outlet } from "react-router-dom"

function MobileLayout() {
  return (
   <div>
    <h1>Mobile</h1>
    <Outlet/>
   </div>
  )
}

export default MobileLayout
