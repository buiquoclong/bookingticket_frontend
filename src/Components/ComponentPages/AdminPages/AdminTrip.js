import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import {
  tripColumn,
  tripFields,
  tripDetailColumns,
} from "../../../Utils/bookingUtils";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import DetailModal from "../../ComponentParts/ModelComponents/DetailModal";

const AdminTrip = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrip, setcurrentTrip] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [kindVehicledata, setKindVehicledata] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [vehicleOfKind, setVehicleOfKind] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const [dayStart, setDayStart] = useState("");
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  const statusMap = {
    1: "Đã xác nhận",
    2: "Đã hoàn thành",
    3: "Đã bị hủy",
  };
  const statusColorMap = {
    1: "#ffa9008a", // Chưa kích hoạt
    2: "#008000b3", // Đã kích hoạt
    3: "#ff0000c2", // Tạm khóa
  };

  const [seatData, setSeatData] = useState([]);

  const [isDetail, setIsDetail] = useState(false);
  const handleDetailClick = (trip) => {
    const tripId = trip.id;
    fetch(`http://localhost:8081/api/seat_reservation/trip/${tripId}`)
      .then((response) => response.json())
      .then((data) => {
        setSeatData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsDetail(true);
  };
  const fetchTrips = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8081/api/trip/page?page=${page}&size=10&routeId=&dayStart=${searchValue}`
      );
      const data = await response.json();
      setRecords(data.trips);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchValue]);

  const fetchRoutes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8081/api/route");
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  }, []);

  const fetchKindVehicles = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8081/api/kindVehicle");
      const data = await response.json();
      setKindVehicledata(data);
    } catch (error) {
      console.error("Error fetching kind vehicles:", error);
    }
  }, []);

  const fetchDrivers = useCallback(async (dayStart) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/driver/available?dayStart=${dayStart}`
      );
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  }, []);

  // Dùng useEffect để gọi các API khi page hoặc daySearch thay đổi
  useEffect(() => {
    const fetchData = async () => {
      // Gọi các API đồng thời để tiết kiệm thời gian
      const [tripsData, routesData, kindVehicleData] = await Promise.all([
        fetchTrips(),
        fetchRoutes(),
        fetchKindVehicles(),
      ]);

      // Nếu cần, có thể xử lý dữ liệu trả về ở đây
      if (tripsData && routesData && kindVehicleData) {
        // Dữ liệu đã được xử lý và set ở trên
      }
    };
    fetchData();
  }, [page, fetchTrips, fetchRoutes, fetchKindVehicles, fetchDrivers]);
  const handleEditClick = (trip) => {
    setcurrentTrip(trip);
    setIsEditing(true);

    // Gọi API lấy xe sẵn cho kindVehicle và dayStart hiện tại của trip
    const kindVehicleId = trip.vehicle.kindVehicle.id;
    const dayStart = trip.dayStart; // đã có sẵn
    if (kindVehicleId && dayStart) {
      fetchVehiclesByKind(kindVehicleId, dayStart);
    }

    // Lấy danh sách driver theo dayStart
    if (dayStart) {
      fetchDrivers(dayStart);
    }
  };

  const fetchVehiclesByKind = async (kindVehicleId, dayStart) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/vehicle/available/${kindVehicleId}?dayStart=${dayStart}`
      );
      const data = await response.json();
      console.log(data);
      setVehicleOfKind(data);
    } catch (error) {
      console.error(
        `Error fetching vehicles for kind vehicle ID ${kindVehicleId}:`,
        error
      );
    }
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const handleCreateTrip = async (newTrip) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        "Tên chuyến đi": newTrip.routeId,
        "Ngày khởi hành": newTrip.dayStart,
        "Thời gian khởi hành": newTrip.timeStart,
        "Loại xe": newTrip.kindVehicleId,
        "Phương tiện": newTrip.vehicleId,
        "Giá vé": newTrip.price,
        "Tài xế": newTrip.driverId,
      })
    )
      return;
    const newTripData = {
      routeId: newTrip.routeId,
      dayStart: newTrip.dayStart,
      timeStart: newTrip.timeStart,
      kindVehicleId: newTrip.kindVehicleId,
      vehicleId: newTrip.vehicleId,
      price: newTrip.price,
      driverId: newTrip.driverId,
      status: newTrip.status,
    };
    try {
      setIsLoading(true);
      // Gửi request tạo chuyến đi
      const created = await sendRequest(
        "http://localhost:8081/api/trip",
        "POST",
        newTripData
      );

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Chuyến đi mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo chuyến đi:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateTrip = async (updateTrip) => {
    if (
      !validateFields({
        "Tên chuyến đi": updateTrip.routeId,
        "Ngày khởi hành": updateTrip.dayStart,
        "Thời gian khởi hành": updateTrip.timeStart,
        "Loại xe": updateTrip.kindVehicleId,
        "Phương tiện": updateTrip.vehicleId,
        "Giá vé": updateTrip.price,
        "Tài xế": updateTrip.driverId,
      })
    )
      return;
    const updateTripData = {
      routeId: updateTrip.routeId,
      dayStart: updateTrip.dayStart,
      timeStart: updateTrip.timeStart,
      kindVehicleId: updateTrip.kindVehicleId,
      vehicleId: updateTrip.vehicleId,
      price: updateTrip.price,
      driverId: updateTrip.driverId,
      status: updateTrip.status,
    };

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        `http://localhost:8081/api/trip/${updateTrip.id}`,
        "PUT",
        updateTripData
      );

      toast.success("Chuyến đi đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update chuyến đi:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const removeTrip = async () => {
    const tripId = tripToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(`http://localhost:8081/api/trip/${tripId}`, "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== tripId));
      toast.success("Chuyến đi đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa chuyến đi:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveClick = (trip) => {
    setTripToDelete(trip);
    setIsDeleteConfirmVisible(true);
  };

  const searchOptions = tripFields.map((field) => {
    if (field.type === "select") {
      if (field.key === "routeId") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: routes };
      }
      if (field.key === "kindVehicleId") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: kindVehicledata };
      }
      if (field.key === "vehicleId") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: vehicleOfKind };
      }
      if (field.key === "driverId") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: drivers };
      }

      if (field.key === "status") {
        // 🔹 Gắn danh sách trạng thái từ statusMap (object)
        return { ...field, value: field.key, options: statusMap };
      }
    }

    // Các field còn lại
    return { ...field, value: field.key };
  });
  const handleFieldChange = (key, value, dayStart) => {
    console.log(dayStart);
    if (key === "kindVehicleId" && dayStart) {
      fetchVehiclesByKind(value, dayStart);
    }
    if (key === "dayStart") fetchDrivers(value);
  };

  return (
    <>
      <div className="main-container">
        <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
        <GenericAdminHeader
          title="Quản lý chuyến đi"
          breadcrumbLinks={[
            { label: "Admin", href: "/admin" },
            { label: "Chuyến đi", href: "/admin/trips" },
          ]}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchOptions={[
            { key: "dayStart", label: "Ngày bắt đầu", type: "date" }, // có thể thêm nhiều option khác
          ]}
          addButtonLabel="Thêm chuyến đi"
          onAddClick={handleCreateClick}
        />

        <div className="HisContent">
          <div className="HistoryTick">
            <div className="devide"></div>
            <AdminTable
              columns={tripColumn}
              data={records}
              onEdit={handleEditClick}
              onDelete={handleRemoveClick}
              onDetail={handleDetailClick} // 👉 thêm dòng này
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              statusColorMap={statusColorMap}
              statusMap={statusMap}
            />
          </div>
        </div>
        <EditModal
          visible={isEditing}
          title="Sửa thông tin chuyến đi"
          data={currentTrip}
          fields={searchOptions}
          onSave={handleUpdateTrip}
          onCancel={() => setIsEditing(false)}
          onFieldChange={handleFieldChange}
        />

        <AddModal
          visible={isAdd}
          title="Thêm chuyến đi"
          fields={searchOptions}
          defaultValues={{ status: 1 }} // mặc định status = 1
          onSave={handleCreateTrip}
          onCancel={() => setIsAdd(false)}
          onFieldChange={handleFieldChange}
        />

        <ConfirmDeleteModal
          visible={isDeleteConfirmVisible}
          message="Bạn có chắc chắn muốn xóa chuyến đi này?"
          onConfirm={removeTrip} // khi xác nhận
          onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
          type="delete"
        />
      </div>
      <DetailModal
        visible={isDetail}
        title="Danh sách ghế đã đặt"
        data={seatData}
        columns={tripDetailColumns}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onClose={() => setIsDetail(false)}
      />
    </>
  );
};
export default AdminTrip;
