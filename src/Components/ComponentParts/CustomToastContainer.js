import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ComponentParts.scss";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      className="toast-container"
      toastClassName="toast"
      bodyClassName="toast-body"
      progressClassName="toast-progress"
      theme="colored"
      transition={Slide}
      autoClose={1500} // chỉnh lại thời gian nếu muốn
      hideProgressBar={false}
      pauseOnHover
    />
  );
};

export default CustomToastContainer;
