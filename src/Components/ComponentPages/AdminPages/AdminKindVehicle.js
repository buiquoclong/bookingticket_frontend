import React, { useState, useEffect, useCallback } from "react";
// import "../AdminContact/AdminContact.scss"
import { toast } from "react-toastify";
import { FiEdit, FiTrash } from "react-icons/fi";
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

const AdminKindVehicle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentKindVehicle, setcurrentKindVehicle] = useState();
  const [records, setRecords] = useState([]);

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [kindVehicleToDelete, setKindVehicleToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const columns = [
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          ID
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {row.id}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Loại xe
        </div>
      ),
      selector: (row) => row.name,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {row.name}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Hành động
        </div>
      ),
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <FiEdit
            size={24}
            style={{
              color: "#3b82f6",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onClick={() => handleEditClick(row)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3b82f6")}
            title="Chỉnh sửa"
          />
          <FiTrash
            size={24}
            style={{
              color: "#ef4444",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onClick={() => handleRemoveClick(row)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ef4444")}
            title="Xóa"
          />
        </div>
      ),
    },
  ];
  const fetchKindVehicle = useCallback(
    async (searchDebounce) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/kindVehicle/page?page=${page}&size=10&name=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching kind vehicles:", error);
        return null;
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
      // Gửi request tạo loại xe
      const created = await sendRequest(
        "http://localhost:8081/api/kindVehicle",
        "POST",
        { name: newKindVehicle.name }
      );

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Loại xe mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo loại xe:", error);
    }
  };

  // 🎯 Cập nhật loại xe
  const handleUpdateKindVehicle = async (updateKindVehicle) => {
    if (!validateFields({ "Loại xe": updateKindVehicle.name })) return;

    try {
      const updated = await sendRequest(
        `http://localhost:8081/api/kindVehicle/${updateKindVehicle.id}`,
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
    }
  };

  // 🎯 Xóa loại xe
  const removeKindVehicle = async () => {
    const kindVehicleId = kindVehicleToDelete.id;

    try {
      await sendRequest(
        `http://localhost:8081/api/kindVehicle/${kindVehicleId}`,
        "DELETE"
      );

      setRecords((prev) =>
        prev.filter((record) => record.id !== kindVehicleId)
      );
      toast.success("Loại xe đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa loại xe:", error);
    }
  };

  const handleRemoveClick = (kindVehicle) => {
    setKindVehicleToDelete(kindVehicle);
    setIsDeleteConfirmVisible(true);
  };
  return (
    <div className="main-container">
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
