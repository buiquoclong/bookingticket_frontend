import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { promotionColumn, promotionFields } from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_PROMOTION,
  GET_PROMOTION_BY_ID,
  GET_PROMOTION_PAGE,
} from "../../../Utils/apiUrls";

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
  const [isLoading, setIsLoading] = useState(false);
  const fetchPromotions = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const data = await sendRequest(
          GET_PROMOTION_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
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

  // ✅ Tạo Promotion
  const handleCreatePromotion = async (newPromo) => {
    if (
      !validateFields({
        "Mô tả": newPromo.description,
        "Ngày bắt đầu": newPromo.startDay,
        "Ngày kết thúc": newPromo.endDay,
        "Giảm giá": newPromo.discount,
      })
    )
      return;

    try {
      setIsLoading(true);
      const created = await sendRequest(CREATE_PROMOTION, "POST", newPromo);

      toast.success("Mã giảm giá đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo mã giảm giá:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Cập nhật Promotion
  const handleUpdatePromotion = async (updatePromo) => {
    if (
      !validateFields({
        "Mã giảm giá": updatePromo.code,
        "Mô tả": updatePromo.description,
        "Ngày bắt đầu": updatePromo.startDay,
        "Ngày kết thúc": updatePromo.endDay,
        "Giảm giá": updatePromo.discount,
      })
    )
      return;

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_PROMOTION_BY_ID(updatePromo.id),
        "PUT",
        updatePromo
      );

      toast.success("Mã giảm giá đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((promo) => (promo.id === updated.id ? updated : promo))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật mã giảm giá:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Xóa Promotion
  const removePromotion = async () => {
    if (!promotionToDelete) return;

    const promotionId = promotionToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_PROMOTION_BY_ID(promotionId), "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== promotionId));
      toast.success("Promotion đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa Promotion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý mã giảm giá"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Mã giảm giá", href: "/admin/promotions" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={promotionFields}
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
