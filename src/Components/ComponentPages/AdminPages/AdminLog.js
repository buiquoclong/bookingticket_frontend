import React, { useState, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { logColumn } from "../../../Utils/bookingUtils";

const AdminLog = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("userName");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const LevelMap = {
    1: "INFO",
    2: "WARNING",
    3: "DANGER",
  };
  const levelColorMap = {
    1: "#008000b3",
    2: "#ffa9008a",
    3: "#ff0000c2",
  };
  const fetchLogs = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/log/page?page=${page}&${searchCriteria}=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching logs:", error);
        return null;
      }
    },
    [page]
  ); // Dùng useCallback để hàm này không bị tái tạo lại trừ khi page hoặc searchCriteria thay đổi

  // Dùng useEffect để gọi API khi page, searchDebounce, hoặc searchCriteria thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLogs(searchDebounce, searchCriteria);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.logs);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchLogs]);
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  return (
    <div className="main-container">
      <GenericAdminHeader
        title="Quản lý nhật ký"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Log", href: "/admin/logs" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={[
          { value: "userName", label: "Người thực hiện" },
          { value: "level", label: "Mức độ cảnh báo" },
        ]}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={logColumn}
            data={records}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            statusColorMap={levelColorMap}
            statusMap={LevelMap}
            showActions={false}
          />
        </div>
      </div>
    </div>
  );
};
export default AdminLog;
