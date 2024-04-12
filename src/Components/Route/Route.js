import React, {useState} from "react";
import "./Route.scss";
import { GrLocation } from "react-icons/gr";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { TbArrowsRight } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Route  = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showInitialResults, setShowInitialResults] = useState(true);

    const changeDes = () => {
        // Swap values between origin and destination inputs
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    const handleSearch = () => {
        let results = [];
        
        if (origin && destination) {
            results = Data.filter(route => 
                route.diemdau === origin && route.diemcuoi === destination
            );
        } else if (origin) {
            results = Data.filter(route => route.diemdau === origin);
        } else if (destination) {
            results = Data.filter(route => route.diemcuoi === destination);
        }
        
        setSearchResults(results);
        setShowInitialResults(false); 
        setShowSearchResults(true); 
    };

    const Data = [
        {
            id: 1,
            tentuyen: 'Sài Gòn - Đà Nẵng',
            diemdau: 'Sài Gòn',
            diemcuoi: 'Đà Nẵng',
            loaixe: 'Giường nằm',
            dodai: '959km',
            thoigiandi: '20 giờ'
        },
        {
            id: 2,
            tentuyen: 'Sài Gòn - Đà Lạt',
            diemdau: 'Sài Gòn',
            diemcuoi: 'Đà Lạt',
            loaixe: 'Giường nằm',
            dodai: '959km',
            thoigiandi: '20 giờ'
        },
        {
            id: 3,
            tentuyen: 'Đà Nẵng - Sài Gòn',
            diemdau: 'Đà Nẵng',
            diemcuoi: 'Sài Gòn',
            loaixe: 'Giường nằm',
            dodai: '959km',
            thoigiandi: '20 giờ'
        },
        {
            id: 4,
            tentuyen: 'Đà Nẵng - Đà Lạt',
            diemdau: 'Đà Nẵng',
            diemcuoi: 'Đà Lạt',
            loaixe: 'Giường nằm',
            dodai: '959km',
            thoigiandi: '20 giờ'
        },
        {
            id: 5,
            tentuyen: 'Đà Lạt - Sài Gòn',
            diemdau: 'Đà Lạt',
            diemcuoi: 'Sài Gòn',
            loaixe: 'Giường nằm',
            dodai: '959km',
            thoigiandi: '20 giờ'
        },
        {
            id: 6,
            tentuyen: 'Đà Lạt - Đà Nẵng',
            diemdau: 'Đà Lạt',
            diemcuoi: 'Đà Nẵng',
            loaixe: 'Giường nằm',
            dodai: '959km',
            thoigiandi: '20 giờ'
        }
    ]

    return (
        <section className="main container section">
            <div className="seacrhRoute flex">
                <div className="destinationInput">
                        <div className="input  flex">
                            <input type="text" className="input1" placeholder="Chọn địa điểm xuất phát..." value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                            <GrLocation className="icon"/>
                        </div>
                </div>
                <div className="changedes" onClick={changeDes}>
                    <RiArrowLeftRightFill  className="icon"/>
                </div>
                <div className="destinationInput">
                        <div className="input flex">
                            <input type="text" placeholder="Chọn địa điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}/>
                            <GrLocation className="icon"/>
                        </div>
                </div>
                <div className="seachRoute">
                    <button className="btn" onClick={handleSearch}>Tìm</button>
                </div>
            </div>

            <div className="routeDetails">
                <div className="routeCard">
                    <div className="col_6">Tuyến đường</div>
                    <div className="col_3">Loại xe</div>
                    <div className="col_3">Quãng đường</div>
                    <div className="col_4">Thời gian hành trình</div>
                    <div className="col_2">Giá vé</div>
                </div>
                <div className="content">
                    {showInitialResults && (
                        <>
                            {Data.map(({ id, diemdau, diemcuoi, loaixe, dodai, thoigiandi }) => (
                                <div key={id} className="routeCard_row">
                                    <div className="col_6 routename">
                                        <span>{diemdau}</span>
                                        <TbArrowsRight className="icon"/>
                                        <span>{diemcuoi}</span>
                                    </div>
                                    <div className="col_3">{loaixe}</div>
                                    <div className="col_3">{dodai}</div>
                                    <div className="col_4">{thoigiandi}</div>
                                    <div className="col_2">---</div>
                                    <div className="seach_col">
                                        <Link to="/book-ticket"><button className="btn">Tìm tuyến xe</button></Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}



                    {/* {
                        Data.map(({id, tentuyen, diemdau, diemcuoi, loaixe, dodai, thoigiandi}) => {
                            return (
                                <div key={id} className="routeCard_row">
                                    <div className="col_6 routename">
                                        <span>{diemdau}</span>
                                        <TbArrowsRight className="icon"/>
                                        <span>{diemcuoi}</span>
                                    </div>
                                    <div className="col_3">{loaixe}</div>
                                    <div className="col_3">{dodai}</div>
                                    <div className="col_4">{thoigiandi}</div>
                                    <div className="col_2">---</div>
                                    <div className="seach_col">
                                        <button className="btn">Tìm tuyến xe</button>
                                    </div>
                                </div>
                            )
                        })
                    } */}

                    {showSearchResults && (
                        <>
                            {searchResults.length > 0 ? (
                                searchResults.map(({ id, diemdau, diemcuoi, loaixe, dodai, thoigiandi }) => (
                                    <div key={id} className="routeCard_row">
                                        <div className="col_6 routename">
                                            <span>{diemdau}</span>
                                            <TbArrowsRight className="icon"/>
                                            <span>{diemcuoi}</span>
                                        </div>
                                        <div className="col_3">{loaixe}</div>
                                        <div className="col_3">{dodai}</div>
                                        <div className="col_4">{thoigiandi}</div>
                                        <div className="col_2">---</div>
                                        <div className="seach_col">
                                            <Link to="/book-ticket"><button className="btn">Tìm tuyến xe</button></Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="routeCard_row">
                                    <div className="col_nofound">Không có chuyến xe phù hợp</div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
        
        
    )
}
export default Route;