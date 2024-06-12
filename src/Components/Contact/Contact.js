import React, {useState, useEffect} from "react";
import "./Contact.scss";
import "aos/dist/aos.css";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';

const Contact = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value)
    };
    const handleEmailChange = (event) => {
        // setEmail(event.target.value);
        const emailAddress = event.target.value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Biểu thức chính quy kiểm tra email
        
        // Kiểm tra xem email nhập vào có khớp với biểu thức chính quy không
        if (!emailPattern.test(emailAddress)) {
            setEmailErrorMessage("Email không hợp lệ.");
        } else {
            setEmailErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
        }
        setEmail(emailAddress);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };
    const handleContentChange = (event) => {
        setContent(event.target.value)
    };
    
    const handleCreateContact = async (e) => {
        e.preventDefault();
        let missingInfo = [];
        if (!name) {
            missingInfo.push("Tên tài xế");
        }
        if (!email) {
            missingInfo.push("Email");
        } else if (emailErrorMessage) { // Kiểm tra nếu có errorMessage cho email
            toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
            return; // Dừng xử lý tiếp theo nếu có lỗi
        }
        if (!title) {
            missingInfo.push("Tiêu đề");
        }
        if (!content) {
            missingInfo.push("Nội dung");
        }
        if (missingInfo.length > 0) {
            const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
            toast.error(message);
        } else {
            try {
                const newContactData = {
                    content: content,
                    email: email,
                    name: name,
                    title: title
                };
        
                const response = await fetch("http://localhost:8081/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newContactData)
                });
        
                if (response.ok) {
                    // Xử lý thành công
                    console.log("Contact đã được tạo thành công!");
                    toast.success("Contact đã được tạo thành công!");

                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                    
                    // Reset form hoặc làm gì đó khác
                    setName('');
                    setEmail('');
                    setTitle('');
                    setContent('');
                } else {
                    console.error("Có lỗi xảy ra khi tạo contact!");
                    toast.error("Có lỗi xảy ra khi tạo contact!");
                }
            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Lỗi:", error);
            }
        }
    };
    return(
        <div className="contact-form container">
            <div className="contact-info">
                <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
                <h3>RoadLines</h3>
                <p>
                Địa chỉ: Kp.6, Phường Linh Trung, TP Thủ Đức, TP. Hồ Chí Minh<br />
                Điện thoại: 012345678<br />
                Email: roadlinebooking@gmail.com<br />
                </p>
            </div>
            <div className="contact-form-container">
            <form>
                <div className="form-row">
                <div className="form-group">
                    <input type="text" id="name" name="name" placeholder="Họ và tên" value={name} onChange={handleNameChange} required />
                </div>
                <div className="form-group">
                    <input type="email" id="email" placeholder="Email" name="email" value={email} onChange={handleEmailChange} required />
                </div>
                </div>
                <div className="form-group">
                <input type="text" id="subject" placeholder="Tiêu đề" name="subject" value={title} onChange={handleTitleChange} required />
                </div>
                <div className="form-group">
                <textarea id="message" name="message" placeholder="Nhập nội dung" rows="5" value={content} onChange={handleContentChange} required></textarea>
                </div>
                <button type="submit" onClick={handleCreateContact}>Gửi</button>
            </form>
            </div>
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
        
    );
}
export default Contact
