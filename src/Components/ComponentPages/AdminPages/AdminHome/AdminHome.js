import { useState, useEffect, useCallback, useMemo } from "react";
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
import LoadingBackdrop from "../../../ComponentParts/LoadingBackdrop";

function AdminHome() {
  // ------------------- State -------------------
  const [isLoading, setIsLoading] = useState(false);
  const [totalAll, setTotalAll] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [totalNineMonth, setTotalNineMonth] = useState([]);
  const [paidBookingsCount, setPaidBookingsCount] = useState(0);
  const [cancelledBookingsCount, setCancelledBookingsCount] = useState(0);

  // ------------------- Ngày hiện tại -------------------
  const today = useMemo(() => new Date(), []);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  const currentMonth = `${year}-${month}`;

  // ------------------- Hàm fetch chung -------------------
  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data ?? 0;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return 0; // fallback
    }
  }, []);

  // ------------------- useEffect fetch tất cả -------------------
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // 🔹 Bắt đầu loading

      try {
        const [
          dayData,
          monthData,
          userData,
          billData,
          allData,
          nineMonthData,
          paidCount,
          cancelledCount,
        ] = await Promise.all([
          fetchData(
            `http://localhost:8081/api/booking/total-by-day?date=${currentDate}`
          ),
          fetchData(
            `http://localhost:8081/api/booking/total-by-month?yearMonth=${currentMonth}`
          ),
          fetchData(`http://localhost:8081/api/user/totalUser`),
          fetchData(`http://localhost:8081/api/booking/total-bookings`),
          fetchData(`http://localhost:8081/api/booking/totalAll`),
          fetchData(`http://localhost:8081/api/booking/total/lastNineMonths`),
          fetchData(
            `http://localhost:8081/api/booking/count-paid-by-month?yearMonth=${currentMonth}`
          ),
          fetchData(
            `http://localhost:8081/api/booking/count-cancelled-by-month?yearMonth=${currentMonth}`
          ),
        ]);

        setTotalDay(dayData);
        setTotalMonth(monthData);
        setTotalUser(userData);
        setTotalBill(billData);
        setTotalAll(allData);
        setTotalNineMonth(nineMonthData);
        setPaidBookingsCount(paidCount);
        setCancelledBookingsCount(cancelledCount);
      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu Dashboard:", error);
      } finally {
        // ⏳ Nếu muốn chờ 1–2 giây cho hiệu ứng mượt hơn
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false); // 🔹 Dừng loading
      }
    };

    fetchAllData();
  }, [currentDate, currentMonth, fetchData]);

  // ------------------- transformData cho chart -------------------
  const transformedData = useMemo(() => {
    if (!Array.isArray(totalNineMonth)) return [];
    return totalNineMonth.map((item) => ({
      ...item,
      name: `T${item.month}-${item.year}`,
    }));
  }, [totalNineMonth]);

  // ------------------- formatYAxis -------------------
  const formatYAxis = useCallback((tickItem) => {
    if (tickItem >= 1000000) return `${(tickItem / 1000000).toFixed(1)}M`;
    if (tickItem >= 1000) return `${(tickItem / 1000).toFixed(1)}K`;
    return tickItem.toString();
  }, []);
  return (
    <main className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <div className="dashboardContent">
        <div className="main-title">
          <h3>Trang quản trị</h3>
        </div>

        <div className="main-cards">
          <div className="card blue">
            <div className="card-inner">
              <h4>Hôm nay</h4>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h2>{totalDay?.toLocaleString("vi-VN") + "đ" || "0đ"}</h2>
          </div>

          <div className="card orange">
            <div className="card-inner">
              <h4>Tổng doanh thu</h4>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h2>{totalAll?.toLocaleString("vi-VN") + "đ" || "0đ"}</h2>
          </div>

          <div className="card green">
            <div className="card-inner">
              <h4>Người dùng</h4>
              <BsPeopleFill className="card_icon" />
            </div>
            <h2>{totalUser || 0}</h2>
          </div>

          <div className="card red">
            <div className="card-inner">
              <h4>Tổng hóa đơn</h4>
              <BsFillBellFill className="card_icon" />
            </div>
            <h2>{totalBill || 0}</h2>
          </div>

          <div className="card green-light">
            <div className="card-inner">
              <h4>Hóa đơn thanh toán</h4>
              <BsPeopleFill className="card_icon" />
            </div>
            <h2>{paidBookingsCount || 0}</h2>
          </div>

          <div className="card red-light">
            <div className="card-inner">
              <h4>Hóa đơn bị hủy</h4>
              <BsFillBellFill className="card_icon" />
            </div>
            <h2>{cancelledBookingsCount || 0}</h2>
          </div>
        </div>

        <div className="totalMain">
          <div className="titleTot">Doanh số</div>
          <div className="charts">
            <div className="monthlyTotal">
              <div className="totalMonthly">
                <h4>Doanh thu tháng này</h4>
                <h2>{totalMonth?.toLocaleString("vi-VN") + "đ" || "0đ"}</h2>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={transformedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
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
