import React  from 'react'
import './Admin.scss'
import AdminForBookTicket from '../Components/AdminForBookTicket/AdminForBookTicket'
import AdminLayout from './AdminLayout'

function AdminForBookingPage() {

return (
    <AdminLayout>
    <AdminForBookTicket />
    </AdminLayout>
)
}

export default AdminForBookingPage