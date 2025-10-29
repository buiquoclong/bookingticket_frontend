import React, { useState, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";

import { reviewColumn, searchReviewOptions } from "../../../Utils/bookingUtils";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import { sendRequest } from "../../../Utils/apiHelper";
import { GET_REVIEW_PAGE } from "../../../Utils/apiUrls";
const AdminReview = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("userName");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const [isLoading, setIsLoading] = useState(false);
  const fetchReviews = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        setIsLoading(true);
        const data = await sendRequest(
          GET_REVIEW_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  // Dùng useEffect để gọi API khi page, searchDebounce hoặc searchCriteria thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReviews(searchDebounce, searchCriteria);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.reviews);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchReviews]);

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý tuyến"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Tuyến", href: "/admin/routes" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={searchReviewOptions}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm tuyến"
        // onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={reviewColumn}
            data={records}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            showActions={false}
          />
        </div>
      </div>
    </div>
  );
};
export default AdminReview;
