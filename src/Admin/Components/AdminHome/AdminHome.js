import React, {useState, useEffect} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill}
from 'react-icons/bs'
import 
{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie } 
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
    const [totalAll, setTotalAll] = useState(null);
    const [totalDay, setTotalDay] = useState(null);
    const [totalMonth, setTotalMonth] = useState(null);
    const [totalUser, setTotalUser] = useState(null);
    const [totalNineMonth, setTotalNineMonth] = useState([]);
    // lấy ngày hiện tại
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    const currentMonth = `${year}-${month}`;
    




    useEffect(() => {
        // Call the API to fetch cities
        fetchCities();
        if(currentDate){
            fetchtoTalByday();
        }
        if(currentMonth){
            fetchtoTalByMonth();
        }
        fetchTotalUser();
        fetchTotalNineMonth();
        fetchTotalAll();
    }, [currentDate, currentMonth]);

    const fetchCities = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/city");
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    const fetchtoTalByday = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/total-by-day?date=${currentDate}`);
            const data = await response.json();
            setTotalDay(data);
        } catch (error) {
            console.error("Error fetching totalDay:", error);
        }
    };
    const fetchtoTalByMonth = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/total-by-month?yearMonth=${currentMonth}`);
            const data = await response.json();
            setTotalMonth(data);
        } catch (error) {
            console.error("Error fetching totalDay:", error);
        }
    };
    const fetchTotalUser = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/user/totalUser`);
            const data = await response.json();
            setTotalUser(data);
        } catch (error) {
            console.error("Error fetching totalDay:", error);
        }
    };
    const fetchTotalAll = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/totalAll`);
            const data = await response.json();
            setTotalAll(data);
        } catch (error) {
            console.error("Error fetching totalDay:", error);
        }
    };
    const fetchTotalNineMonth = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/booking/total/lastNineMonths`);
            const data = await response.json();
            setTotalNineMonth(data);
        } catch (error) {
            console.error("Error fetching totalDay:", error);
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
            if (destinationId !== null && selectedCity.id === destinationId) {
                toast.error("Điểm đi và điểm đến không được giống nhau");
                return;
            }
            setOrigin(selectedCity.name);
            setOriginId(selectedCity.id);
        }
    };
    
    const handleDestinationChange = (event) => {
        const selectedCity = cities.find(city => city.name === event.target.value);
        if (selectedCity) {
            if (originId !== null && selectedCity.id === originId) {
                toast.error("Điểm đi và điểm đến không được giống nhau");
                return;
            }
            setDestination(selectedCity.name);
            setDestinationId(selectedCity.id);
        }
    };

    const handleDayStartChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        if (selectedDate < today) {
            toast.error("Bạn không thể chọn ngày trong quá khứ!");
            return;
        }
        setDayStart(event.target.value);
    };

    const handleDayReturnChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        if (selectedDate < today) {
            toast.error("Bạn không thể chọn ngày trong quá khứ!");
            return;
        }
        if (new Date(dayStart) > selectedDate) {
            toast.error("Ngày về phải là ngày sau ngày đi!");
            return;
        }
        
        setDayReturn(event.target.value);
    };
    const transformedData = totalNineMonth.map(item => ({
        ...item,
        name: `T${item.month}-${item.year}`,
    }));
    const formatYAxis = (tickItem) => {
        return tickItem >= 1000000 ? `${(tickItem / 1000000).toFixed(1)}M` : `${(tickItem / 1000000).toFixed(1)}M`;
    };


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
                        <h1>{totalDay ? `${totalDay.toLocaleString('vi-VN')}đ` : '0đ'}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Tổng doanh thu</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{totalAll ? `${totalAll.toLocaleString('vi-VN')}đ` : '0đ'}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Người dùng</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{totalUser ? totalUser : '0'}</h1>
                </div>
                {/* <div className='card'>
                    <div className='card-inner'>
                        <h3>ALERTS</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>42</h1>
                </div> */}
            </div>
            <div className='totalMain'>
                <div className="titleTot">Doanh số </div>
                <div className='charts'>
                    <div className='monthlyTotal'>
                        <div className='totalMonthly'>
                            <h3>Doanh thu tháng này</h3>
                            <h1>{totalMonth ? `${totalMonth.toLocaleString('vi-VN')}đ` : '0đ'}</h1>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={transformedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"  angle={-45} textAnchor="end"/>
                        <YAxis tickFormatter={formatYAxis} />
                        <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M`}/>
                        <Legend  verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: '20px' }} />
                        <Bar dataKey="revenue" name="Lợi nhuận theo tháng"  fill="#8884d8"  barSize={30}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

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
                                {/* <input type="date" value={dayStart} onChange={(e) => setDayStart(e.target.value)}/> */}
                                <input type="date" value={dayStart} onChange={handleDayStartChange}/>
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
                                    <input type="date" value={dayStart} onChange={handleDayStartChange}/>
                                </div>
                            </div>
                            <div className="dateInput">
                                <label htmlFor="date">Chọn ngày về: </label>
                                <div className="input flex">
                                    <input type="date" value={dayReturn} onChange={handleDayReturnChange}/>
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