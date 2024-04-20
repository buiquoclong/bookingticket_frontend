import React, {useState} from 'react'
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
function AdminHome() {
    const [kind, setKind] = useState("Một chiều");
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    const handleChange = (event) => {
        setKind(event.target.value);
    }
    const changeDes = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
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
                <div data-aos="fade-up" className="cardDiv">
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
                                    <div className="input  flex">
                                        <input type="text" className="input1" placeholder="Chọn địa điểm xuất phát..." value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                                        <GrLocation className="icon"/>
                                    </div>
                                </div>
                                <div className="changedes" onClick={changeDes}>
                                    <RiArrowLeftRightFill  className="icon"/>
                                </div>
                                <div className="destinationInput">
                                    <label htmlFor="city">Chọn địa điểm đến: </label>
                                    <div className="input flex">
                                        <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/>
                                        <GrLocation className="icon"/>
                                    </div>
                                </div>

                                <div className="dateInput">
                                    <label htmlFor="date">Chọn ngày đi: </label>
                                    <div className="input flex">
                                        <input type="date"/>
                                    </div>
                                </div> 
                            </div>
                            
                            )}
                            {kind === "Khứ hồi" && (
                                <div className="destinationIn sizeTwo">
                                    <div className="destinationInput">
                                        <label htmlFor="city">Chọn địa điểm xuất phát: </label>
                                        <div className="input  flex">
                                            <input type="text" className="input1" placeholder="Chọn địa điểm xuất phát..." value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                                            <GrLocation className="icon"/>
                                        </div>
                                    </div>
                                    <div className="changedes" onClick={changeDes}>
                                        <RiArrowLeftRightFill  className="icon"/>
                                    </div>
                                    <div className="destinationInput">
                                        <label htmlFor="city">Chọn địa điểm đến: </label>
                                        <div className="input flex">
                                            <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/>
                                            <GrLocation className="icon"/>
                                        </div>
                                    </div>

                                    <div className="dateInput">
                                        <label htmlFor="date">Chọn ngày đi: </label>
                                        <div className="input flex">
                                            <input type="date" placeholder="Chon dia diem"/>
                                        </div>
                                    </div>
                                    <div className="dateInput">
                                        <label htmlFor="date">Chọn ngày về: </label>
                                        <div className="input flex">
                                            <input type="date" placeholder="Chon dia diem"/>
                                        </div>
                                    </div> 
                                </div>
                            )}
                            <div className="searchOption flex">
                                <HiFilter className="icon"/>
                                <span>TÌM CHUYẾN</span>
                            </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default AdminHome