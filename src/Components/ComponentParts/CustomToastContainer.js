import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      containerId="main"
      className="toast-container"
      toastClassName="toast"
      bodyClassName="toast-body"
      progressClassName="toast-progress"
      theme="colored"
      transition={Zoom}
      autoClose={5000} // chỉnh lại thời gian nếu muốn
      hideProgressBar={true}
      pauseOnHover
    />
  );
};

export default CustomToastContainer;
