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
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_DRIVER,
  GET_DRIVER_BY_ID,
  GET_DRIVER_PAGE,
} from "../../../Utils/apiUrls";
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
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const data = await sendRequest(
          GET_DRIVER_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
        return null;
      } finally {
        setIsLoading(false);
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

  // ✅ Tạo Driver
  const handleCreateDriver = async (newDriver) => {
    if (
      !validateFields({
        "Tên tài xế": newDriver.name,
        Email: newDriver.email,
        "Số điện thoại": newDriver.phone,
      })
    )
      return;

    if (!newDriver.status) newDriver.status = 1; // mặc định status

    try {
      setIsLoading(true);
      const created = await sendRequest(CREATE_DRIVER, "POST", newDriver);

      toast.success("Tài xế đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo tài xế:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Cập nhật Driver
  const handleUpdateDriver = async (updateDriver) => {
    if (
      !validateFields({
        "Tên tài xế": updateDriver.name,
        Email: updateDriver.email,
        "Số điện thoại": updateDriver.phone,
      })
    )
      return;

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_DRIVER_BY_ID(updateDriver.id),
        "PUT",
        updateDriver
      );

      toast.success("Tài xế đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((d) => (d.id === updated.id ? updated : d))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài xế:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Xóa Driver
  const removeDriver = async () => {
    if (!driverToDelete) return;

    const driverId = driverToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_DRIVER_BY_ID(driverId), "DELETE");

      setRecords((prev) => prev.filter((d) => d.id !== driverId));
      toast.success("Tài xế đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa tài xế:", error);
    } finally {
      setIsLoading(false);
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
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý tài xế"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Tài xế", href: "/admin/drivers" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={[
          { key: "name", label: "Tên" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Số điện thoại" },
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
