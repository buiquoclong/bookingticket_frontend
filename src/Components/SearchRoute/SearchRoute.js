import React, {useState, useEffect} from "react";
import "./SearchRoute.scss";
import DataTable from 'react-data-table-component'
import { GrLocation } from "react-icons/gr";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { TbArrowsRight } from "react-icons/tb";
import { Link, useNavigate  } from 'react-router-dom';

const SearchRoute  = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showInitialResults, setShowInitialResults] = useState(true);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tuyến đường</div>,
            selector: row => row.name,
            width: '15rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Quãng đường</div>,
            selector: row => row.khoangCach,
            sortable: true,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.khoangCach}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Thời gian đi</div>,
            selector: row => row.timeOfRoute,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.timeOfRoute} giờ</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Giá vé</div>,
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>---</div>
        },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <button className="btn back" style={{padding:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer", fontWeight:"600"}} onClick={() => handleSearchRouteClick(row.diemDi.id, row.diemDen.id)}>Tìm tuyến xe</button>
                </div>
            )
        }
    ]

    useEffect(() => {
        // Call the API to fetch cities
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/route");
            const data = await response.json();
            setData(data);
            setRecords(data);
            console.log("Routes:", data);
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };
    function handleStartFilter(event){
        const newData = data.filter(row => {
            return row.diemDi.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
        })
        setRecords(newData)
    }
    function handleEndFilter(event){
        const newData = data.filter(row => {
            return row.diemDen.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
        })
        setRecords(newData)
    }
    const handleSearchRouteClick = (originId, destinationId) => {
    
        // Chuyển hướng đến trang mới và truyền thông tin cần thiết thông qua state của location
        navigate('/', {
            state: {
                diemdiId: originId,
                diemdenId: destinationId
            }
        });
    };
    return (
        <section className="main container section">
            <div className="HisContent">
                
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Các chuyến đi phổ biến</div>
                        <div className="searchRoute">
                            <input type="text" onChange={handleStartFilter} placeholder="Tìm kiếm điểm đi" className="findTuyen"/>
                            <input type="text" onChange={handleEndFilter} placeholder="Tìm kiếm điểm đến" className="findTuyen"/>
                        </div>
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    ></DataTable>
                </div>
            </div>
        </section>
        
        
    )
}
export default SearchRoute;