import React, {useState} from "react";
import "./SearchTicket.scss";


const SearchTicket  = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ticketCode, setTicketCode] = useState('');
    const [showWarningPhone, setShowWarningPhone] = useState(false);
    const [showWarningTicket, setShowWarningTicket] = useState(false);

    const handleSearch = () => {
        if (phoneNumber === '') {
            setShowWarningPhone(true);
        } else {
            setShowWarningPhone(false);
        }

        if (ticketCode === '') {
            setShowWarningTicket(true);
        } else {
            setShowWarningTicket(false);
        }
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setShowWarningPhone(e.target.value === '');
    };

    const handleTicketCodeChange = (e) => {
        setTicketCode(e.target.value);
        setShowWarningTicket(e.target.value === '');
    };

    return (
            <section className="main container section">
                <div className="searchTicket ">
                    <div className="secTitle">
                        <h3 data-aos="fade-right" className="title">
                            TRA CỨU THÔNG TIN ĐẶT VÉ
                        </h3>
                    </div>

                    <form className="infoTicket">
                        <div className="form-feild">
                            <input type="text" className="input" placeholder=" " value={phoneNumber} onChange={handlePhoneNumberChange}/>
                            <label for="name" className="label"> Vui lòng nhập Email</label>
                        </div>
                        {showWarningPhone && <span style={{ color: 'red', paddingLeft:"20px" }}>Vui lòng nhập số điện thoại</span>}
                        <div className="form-feild">
                            <input type="text" className="input" placeholder=" " value={ticketCode} onChange={handleTicketCodeChange}/>
                            <label for="name" className="label"> Vui lòng nhập mã vé</label>
                        </div>
                        {showWarningTicket && <span style={{ color: 'red', paddingLeft:"20px" }}>Vui lòng nhập mã vé</span>}
                        <button className="btn" onClick={handleSearch}>Tra cứu</button>
                    </form>
                </div>
            </section>
    )
}
export default SearchTicket;