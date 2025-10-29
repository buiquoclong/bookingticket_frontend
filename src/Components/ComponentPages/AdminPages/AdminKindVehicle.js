import React, { useState, useEffect, useCallback } from "react";
// import "../AdminContact/AdminContact.scss"
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import {
  kindVehicleColumn,
  kindVehicleFields,
} from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_KIND_VEHICLE,
  GET_KIND_VEHICLE_BY_ID,
  GET_KIND_VEHICLE_PAGE,
} from "../../../Utils/apiUrls";

const AdminKindVehicle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentKindVehicle, setcurrentKindVehicle] = useState();
  const [records, setRecords] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [kindVehicleToDelete, setKindVehicleToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const fetchKindVehicle = useCallback(
    async (searchDebounce) => {
      try {
        setIsLoading(true);
        const data = await sendRequest(
          GET_KIND_VEHICLE_PAGE(page, 10, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching kind vehicles:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  ); // Chỉ tái tạo khi page thay đổi

  // Dùng useEffect để gọi API khi page hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchKindVehicle(searchDebounce);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.kindVehicles);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, fetchKindVehicle]);
  const handleEditClick = (kindVehicle) => {
    setcurrentKindVehicle(kindVehicle);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const handleCreateKindVehicle = async (newKindVehicle) => {
    // Validate dữ liệu đầu vào
    if (!validateFields({ "Loại xe": newKindVehicle.name })) return;

    try {
      setIsLoading(true);
      // Gửi request tạo loại xe
      const created = await sendRequest(CREATE_KIND_VEHICLE, "POST", {
        name: newKindVehicle.name,
      });

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Loại xe mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo loại xe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Cập nhật loại xe
  const handleUpdateKindVehicle = async (updateKindVehicle) => {
    if (!validateFields({ "Loại xe": updateKindVehicle.name })) return;

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_KIND_VEHICLE_BY_ID(updateKindVehicle.id),
        "PUT",
        { name: updateKindVehicle.name }
      );

      toast.success("Loại xe đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update loại xe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Xóa loại xe
  const removeKindVehicle = async () => {
    const kindVehicleId = kindVehicleToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_KIND_VEHICLE_BY_ID(kindVehicleId), "DELETE");

      setRecords((prev) =>
        prev.filter((record) => record.id !== kindVehicleId)
      );
      toast.success("Loại xe đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa loại xe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = (kindVehicle) => {
    setKindVehicleToDelete(kindVehicle);
    setIsDeleteConfirmVisible(true);
  };
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý loại xe"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Loại xe", href: "/admin/kind-vehicle" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={[{ value: "name", label: "Tên" }]}
        addButtonLabel="Thêm loại xe"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={kindVehicleColumn}
            data={records}
            onEdit={handleEditClick}
            onDelete={handleRemoveClick}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <EditModal
        visible={isEditing}
        title="Sửa thông loại xe"
        data={currentKindVehicle}
        fields={kindVehicleFields}
        onSave={handleUpdateKindVehicle}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm loại xe"
        fields={kindVehicleFields}
        defaultValues={{ status: 1 }} // mặc định status = 1
        onSave={handleCreateKindVehicle}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa loại xe này?"
        onConfirm={removeKindVehicle} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminKindVehicle;
