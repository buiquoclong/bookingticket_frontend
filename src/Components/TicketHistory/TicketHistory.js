import React, {useState} from "react";
import DataTable from 'react-data-table-component'
import "./TicketHistory.scss";


const TicketHistory = () =>{
    const columns = [
        {
            name: 'Mã vé',
            selector: row => row.Mave, 
            width: '100px'
        },
        {
            name: 'Tuyến',
            selector: row => row.Tuyen
        },
        {
            name: 'Ngày đi',
            selector: row => row.Ngaydi
        },
        {
            name: 'Giờ khởi hành',
            selector: row => row.Giokhoihanh
        },
        {
            name: 'Loại xe',
            selector: row => row.Loaixe
        },
        {
            name: 'Biển số',
            selector: row => row.Bienso
        },
        {
            name: 'Ghế đã chọn',
            selector: row => row.Ghedachon
        },
        {
            name: 'Số lượng vé',
            selector: row => row.Soluongve
        },
        {
            name: 'Tổng tiền',
            selector: row => row.Tongtien
        },
        {
            name: 'Điểm đón',
            selector: row => row.Diemdon
        },
        {
            cell: (row) => (
                <div style={{display:"flex"}}>
                    <a href={`/detail/${row.id}`}> Hủy </a> | 
                    <a href={`/edit/${row.id}`}> Thanh toán </a>
                </div>
            )
        }
    ];

    const data = [
        {
            id: 1, 
            Mave: '1abad', 
            Tuyen: '1', 
            Ngaydi: '26/3', 
            Giokhoihanh: '08:00', 
            Loaixe: 'Limousine', 
            Bienso: '1234', 
            Ghedachon:'A1', 
            Soluongve: '1', 
            Tongtien:'1', 
            Diemdon: 'a'
        },  
        {
            id: 2, 
            Mave: '3', 
            Tuyen: '1', 
            Ngaydi: '26/3', 
            Giokhoihanh: '08:00', 
            Loaixe: 'Limousine', 
            Bienso: '1234', 
            Ghedachon:'A1', 
            Soluongve: '1', 
            Tongtien:'1', 
            Diemdon: 'a'
        },  
        {
            id: 3, 
            Mave: '3', 
            Tuyen: '5', 
            Ngaydi: '26/3', 
            Giokhoihanh: '08:00', 
            Loaixe: 'Limousine', 
            Bienso: '1234', 
            Ghedachon:'A1', 
            Soluongve: '1', 
            Tongtien:'1', 
            Diemdon: 'a'
        },  
        {
            id: 4, 
            Mave: '3', 
            Tuyen: '1', 
            Ngaydi: '26/3', 
            Giokhoihanh: '08:00', 
            Loaixe: 'Limousine', 
            Bienso: '1234', 
            Ghedachon:'A1', 
            Soluongve: '1', 
            Tongtien:'1', 
            Diemdon: 'a'
        },  
        {
            id: 5, 
            Mave: '3', 
            Tuyen: '1', 
            Ngaydi: '26/3', 
            Giokhoihanh: '08:00', 
            Loaixe: 'Limousine', 
            Bienso: '1234', 
            Ghedachon:'A1', 
            Soluongve: '1', 
            Tongtien:'1', 
            Diemdon: 'a'
        },  
        {
            id: 6, 
            Mave: '3', 
            Tuyen: '90', 
            Ngaydi: '26/3', 
            Giokhoihanh: '08:00', 
            Loaixe: 'Limousine', 
            Bienso: '1234', 
            Ghedachon:'A1', 
            Soluongve: '1', 
            Tongtien:'1', 
            Diemdon: 'a'
        }
    ]
    const [records, setRecords] = useState(data);

    function handleFilter(event){
        const newData = data.filter(row => {
            return row.Mave.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
        })
        setRecords(newData)
    }
    return(
        <section className="main section">
            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm chuyến" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Danh sách vé đã đặt</div>
                        <button className="btn back">Trở lại</button>
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    pagination
                    ></DataTable>
                </div>
            </div>
            
            
        </section>
    )
}
export default TicketHistory