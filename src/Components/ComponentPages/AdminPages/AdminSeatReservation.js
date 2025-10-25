import React, { useState, useEffect, useCallback } from "react";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { seatReservationColumn } from "../../../Utils/bookingUtils";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";

const AdminSeatReservation = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSeatReservations = useCallback(
    async (searchDebounce) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8081/api/seat_reservation/page?page=${page}&size=10`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching seat reservations:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  ); // Chỉ tái tạo khi `page` thay đổi

  // Dùng useEffect để gọi API khi page hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSeatReservations();

      // Cập nhật state nếu dữ liệu có
      if (data) {
        setRecords(data.seatReservations);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, fetchSeatReservations]);
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý ghế ngồi"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Ghế đặt trước", href: "/admin/seat-reservation" },
        ]}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={seatReservationColumn}
            data={records}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            showActions={false}
          />
        </div>
      </div>
    </div>
  );
};
export default AdminSeatReservation;
