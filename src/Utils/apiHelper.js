import { toast } from "react-toastify";

/**
 * ✅ Kiểm tra các field bắt buộc có giá trị
 * @param {Object} fields - Ví dụ: { name: "Loại xe", startDay: "Ngày bắt đầu" }
 * @returns {boolean} true nếu hợp lệ, false nếu thiếu
 */
export const validateFields = (fields) => {
  const missing = Object.entries(fields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    const message = `Vui lòng điền thông tin còn thiếu:\n- ${missing.join(
      ", "
    )}`;
    toast.error(message);
    return false;
  }

  // Kiểm tra email nếu có
  if (fields["Địa chỉ Email"]) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
    if (!emailRegex.test(fields["Địa chỉ Email"])) {
      toast.error("Email không đúng định dạng!");
      return false;
    }
  }
  return true;
};

/**
 * ✅ Hàm gửi request API chung cho POST, PUT, DELETE, GET
 * @param {string} url - endpoint đầy đủ
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method - phương thức
 * @param {Object|null} body - dữ liệu gửi đi (nếu có)
 * @returns {Promise<any>} dữ liệu phản hồi từ server
 */
export const sendRequest = async (
  url,
  method = "GET",
  body = null,
  options = {}
) => {
  const token = localStorage.getItem("token");

  try {
    // Xác định header
    const headers = {};
    if (!(body instanceof FormData)) {
      // Nếu body không phải FormData → JSON
      headers["Content-Type"] = "application/json";
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      credentials: options.includeCredentials ? "include" : "same-origin", // ✅ CHỈ include khi cần
      body:
        body instanceof FormData ? body : body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Lỗi ${method} tại ${url}`);
    }

    // Một số API (DELETE) có thể không trả JSON
    try {
      return await response.json();
    } catch {
      return {};
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    toast.error(error.message || "Lỗi kết nối máy chủ!");
    throw error;
  }
};
