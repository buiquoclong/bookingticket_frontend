import { useState } from 'react'
import './Admin.scss'
import AdminHeader from '../Components/AdminHeader/AdminHeader'
import AdminSidebar from '../Components/AdminSideBar/AdminSidebar'
import AdminVehicle from '../Components/AdminVehicle'

function AdminVehiclePage() {
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
}

return (
    <div className='grid-container'>
    <AdminHeader OpenSidebar={OpenSidebar}/>
    <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <AdminVehicle />
    </div>
)
}

export default AdminVehiclePage