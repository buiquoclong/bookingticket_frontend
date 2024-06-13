import { useState } from 'react'
import './Admin.scss'
import AdminHeader from '../Components/AdminHeader/AdminHeader'
import AdminSidebar from '../Components/AdminSideBar/AdminSidebar'

const AdminLayout = ({ children }) => {
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
}

return (
    <div className='grid-container'>
    <AdminHeader OpenSidebar={OpenSidebar}/>
    <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    {children}
    </div>
)
}

export default AdminLayout