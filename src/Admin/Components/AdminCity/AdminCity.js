import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
import "../AdminCity/AdminCity.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminCity = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    
    const [cityName, setCityName] = useState('');
    const [cityImage, setCityImage] = useState(null);
    const [data, setData] = useState([]);
    const [currentCity, setCurrentCity] = useState({ id: null, name: '', imgUrl: '' });
    const [records, setRecords] = useState([]);
    const columns = [
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>ID</div>,
            selector: row => row.id,
            width: '5rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.id}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tên thành phố</div>,
            selector: row => row.name,
            sortable: true,
            width: '20rem',
            cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{row.name}</div>
        },
        {
            name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Ảnh</div>,
            // selector: row => row.image
            cell: row => <img height="50" alt={row.name} src={"http://localhost:8081/" + row.imgUrl} style={{paddingBottom:"1rem", paddingTop:"1rem"}} />
        },
        {
            cell: (row) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <button style={{background:"#3b82f6",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleEditClick(row)}> Sửa </button> | 
                    <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}}> Xóa </button>
                </div>
            )
        }
    ]
    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/city");
            const data = await response.json();
            setData(data);
            setRecords(data);
            console.log("Cities:", data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    
        
        function handleFilter(event){
            const newData = data.filter(row => {
                return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            })
            setRecords(newData)
        }
        const handleEditClick = (city) => {
            setCurrentCity(city);
            setIsEditing(true);
        };

        const handleCreateClick = () => {
            setIsAdd(true)
        };

        const handleCityNameChange = (event) => {
            setCityName(event.target.value)
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setCityImage(imageUrl);
                console.log(imageUrl)
            }
        };
        

        const handleCreateCity = async () => {
            try {
                const newCityData = {
                    name: cityName,
                    imgUrl: cityImage, 
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
        
                const response = await fetch("http://localhost:8081/api/city", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newCityData)
                });
        
                if (response.ok) {
                    // Xử lý thành công
                    console.log("Thành phố đã được tạo thành công!");
                    const newCity = await response.json();
                    setData(prevData => [...prevData, newCity]);
                    setRecords(prevRecords => [...prevRecords, newCity]);
                    
                toast.success("Thành phố đã được tạo thành công!");
                    // Reset form hoặc làm gì đó khác
                    setCityName('');
                    setCityImage(null);
                    setIsAdd(false);
                } else {
                    console.error("Có lỗi xảy ra khi tạo thành phố!");
                    toast.error("Có lỗi xảy ra khi tạo thành phố!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error);
            }
        };
    return(
        <div className="main-container">
            {/* <section className="main section"> */}

            <div className="HisContent">
                <div className="searchIn">
                    <input type="text" onChange={handleFilter} placeholder="Tìm kiếm thành phố" className="findTuyen"/>
                </div>
                <div className="HistoryTick">
                    <div className="contentTikcet">
                        <div className="title">Quản lý thành phố</div>
                        <button className="btn back" onClick={() => handleCreateClick()}>Thêm thành phố</button>
                    </div>
                    <div className="devide"></div>
                    <DataTable
                    columns={columns}
                    data={records}
                    pagination
                    ></DataTable>
                </div>
            </div>
            
            {isEditing && (
                <div className="modal" id="deleteModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Sửa Thành Phố</h2>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên Thành Phố:</label>
                                        <input type="text" value={currentCity.name} onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Hình Ảnh:</label>
                                        <input type="text" value={currentCity.imgUrl} onChange={(e) => setCurrentCity({ ...currentCity, imgUrl: e.target.value })} />
                                    </div>
                                    <div className="listButton">
                                        <button type="button" onClick={() => setIsEditing(false)} className="cancel">Hủy</button>
                                        <button type="submit" className="save">Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )}

            {isAdd && (
                            <div className="modal" id="deleteModal">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h2 class="modal-title">Thêm Thành Phố</h2>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div className="infoCity">
                                                    <label className="info">Tên Thành Phố:</label>
                                                    <input type="text" value={cityName} onChange={handleCityNameChange}/>
                                                </div>
                                                <div className="infoCity">
                                                    <label>Hình Ảnh:</label>
                                                    {/* <input type="text" value={cityImage} onChange={(e) => setCityImage(e.target.value)} /> */}
                                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                                    <img src={cityImage} alt="City" style={{width:"360px", height:"140px"}}/>
                                                </div>
                                                <div className="listButton">
                                                    <button type="button" onClick={() => setIsAdd(false)} className="cancel">Hủy</button>
                                                    <button className="save" onClick={handleCreateCity}>Tạo</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )}      
            {/* </section> */}
            <ToastContainer
                        className="toast-container"
                        toastClassName="toast"
                        bodyClassName="toast-body"
                        progressClassName="toast-progress"
                        theme='colored'
                        transition={Zoom}
                        autoClose={500}
                        hideProgressBar={true}
                        pauseOnHover
                    ></ToastContainer>
        </div>

        
    )
}
export default AdminCity