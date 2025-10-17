import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { promotionColumn, promotionFields } from "../../../Utils/bookingUtils";

const AdminPromotion = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentPromotion, setcurrentPromotion] = useState();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("code");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const fetchPromotions = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/promotion/page?page=${page}&size=10&${searchCriteria}=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching promotions:", error);
        return null;
      }
    },
    [page]
  );

  // Dùng useEffect để gọi API khi page hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPromotions(searchDebounce, searchCriteria);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.promotions);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchPromotions]);

  const handleEditClick = (promo) => {
    setcurrentPromotion(promo);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const handleRemoveClick = (promotion) => {
    setPromotionToDelete(promotion);
    setIsDeleteConfirmVisible(true);
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
    setSearchValue(""); // Reset input mỗi khi đổi tiêu chí
  };

  // Hàm kiểm tra thông tin thiếu
  const checkMissingInfo = (promo, requiredFields) => {
    const missingInfo = requiredFields
      .filter((field) => !promo[field.key])
      .map((field) => field.label);

    if (missingInfo.length > 0) {
      toast.error(
        `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`
      );
      return true; // Có missing info
    }
    return false; // Không có missing info
  };

  // Hàm gửi request chung
  const sendPromotionRequest = async (
    url,
    method,
    promo,
    successMessage,
    resetStateCallback
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: promo.code,
          description: promo.description,
          startDay: promo.startDay,
          endDay: promo.endDay,
          discount: promo.discount,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Có lỗi xảy ra khi ${method === "POST" ? "tạo" : "cập nhật"} mã!`
        );
      }

      const result = await response.json();

      if (method === "POST") {
        setRecords((prev) => [...prev, result]);
      } else if (method === "PUT") {
        setRecords((prev) =>
          prev.map((p) => (p.id === result.id ? result : p))
        );
      }

      toast.success(successMessage);
      resetStateCallback && resetStateCallback();
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  // Create Promotion
  const handleCreatePromotion = (newPromo) => {
    if (
      checkMissingInfo(newPromo, [
        { key: "description", label: "Mô tả" },
        { key: "startDay", label: "Ngày bắt đầu" },
        { key: "endDay", label: "Ngày kết thúc" },
        { key: "discount", label: "Giảm giá" },
      ])
    )
      return;

    sendPromotionRequest(
      "http://localhost:8081/api/promotion",
      "POST",
      newPromo,
      "Mã giảm giá đã được tạo thành công!",
      () => setIsAdd(false)
    );
  };

  // Update Promotion
  const handleUpdatePromotion = (updatePromo) => {
    if (
      checkMissingInfo(updatePromo, [
        { key: "code", label: "Mã giảm giá" },
        { key: "description", label: "Mô tả" },
        { key: "startDay", label: "Ngày bắt đầu" },
        { key: "endDay", label: "Ngày kết thúc" },
        { key: "discount", label: "Giảm giá" },
      ])
    )
      return;

    sendPromotionRequest(
      `http://localhost:8081/api/promotion/${updatePromo.id}`,
      "PUT",
      updatePromo,
      "Mã giảm giá đã được cập nhật thành công!",
      () => setIsEditing(false)
    );
  };

  // Delete Promotion
  const removePromotion = async () => {
    const promotionId = promotionToDelete.id;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/promotion/${promotionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Có lỗi xảy ra khi xóa Promotion!");

      setRecords((prev) => prev.filter((record) => record.id !== promotionId));
      toast.success("Promotion đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  return (
    <div className="main-container">
      <GenericAdminHeader
        title="Quản lý mã giảm giá"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Mã giảm giá", href: "/admin/promotions" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={[
          { value: "code", label: "Mã giảm giá" },
          { value: "description", label: "Mô tả" },
          { value: "startDay", label: "Ngày bắt đầu" },
          { value: "endDay", label: "Ngày kết thúc" },
        ]}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Tạo mã giảm giá"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={promotionColumn}
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
        title="Sửa thông tin mã giảm giá"
        data={currentPromotion}
        fields={promotionFields}
        onSave={handleUpdatePromotion}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Tạo mã giảm giá"
        fields={promotionFields}
        defaultValues={{ status: 1 }} // mặc định status = 1
        onSave={handleCreatePromotion}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa tài xế này?"
        onConfirm={removePromotion} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminPromotion;
