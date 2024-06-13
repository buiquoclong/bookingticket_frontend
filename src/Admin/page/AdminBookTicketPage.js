import React  from 'react'
import './Admin.scss'
import AdminBookTicket from '../Components/AdminBookTicket/AdminBookTicket'
import AdminLayout from './AdminLayout'

function AdminBookTicketPage() {

return (
    <AdminLayout>
    <AdminBookTicket />
    </AdminLayout>
)
}

export default AdminBookTicketPage