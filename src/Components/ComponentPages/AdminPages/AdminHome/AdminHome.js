import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  //   LineChart,
  //   Line,
  //   PieChart,
  //   Pie,
} from "recharts";
import "./AdminHome.scss";
import "react-toastify/dist/ReactToastify.css";

function AdminHome() {
  const [totalAll, setTotalAll] = useState(null);
  const [totalDay, setTotalDay] = useState(null);
  const [totalMonth, setTotalMonth] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const [totalBill, setTotalBill] = useState(null);
  const [totalNineMonth, setTotalNineMonth] = useState([]);

  const [paidBookingsCount, setPaidBookingsCount] = useState(0);
  const [cancelledBookingsCount, setCancelledBookingsCount] = useState(0);
  // lấy ngày hiện tại
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  const currentMonth = `${year}-${month}`;

  useEffect(() => {
    if (currentDate) {
      fetchtoTalByday();
    }
    if (currentMonth) {
      fetchtoTalByMonth();
    }
    fetchTotalUser();
    fetchTotalNineMonth();
    fetchTotalAll();
    fetchTotalBill();
    fetchPaidBookingsCount();
    fetchCancelledBookingsCount();
  });

  const fetchtoTalByday = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/total-by-day?date=${currentDate}`
      );
      const data = await response.json();
      setTotalDay(data);
    } catch (error) {
      console.error("Error fetching totalDay:", error);
    }
  };
  const fetchtoTalByMonth = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/total-by-month?yearMonth=${currentMonth}`
      );
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
  const fetchTotalBill = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/total-bookings`
      );
      const data = await response.json();
      setTotalBill(data);
    } catch (error) {
      console.error("Error fetching totalDay:", error);
    }
  };
  const fetchTotalAll = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/totalAll`
      );
      const data = await response.json();
      setTotalAll(data);
    } catch (error) {
      console.error("Error fetching totalDay:", error);
    }
  };
  const fetchTotalNineMonth = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/total/lastNineMonths`
      );
      const data = await response.json();
      setTotalNineMonth(data);
    } catch (error) {
      console.error("Error fetching totalDay:", error);
    }
  };
  const fetchPaidBookingsCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/count-paid-by-month?yearMonth=${currentMonth}`
      );
      const data = await response.json();
      setPaidBookingsCount(data);
    } catch (error) {
      console.error("Error fetching paid bookings count:", error);
    }
  };

  // Hàm để lấy số lượng vé đã bị hủy theo tháng
  const fetchCancelledBookingsCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/booking/count-cancelled-by-month?yearMonth=${currentMonth}`
      );
      const data = await response.json();
      setCancelledBookingsCount(data);
    } catch (error) {
      console.error("Error fetching cancelled bookings count:", error);
    }
  };
  const transformedData = totalNineMonth.map((item) => ({
    ...item,
    name: `T${item.month}-${item.year}`,
  }));
  const formatYAxis = (tickItem) => {
    return tickItem >= 1000000
      ? `${(tickItem / 1000000).toFixed(1)}M`
      : `${(tickItem / 1000000).toFixed(1)}M`;
  };

  return (
    <main className="main-container">
      <div className="dashboardContent">
        <div className="main-title">
          <h3>Trang quản trị</h3>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>Hôm nay</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>{totalDay ? `${totalDay.toLocaleString("vi-VN")}đ` : "0đ"}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Tổng doanh thu</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h1>{totalAll ? `${totalAll.toLocaleString("vi-VN")}đ` : "0đ"}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Người dùng</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{totalUser ? totalUser : "0"}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Tổng hóa đơn</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>{totalBill ? totalBill : "0"}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Hóa đơn đã thanh toán trong tháng</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{paidBookingsCount ? paidBookingsCount : "0"}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Hóa đơn đã bị hủy trong tháng</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>{cancelledBookingsCount ? cancelledBookingsCount : "0"}</h1>
          </div>
        </div>
        <div className="totalMain">
          <div className="titleTot">Doanh số </div>
          <div className="charts">
            <div className="monthlyTotal">
              <div className="totalMonthly">
                <h3>Doanh thu tháng này</h3>
                <h1>
                  {totalMonth ? `${totalMonth.toLocaleString("vi-VN")}đ` : "0đ"}
                </h1>
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
                <XAxis dataKey="name" angle={-45} textAnchor="end" />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip
                  formatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Legend
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{ paddingBottom: "20px" }}
                />
                <Bar
                  dataKey="revenue"
                  name="Lợi nhuận theo tháng"
                  fill="#8884d8"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminHome;
