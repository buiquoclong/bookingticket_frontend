import React, {useState} from "react";
import "./InfoUser.scss";
import {useLocation } from 'react-router-dom';


const InfoUser  = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    console.log("userId", userId);

    
    return (
            <section className="main container section">
                <div className="infoContent ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            THÔNG TIN CÁ NHÂN
                        </h3>
                    </div>
                    <div className="infoUser">
                        <div className="lineInfo">
                            <span>Tên:</span>
                            <div >
                                <input type="text" className="Note" placeholder="Thêm ghi chú ở đây"/>
                            </div>
                        </div>
                        <div className="lineInfo">
                            <span>Số điện thoại:</span>
                            <div >
                                <input type="text" className="Note" placeholder="Thêm ghi chú ở đây"/>
                            </div>
                        </div>
                        <div className="lineInfo">
                            <span>Email:</span>
                            <div >
                                <input type="text" className="Note" placeholder="Thêm ghi chú ở đây"/>
                            </div>
                        </div>
                        <div className="buttonSave">
                            <button className="btn save">Lưu thay đổi</button>
                        </div>
                        
                    </div>
                </div>
            </section>
    )
}
export default InfoUser;