import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import {
  userColumn,
  userFields,
  userFieldCreate,
  userFieldQuery,
} from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_USER_ADMIN,
  GET_USER_BY_ID,
  GET_USER_PAGE,
} from "../../../Utils/apiUrls";

const AdminUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setcurrentUser] = useState({});

  const [isAdd, setIsAdd] = useState(false);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const [isLoading, setIsLoading] = useState(false);

  const roleMap = {
    1: "Người dùng",
    2: "Nhân viên",
    3: "Admin",
  };
  const statusMap = {
    1: "Chưa kích hoạt",
    2: "Đã kích hoạt",
    3: "Tạm khóa",
  };
  const statusColorMap = {
    1: "#ffa9008a", // Chưa kích hoạt
    2: "#008000b3", // Đã kích hoạt
    3: "#ff0000c2", // Tạm khóa
  };
  const fetchUsers = useCallback(
    async (searchDebounce) => {
      try {
        setIsLoading(true);
        const data = await sendRequest(
          GET_USER_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page, searchCriteria]
  ); // Duy trì các dependencies cần thiết

  // useEffect để gọi API khi thay đổi searchDebounce, page, hoặc searchCriteria
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers(searchDebounce);
      if (data) {
        setRecords(data.users);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();

    // Cleanup function để tránh cập nhật state nếu component đã unmount
    return () => {};
  }, [searchDebounce, page, searchCriteria, fetchUsers]);
  const handleEditClick = (user) => {
    setcurrentUser(user);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };
  const handleCreateUser = async (newUser) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        "Tên người dùng": newUser.name,
        "Địa chỉ Email": newUser.email,
        "Số điện thoại": newUser.phone,
        "Quyền hạn người dùng": newUser.role,
      })
    )
      return;
    const newUserData = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };
    try {
      setIsLoading(true);
      // Gửi request tạo người dùng
      await sendRequest(CREATE_USER_ADMIN, "POST", newUserData);

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Người dùng mới đã được tạo thành công!");
      window.location.reload();
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (updateUser) => {
    if (
      !validateFields({
        "Quyền hạn người dùng": updateUser.role,
        "Trạng thái tài khoản": updateUser.status,
      })
    )
      return;
    const updateUserData = {
      role: updateUser.role,
      status: updateUser.status,
    };

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_USER_BY_ID(updateUser.id),
        "PUT",
        updateUserData
      );

      toast.success("Người dùng đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  const searchOptionQueries = userFieldQuery.map((field) => {
    if (field.type === "select") {
      if (field.key === "role") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: roleMap };
      }

      if (field.key === "status") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: statusMap };
      }
    }

    // Các field còn lại
    return { ...field, value: field.key };
  });
  const searchOptions = userFieldCreate.map((field) => {
    if (field.type === "select") {
      if (field.key === "role") {
        // Gắn danh sách quyền
        return { ...field, options: roleMap };
      }
    }
    return { ...field }; // ❌ bỏ value: field.key đi
  });

  const searchOptionUsers = userFields.map((field) => {
    if (field.type === "select") {
      if (field.key === "role") {
        // 🔹 Gắn danh sách loại xe
        return { ...field, value: field.key, options: roleMap };
      }
      if (field.key === "status") {
        // 🔹 Gắn danh sách loại xe
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
          { label: "Người dùng", href: "/admin/users" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={searchOptionQueries}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm người dùng"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={userColumn}
            data={records}
            onEdit={handleEditClick}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            statusColorMap={statusColorMap}
            statusMap={statusMap}
            roleMap={roleMap}
          />
        </div>
      </div>

      <EditModal
        visible={isEditing}
        title="Sửa thông tin người dùng"
        data={currentUser}
        fields={searchOptionUsers}
        onSave={handleUpdateUser}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm người dùng"
        fields={searchOptions}
        onSave={handleCreateUser}
        onCancel={() => setIsAdd(false)}
      />
    </div>
  );
};
export default AdminUser;
