import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import {
  catchPointColumn,
  catchPointFields,
} from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  GET_CATCH_POINT_PAGE,
  GET_ALL_ROUTES,
  CREATE_CATCH_POINT,
  GET_CATCH_POINT_BY_ID,
} from "../../../Utils/apiUrls";
const AdminCatchPoint = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPoint, setCurrentPoint] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [pointToDelete, setPointToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");

  const [isLoading, setIsLoading] = useState(false);
  const searchDebounce = useDebounce(
    typeof searchValue === "string" ? searchValue.trim() : searchValue,
    500
  );

  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const fetchCatchPoint = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const data = await sendRequest(
          GET_CATCH_POINT_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching catch points:", error);
        return null;
      }
    },
    [page]
  );

  const fetchRoutes = useCallback(async () => {
    try {
      const data = await sendRequest(GET_ALL_ROUTES, "GET");
      return data;
    } catch (error) {
      console.error("Error fetching routes:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Sử dụng Promise.all để gọi đồng thời
        const [catchPointsData, routesData] = await Promise.all([
          fetchCatchPoint(searchDebounce, searchCriteria),
          fetchRoutes(),
        ]);

        // Cập nhật trạng thái chỉ khi component còn mounted
        if (catchPointsData) {
          setRecords(catchPointsData.catchPoints);
          setTotalPages(catchPointsData.totalPages);
        }

        if (routesData) {
          setRoutes(routesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchCatchPoint, fetchRoutes]);

  const handleEditClick = (catchPoints) => {
    setCurrentPoint(catchPoints);

    setIsEditing(true);
  };

  const handleCreateCatchPoint = async (newCatchPoint) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        Tuyến: newCatchPoint.routeId,
        "Tên điểm đón": newCatchPoint.name,
        "Địa chỉ": newCatchPoint.address,
      })
    )
      return;
    const newPointData = {
      routeId: newCatchPoint.routeId,
      name: newCatchPoint.name,
      address: newCatchPoint.address,
    };

    try {
      setIsLoading(true);
      // Gửi request tạo loại xe
      const created = await sendRequest(
        CREATE_CATCH_POINT,
        "POST",
        newPointData
      );

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Điểm đón mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo loại điểm đón:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCatchPoint = async (updateCatchPoint) => {
    if (
      !validateFields({
        Tuyến: updateCatchPoint.routeId,
        "Tên điểm đón": updateCatchPoint.name,
        "Địa chỉ": updateCatchPoint.address,
      })
    )
      return;
    const updatePointData = {
      routeId: updateCatchPoint.routeId,
      name: updateCatchPoint.name,
      address: updateCatchPoint.address,
    };

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_CATCH_POINT_BY_ID(updateCatchPoint.id),
        "PUT",
        updatePointData
      );

      toast.success("Điểm đón đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update điểm đón:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const removeCatchPoint = async () => {
    const pointId = pointToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_CATCH_POINT_BY_ID(pointId), "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== pointId));
      toast.success("Điểm đón đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa điểm đón:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveClick = (point) => {
    setPointToDelete(point);
    setIsDeleteConfirmVisible(true);
  };
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
    setSearchValue(""); // reset value khi đổi tiêu chí
  };
  const searchOptions = catchPointFields.map((field) => {
    if (field.type === "select" && field.key === "routeId") {
      return { ...field, value: field.key, options: routes };
    }
    return { ...field, value: field.key };
  });
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý điểm đón tuyến"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Điểm đón tuyến", href: "/admin/catch-point" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={searchOptions}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm điểm đón"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={catchPointColumn}
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
        title="Sửa thông tin điểm đón"
        data={currentPoint}
        fields={searchOptions}
        onSave={handleUpdateCatchPoint}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm điểm đón"
        fields={searchOptions}
        defaultValues={{ status: 1 }} // mặc định status = 1
        onSave={handleCreateCatchPoint}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa điểm đón này?"
        onConfirm={removeCatchPoint} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminCatchPoint;
