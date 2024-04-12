import { useState } from 'react'
import './Admin.scss'
import AdminHeader from '../Components/AdminHeader/AdminHeader'
import AdminSidebar from '../Components/AdminSideBar/AdminSidebar'
import AdminHome from '../Components/AdminHome/AdminHome'

function AdminHomePage() {
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
}

return (
    <div className='grid-container'>
    <AdminHeader OpenSidebar={OpenSidebar}/>
    <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <AdminHome />
    </div>
)
}

export default AdminHomePage