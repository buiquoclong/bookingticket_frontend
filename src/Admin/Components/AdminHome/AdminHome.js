import React, {useState, useEffect} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill}
from 'react-icons/bs'
import 
{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
from 'recharts';
import { GrLocation } from "react-icons/gr";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { HiFilter } from "react-icons/hi";
import "../AdminHome/AdminHome.scss"
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminHome() {
    const [kind, setKind] = useState("Một chiều");
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    
    const [originId, setOriginId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    
const [dayStart, setDayStart] = useState('');
const [dayReturn, setDayReturn] = useState('');
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/city");
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleChange = (event) => {
        setKind(event.target.value);
    }

    const sendData = (event) => {
        event.preventDefault(); // Ngăn chặn việc reload trang mặc định của form
        
        let missingInfo = []; // Mảng lưu trữ các thông báo thiếu
        
        
        if (kind === "Một chiều") {
            // Kiểm tra xem điểm đi, điểm đến và ngày đã được chọn chưa
            if (!originId) {
                missingInfo.push("Địa điểm xuất phát");
            } 
            if (!destinationId) {
                missingInfo.push("Địa điểm đến");
            } 
            if (!dayStart) {
                missingInfo.push("Ngày đi");
            } 

            // Hiển thị thông báo nếu có thông tin thiếu
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                // Nếu đã chọn đầy đủ thông tin, chuyển đến trang book-ticket
                navigate('/admin/find-trips', {
                    state: {
                        diemDiId: originId,
                        diemDiName: origin,
                        diemDenId: destinationId,
                        diemDenName: destination,
                        dayStart: dayStart,
                        dayReturn: dayReturn,
                        kind: kind
                    }
                });
            }

        } else if (kind === "Khứ hồi") {
            // Kiểm tra xem điểm đi, điểm đến và ngày đã được chọn chưa
            if (!originId) {
                missingInfo.push("Địa điểm xuất phát");
            } 
            if (!destinationId) {
                missingInfo.push("Địa điểm đến");
            } 
            if (!dayStart) {
                missingInfo.push("Ngày đi");
            }
            if (!dayReturn) {
                missingInfo.push("Ngày về");
            }

            // Hiển thị thông báo nếu có thông tin thiếu
            if (missingInfo.length > 0) {
                const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
                toast.error(message);
            } else {
                // Nếu đã chọn đầy đủ thông tin, chuyển đến trang book-ticket
                navigate('/admin/find-trips', {
                    state: {
                        diemDiId: originId,
                        diemDiName: origin,
                        diemDenId: destinationId,
                        diemDenName: destination,
                        dayStart: dayStart,
                        dayReturn: dayReturn,
                        kind: kind
                    }
                });
            }
        }
    
        
    }


    const handleOriginChange = (event) => {
        const selectedCity = cities.find(city => city.name === event.target.value);
        if (selectedCity) {
            setOrigin(selectedCity.name);
            setOriginId(selectedCity.id);
        }
    };
    
    const handleDestinationChange = (event) => {
        const selectedCity = cities.find(city => city.name === event.target.value);
        if (selectedCity) {
            setDestination(selectedCity.name);
            setDestinationId(selectedCity.id);
        }
    };

    const data = [
        {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
        },
        {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
        },
        {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
        },
        {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
        },
        {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
        },
        {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
        },
        {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
        },
    ];


    return (
    <main className='main-container'>
        <div className='dashboardContent'>
            <div className='main-title'>
                <h3>Trang quản trị</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Hôm nay</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>0đ</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Doanh thu</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>1.000.000đ</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Người dùng</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>33</h1>
                </div>
                {/* <div className='card'>
                    <div className='card-inner'>
                        <h3>ALERTS</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>42</h1>
                </div> */}
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className='sachRouteContent'>
            <div className="homeContent container">
                <div className="cardDiv">
                    <div className="radioButtons">
                        <label>
                            <input type="radio"  name="kind" value="Một chiều" checked={kind === "Một chiều"} onChange={handleChange}/>
                                Một chiều 
                        </label>
                        <label>
                            <input type="radio"  name="kind" value="Khứ hồi" checked={kind === "Khứ hồi"} onChange={handleChange}/>
                                Khứ hồi
                        </label>
                    </div>

                    {kind === "Một chiều" && (
                    <div className="destinationIn sizeOne">
                        <div className="destinationInput">
                            <label htmlFor="city">Chọn địa điểm xuất phát: </label>
                            <select className="input" value={origin} onChange={handleOriginChange}>
                                <option value="">Chọn địa điểm xuất phát...</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="destinationInput">
                            <label htmlFor="city">Chọn địa điểm đến: </label>
                            <select className="input" value={destination} onChange={handleDestinationChange}>
                                <option value="">Chọn địa điểm muốn đến...</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="dateInput">
                            <label htmlFor="date">Chọn ngày đi: </label>
                            <div className="input flex">
                                <input type="date" value={dayStart} onChange={(e) => setDayStart(e.target.value)}/>
                            </div>
                        </div> 
                    </div>
                    
                    )}
                    {kind === "Khứ hồi" && (
                        <div className="destinationIn sizeTwo">
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn địa điểm xuất phát: </label>
                                    <select className="input"  value={origin} onChange={handleOriginChange}>
                                        <option value="">Chọn địa điểm xuất phát...</option>
                                        {cities.map(city => (
                                                <option key={city.id} value={city.name}>{city.name}</option>
                                            ))}
                                    </select>
                            </div>
                            <div className="destinationInput">
                                <label htmlFor="city">Chọn địa điểm đến: </label>
                                    {/* <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/> */}
                                    <select className="input" value={destination} onChange={handleDestinationChange}>
                                        <option value="">Chọn địa điểm muốn đến...</option>
                                        {cities.map(city => (
                                                <option key={city.id} value={city.name}>{city.name}</option>
                                            ))}
                                    </select>
                            </div>

                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày đi: </label>
                                <div className="input flex">
                                    <input type="date" value={dayStart} onChange={(e) => setDayStart(e.target.value)}/>
                                </div>
                            </div>
                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày về: </label>
                                <div className="input flex">
                                    <input type="date" value={dayReturn} onChange={(e) => setDayReturn(e.target.value)}/>
                                </div>
                            </div> 
                        </div>
                    )}


    
                    
                        <div className="searchOption flex" onClick={sendData}>
                            <HiFilter className="icon"/>
                            <span>TÌM CHUYẾN</span>
                        </div>
                    
                </div>
            </div>
        </div>
        <ToastContainer
                        className="toast-container"
                        toastClassName="toast"
                        bodyClassName="toast-body"
                        progressClassName="toast-progress"
                        theme='colored'
                        transition={Zoom}
                        autoClose={2000}
                        hideProgressBar={true}
                        pauseOnHover
                    ></ToastContainer>
    </main>
    )
}

export default AdminHome