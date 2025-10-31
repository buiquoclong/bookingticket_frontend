import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { vehicleColumn, vehicleFields } from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_VEHICLE,
  GET_ALL_KIND_VEHICLE,
  GET_VEHICLE_BY_ID,
  GET_VEHICLE_PAGE,
} from "../../../Utils/apiUrls";

const AdminVehicle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentVehicle, setcurrentVehicle] = useState({});

  const [isAdd, setIsAdd] = useState(false);
  const [records, setRecords] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [kindVehicleData, setKindVehicleData] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [vehicleToDelete, setvehicleToDelete] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(
    typeof searchValue === "string" ? searchValue.trim() : searchValue,
    500
  );
  const fetchKindVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await sendRequest(GET_ALL_KIND_VEHICLE, "GET");
      setKindVehicleData(data);
      return data;
    } catch (error) {
      console.error("Error fetching routes:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const statusMap = {
    1: "Đang hoạt động",
    2: "Tạm dừng hoạt động",
    3: "Ngưng hoạt động",
  };
  const statusColorMap = {
    1: "#008000b3", // Đang làm
    2: "#ffa9008a", // Tạm nghỉ
    3: "#ff0000c2", // Tạm khóa
  };
  const fetchVehicles = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        setIsLoading(true);
        const data = await sendRequest(
          GET_VEHICLE_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        // Cập nhật state sau khi lấy dữ liệu
        return data;
      } catch (error) {
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  ); // Hàm này sẽ được tạo lại khi `page`, `searchCriteria`, hoặc `searchValue` thay đổi

  // Dùng useEffect để gọi fetchVehicles khi page, searchCriteria hoặc searchValue thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehicles(searchDebounce, searchCriteria);

      // Cập nhật state nếu dữ liệu có
      if (data) {
        setRecords(data.vehicles);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
    fetchKindVehicles();
  }, [page, searchDebounce, fetchKindVehicles, searchCriteria, fetchVehicles]);
  useEffect(() => {
    fetchVehicles();
    fetchKindVehicles();
  }, [fetchVehicles, fetchKindVehicles]);
  const handleEditClick = (kindVehicle) => {
    setcurrentVehicle(kindVehicle);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const handleCreateVehicle = async (newVehicle) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        "Loại xe": newVehicle.kindVehicleId,
        "Tên phương tiện": newVehicle.name,
        "Biển số": newVehicle.vehicleNumber,
        "Sức chứa": newVehicle.value,
        "Trạng thái": newVehicle.status,
      })
    )
      return;
    const newVehicleData = {
      kindVehicleId: newVehicle.kindVehicleId,
      name: newVehicle.name,
      vehicleNumber: newVehicle.vehicleNumber,
      value: newVehicle.value,
      status: newVehicle.status,
    };
    try {
      setIsLoading(true);
      // Gửi request tạo phương tiện
      const created = await sendRequest(CREATE_VEHICLE, "POST", newVehicleData);

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Phương tiện mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo phương tiện:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVehicle = async (updateVehicle) => {
    if (
      !validateFields({
        "Loại xe": updateVehicle.kindVehicleId,
        "Tên phương tiện": updateVehicle.name,
        "Biển số": updateVehicle.vehicleNumber,
        "Sức chứa": updateVehicle.value,
        "Trạng thái": updateVehicle.status,
      })
    )
      return;
    const updateVehicleData = {
      kindVehicleId: updateVehicle.kindVehicleId,
      name: updateVehicle.name,
      vehicleNumber: updateVehicle.vehicleNumber,
      value: updateVehicle.value,
      status: updateVehicle.status,
    };

    console.log(updateVehicleData);
    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_VEHICLE_BY_ID(updateVehicle.id),
        "PUT",
        updateVehicleData
      );

      toast.success("Phương tiện đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update phương tiện:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeVehicle = async () => {
    const vehicleId = vehicleToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_VEHICLE_BY_ID(vehicleId), "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== vehicleId));
      toast.success("Phương tiện đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa phương tiện:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = (vehicle) => {
    setvehicleToDelete(vehicle);
    setIsDeleteConfirmVisible(true);
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const searchOptions = vehicleFields.map((field) => {
    if (field.type === "select") {
      if (field.key === "kindVehicleId") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: kindVehicleData };
      }

      if (field.key === "status") {
        // 🔹 Gắn danh sách trạng thái từ statusMap (object)
        return { ...field, value: field.key, options: statusMap };
      }
    }

    // Các field còn lại
    return { ...field, value: field.key };
  });
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý ghế ngồi"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Phương tiện", href: "/admin/vehicles" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={searchOptions}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm ghế ngồi"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={vehicleColumn}
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
        title="Sửa thông tin phương tiện"
        data={currentVehicle}
        fields={searchOptions}
        onSave={handleUpdateVehicle}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm phương tiện"
        fields={searchOptions}
        defaultValues={{ status: 1 }} // mặc định status = 1
        onSave={handleCreateVehicle}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa phương tiện này?"
        onConfirm={removeVehicle} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminVehicle;
