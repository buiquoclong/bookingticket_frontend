import React, {useState, useEffect} from "react";
import DataTable from 'react-data-table-component'
// import "../AdminCity/AdminCity.scss"
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Pagination, Breadcrumbs, Link} from '@mui/material';


const AdminCity = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    
    const [cityName, setCityName] = useState('');
    const [cityImage, setCityImage] = useState(null);
    const [data, setData] = useState([]);
    const [currentCity, setCurrentCity] = useState({ id: null, name: '', imgUrl: '' });
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
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
                    <button style={{background:"#ef4444",paddingInline:"1rem",paddingTop:".5rem",paddingBottom:".5rem", borderRadius:".5rem", color:"white", border:"none", cursor:"pointer"}} onClick={() => handleRemoveClick(row)}> Xóa </button>
                </div>
            )
        }
    ]
    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
    }, [page]);

    const fetchCities = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/city/page?page=${page}&size=10`);
            const data = await response.json();
            setData(data.cities);
            setRecords(data.cities);
            setTotalPages(data.totalPages)
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
        const handleRemoveClick = async (city) => {
            const cityId = city.id;
            try {
                const response = await fetch(`http://localhost:8081/api/city/${cityId}`, {
                method: "DELETE"
            });
                if (response.ok) {
                    
                    // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
                    const updatedCities = records.filter(record => record.id !== cityId);
                    setRecords(updatedCities);
                    toast.success("Thành phố đã được xóa thành công!");
                } else {
                    console.error("Có lỗi xảy ra khi xóa thành phố!");
                    toast.error("Có lỗi xảy ra khi xóa thành phố!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error.message);
            }
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
        const handCancel = () => {
            setIsAdd(false);
            setIsEditing(false);
            setCityImage(null);
        };
        const handleUpdateCity = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('city', new Blob([JSON.stringify({ name: currentCity.name })], { type: 'application/json' }));
                if (cityImage) {
                    const fileField = document.querySelector('input[type="file"]');
                    formData.append('file', fileField.files[0]);
                }
        
                const response = await fetch(`http://localhost:8081/api/city/${currentCity.id}`, {
                    method: "PUT",
                    body: formData
                });
        
                if (response.ok) {
                    // Xử lý thành công
                    const updatedCity = await response.json();
                    const updatedCities = records.map(city => {
                        if (city.id === updatedCity.id) {
                            return updatedCity;
                        }
                        return city;
                    });
                    setRecords(updatedCities);
                    
                    toast.success("Thành phố đã được cập nhật thành công!");
                    // Reset form hoặc làm gì đó khác
                    setCityName('');
                    setCityImage(null);
                    setIsEditing(false);
                } else {
                    console.error("Có lỗi xảy ra khi cập nhật thành phố!");
                    toast.error("Có lỗi xảy ra khi cập nhật thành phố!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error);
            }
        };

        const handleCreateCity = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                const newCityData = {
                    name: cityName
                };
                formData.append('city', new Blob([JSON.stringify(newCityData)], { type: 'application/json' }));
                if (cityImage) {
                    const fileField = document.querySelector('input[type="file"]');
                    formData.append('file', fileField.files[0]);
                }
        
                const response = await fetch("http://localhost:8081/api/city", {
                    method: "POST",
                    body: formData
                });
        
                if (response.ok) {
                    // Xử lý thành công
                    console.log("Thành phố đã được tạo thành công!");
                    const newCity = await response.json();
                    newCity.imgUrl = `http://localhost:8081${newCity.imgUrl}`; // Update the URL to be absolute
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
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
    return(
        <div className="main-container">
            {/* <section className="main section"> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                Admin
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/admin"
                >
                Thành phố
                </Link>
            </Breadcrumbs>

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
                    // pagination
                    ></DataTable>
                    <Pagination 
                        count={totalPages}
                        boundaryCount={1}
                        siblingCount={1} 
                        color="primary"
                        showFirstButton showLastButton 
                        style={{float:"right", padding:"1rem"}}
                        page={page}
                        onChange={handleChangePage}
                        /> 
                </div>
            </div>
            
            {isEditing && (
                <div className="modal" id="deleteModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Sửa Thành Phố</h2>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="infoCity">
                                        <label className="info">Tên Thành Phố:</label>
                                        <input type="text" value={currentCity.name} onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })} />
                                    </div>
                                    <div className="infoCity">
                                        <label>Hình Ảnh:</label>
                                        <div style={{ width: "18rem" }}>
                                            {cityImage && (
                                                <img className="inputValue" src={cityImage} alt="City" style={{ width: "18rem", height: "140px" }} />
                                            )}
                                            {!cityImage && currentCity.imgUrl && (
                                                <img className="inputValue" src={"http://localhost:8081/" + currentCity.imgUrl} alt="City" style={{ width: "18rem", height: "140px" }} />
                                            )}
                                            <input className="inputValue" type="file" accept="image/*" onChange={handleImageChange} />
                                        </div>
                                    </div>
                                    <div className="listButton">
                                        <button type="button"  onClick={handCancel} className="cancel">Hủy</button>
                                        <button type="submit" className="save" onClick={handleUpdateCity}>Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )}

            {isAdd && (
                            <div className="modal" id="deleteModal">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h2 className="modal-title">Thêm Thành Phố</h2>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="infoCity">
                                                    <label className="info">Tên Thành Phố:</label>
                                                    <input type="text" value={cityName} onChange={handleCityNameChange}/>
                                                </div>
                                                <div className="infoCity">
                                                    <label>Hình Ảnh:</label>
                                                    {/* <input type="text" value={cityImage} onChange={(e) => setCityImage(e.target.value)} /> */}
                                                    <div style={{width:"18rem"}}>
                                                        {cityImage &&(
                                                            <img className="inputValue" src={cityImage} alt="City" style={{width:"18rem", height:"140px"}}/>
                                                        )}
                                                        <input className="inputValue" type="file" accept="image/*" onChange={handleImageChange} />
                                                    </div>
                                                </div>
                                                <div className="listButton">
                                                    <button type="button" onClick={handCancel} className="cancel">Hủy</button>
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