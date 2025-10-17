import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { driverFields } from "../../../Utils/bookingUtils";
import { driverColumn } from "../../../Utils/bookingUtils";

const AdminDriver = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentDriver, setcurrentDriver] = useState();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);

  const statusMap = {
    1: "Đang làm",
    2: "Tạm nghỉ",
    3: "Tạm khóa",
  };
  const statusColorMap = {
    1: "#008000b3", // Đang làm
    2: "#ffa9008a", // Tạm nghỉ
    3: "#ff0000c2", // Tạm khóa
  };
  const fetchDrivers = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/driver/page?page=${page}&size=10&${searchCriteria}=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
        return null;
      }
    },
    [page]
  ); // Chỉ tái tạo khi page thay đổi

  // Dùng useEffect để gọi API khi page, searchCriteria, hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDrivers(searchDebounce, searchCriteria);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.drivers);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchDrivers]);

  const handleEditClick = (kindVehicle) => {
    setcurrentDriver(kindVehicle);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };

  // Hàm validate driver chung
  const validateDriver = (driver) => {
    const missingInfo = [];
    if (!driver.name) missingInfo.push("Tên tài xế");
    if (!driver.email) missingInfo.push("Email");
    if (!driver.phone) missingInfo.push("Số điện thoại");

    if (driver.email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(driver.email)) {
        return { valid: false, error: "Email không hợp lệ." };
      }
    }

    if (missingInfo.length > 0) {
      return {
        valid: false,
        error: `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
          ",  "
        )}`,
      };
    }

    return { valid: true };
  };

  // Hàm chung gửi request
  const sendDriverRequest = async ({
    method,
    url,
    driverData,
    onSuccess,
    onClose,
  }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(driverData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(
          method === "POST"
            ? "Tài xế đã được tạo thành công!"
            : "Tài xế đã được cập nhật thành công!"
        );
        onSuccess(result);
        if (onClose) onClose();
      } else {
        const errorText =
          method === "POST"
            ? "Có lỗi xảy ra khi tạo tài xế!"
            : "Có lỗi xảy ra khi cập nhật tài xế!";
        console.error(errorText);
        toast.error(errorText);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  // Tạo driver
  const handleCreateDriver = (newDriver) => {
    if (!newDriver.status) newDriver.status = 1; // mặc định status
    const validation = validateDriver(newDriver);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    sendDriverRequest({
      method: "POST",
      url: "http://localhost:8081/api/driver",
      driverData: newDriver,
      onSuccess: (driver) => setRecords((prev) => [...prev, driver]),
      onClose: () => setIsAdd(false),
    });
  };

  // Cập nhật driver
  const handleUpdateDriver = (updateDriver) => {
    const validation = validateDriver(updateDriver);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    sendDriverRequest({
      method: "PUT",
      url: `http://localhost:8081/api/driver/${updateDriver.id}`,
      driverData: updateDriver,
      onSuccess: (updatedDriver) => {
        const updatedList = records.map((d) =>
          d.id === updatedDriver.id ? updatedDriver : d
        );
        setRecords(updatedList);
      },
      onClose: () => setIsEditing(false),
    });
  };

  // Xóa driver
  const removeDriver = async () => {
    if (!driverToDelete) return;

    const driverId = driverToDelete.id;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/driver/${driverId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setRecords(records.filter((d) => d.id !== driverId));
        toast.success("Driver đã được xóa thành công!");
        setIsDeleteConfirmVisible(false);
      } else {
        toast.error("Có lỗi xảy ra khi xóa Driver!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  const handleRemoveClick = (driver) => {
    setDriverToDelete(driver);
    setIsDeleteConfirmVisible(true);
  };
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  return (
    <div className="main-container">
      <GenericAdminHeader
        title="Quản lý tài xế"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Tài xế", href: "/admin/drivers" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={[
          { value: "name", label: "Tên" },
          { value: "email", label: "Email" },
          { value: "phone", label: "Số điện thoại" },
        ]}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm tài xế"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={driverColumn}
            data={records}
            onEdit={handleEditClick}
            onDelete={handleRemoveClick}
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
        title="Sửa thông tin tài xế"
        data={currentDriver}
        fields={driverFields}
        onSave={handleUpdateDriver}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm tài xế"
        fields={driverFields}
        defaultValues={{ status: 1 }} // mặc định status = 1
        onSave={handleCreateDriver}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa tài xế này?"
        onConfirm={removeDriver} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminDriver;
