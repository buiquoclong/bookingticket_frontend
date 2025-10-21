import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { contactColumn, contactField } from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";

const AdminContact = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentContact, setcurrentContact] = useState();
  const [records, setRecords] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("email");
  const searchDebounce = useDebounce(searchValue.trim(), 500);

  const fetchContacts = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/contact/page?page=${page}&size=10&${searchCriteria}=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching contacts:", error);
        return null;
      }
    },
    [page]
  );

  // Dùng useEffect để gọi API khi page hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContacts(searchDebounce, searchCriteria);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.contacts);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchContacts]);
  const handleEditClick = (kindVehicle) => {
    setcurrentContact(kindVehicle);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };
  const handleCreateContact = async (newContact) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        "Người liên hệ": newContact.name,
        "Địa chỉ Email": newContact.email,
        "Tiêu đề liên hệ": newContact.title,
        "Nội dung liên hệ": newContact.content,
      })
    )
      return;
    const newContactData = {
      name: newContact.name,
      email: newContact.email,
      title: newContact.title,
      content: newContact.content,
    };
    try {
      // Gửi request tạo loại xe
      const created = await sendRequest(
        "http://localhost:8081/api/contact",
        "POST",
        newContactData
      );

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Liên hệ mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo liên hệ:", error);
    }
  };

  const handleUpdateContact = async (updateContact) => {
    if (
      !validateFields({
        "Người liên hệ": updateContact.name,
        "Địa chỉ Email": updateContact.email,
        "Tiêu đề liên hệ": updateContact.title,
        "Nội dung liên hệ": updateContact.content,
      })
    )
      return;
    const updateContactData = {
      name: updateContact.name,
      email: updateContact.email,
      title: updateContact.title,
      content: updateContact.content,
    };

    try {
      const updated = await sendRequest(
        `http://localhost:8081/api/contact/${updateContact.id}`,
        "PUT",
        updateContactData
      );

      toast.success("Liên hệ đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update liên hệ:", error);
    }
  };

  const removeContact = async () => {
    const contactId = contactToDelete.id;

    try {
      await sendRequest(
        `http://localhost:8081/api/contact/${contactId}`,
        "DELETE"
      );

      setRecords((prev) => prev.filter((record) => record.id !== contactId));
      toast.success("Liên hệ đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa liên hệ:", error);
    }
  };
  const handleRemoveClick = (contact) => {
    setContactToDelete(contact);
    setIsDeleteConfirmVisible(true);
  };
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  return (
    <div className="main-container">
      <GenericAdminHeader
        title="Quản lý liên hệ"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Liên hệ", href: "/admin/contacts" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={contactField}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm liên hệ"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={contactColumn}
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
        title="Sửa thông tin liên hệ"
        data={currentContact}
        fields={contactField}
        onSave={handleUpdateContact}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm liên hệ"
        fields={contactField}
        // defaultValues={{ status: 0 }} // mặc định status = 1
        onSave={handleCreateContact}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa liên hệ này?"
        onConfirm={removeContact} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminContact;
