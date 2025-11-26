import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import { routeColumn, routeField } from "../../../Utils/bookingUtils";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_ROUTE,
  GET_ALL_CITIES,
  GET_ROUTE_BY_ID,
  GET_ROUTE_PAGE,
} from "../../../Utils/apiUrls";

const AdminRoute = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoute, setcurrentRoute] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [records, setRecords] = useState([]);
  const [cities, setCities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");
  const searchDebounce = useDebounce(
    typeof searchValue === "string" ? searchValue.trim() : searchValue,
    500
  );
  const statusMap = {
    1: "Đang hoạt động",
    2: "Tạm dừng hoạt động",
    3: "Ngưng hoạt động",
  };

  const statusColorMap = {
    1: "#008000b3",
    2: "#ffa9008a",
    3: "#ff0000c2",
  };
  const fetchRoutes = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const data = await sendRequest(
          GET_ROUTE_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching routes:", error);
        return null;
      }
    },
    [page]
  );

  const fetchCities = useCallback(async () => {
    try {
      const data = await sendRequest(GET_ALL_CITIES, "GET");
      return data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [routesData, citiesData] = await Promise.all([
        fetchRoutes(searchDebounce, searchCriteria),
        fetchCities(),
      ]);

      if (routesData) {
        setRecords(routesData.routes);
        setTotalPages(routesData.totalPages);
      }
      if (citiesData) {
        setCities(citiesData);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchRoutes, fetchCities]);
  const handleEditClick = (routeName) => {
    setcurrentRoute(routeName);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };
  const handleCreateRoute = async (newRoute) => {
    if (
      !validateFields({
        "Tên tuyến": newRoute.name,
        "Điểm đi": newRoute.diemdi,
        "Điểm đến": newRoute.diemden,
        "Quãng đường": newRoute.khoangCach,
        "Thời gian di chuyển": newRoute.timeOfRoute,
        "Trạng thái": newRoute.status,
      })
    )
      return;
    const newRouteData = {
      name: newRoute.name,
      diemdi: newRoute.diemdi,
      diemden: newRoute.diemden,
      khoangCach: newRoute.khoangCach,
      timeOfRoute: newRoute.timeOfRoute,
      status: newRoute.status,
    };
    try {
      setIsLoading(true);
      const created = await sendRequest(CREATE_ROUTE, "POST", newRouteData);

      toast.success("Tuyến mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo tuyến:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRoute = async (updateRoute) => {
    if (
      !validateFields({
        "Tên tuyến": updateRoute.name,
        "Điểm đi": updateRoute.diemdi,
        "Điểm đến": updateRoute.diemden,
        "Quãng đường": updateRoute.khoangCach,
        "Thời gian di chuyển": updateRoute.timeOfRoute,
        "Trạng thái": updateRoute.status,
      })
    )
      return;
    const updateRouteData = {
      name: updateRoute.name,
      diemdi: updateRoute.diemdi,
      diemden: updateRoute.diemden,
      khoangCach: updateRoute.khoangCach,
      timeOfRoute: updateRoute.timeOfRoute,
      status: updateRoute.status,
    };

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_ROUTE_BY_ID(updateRoute.id),
        "PUT",
        updateRouteData
      );

      toast.success("Tuyến đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update tuyến:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    }
  };
  const removeRoute = async () => {
    const routeId = routeToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_ROUTE_BY_ID(routeId), "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== routeId));
      toast.success("Tuyến đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa tuyến:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = (route) => {
    setRouteToDelete(route);
    setIsDeleteConfirmVisible(true);
  };
  const searchOptions = routeField.map((field) => {
    if (field.type === "select") {
      if (field.key === "status") {
        return { ...field, value: field.key, options: statusMap };
      }
    }
    if (field.key === "diemdi" || field.key === "diemden") {
      return { ...field, value: field.key, options: cities };
    }

    return { ...field, value: field.key };
  });
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
    setSearchValue("");
  };
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
      <GenericAdminHeader
        title="Quản lý tuyến"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Tuyến", href: "/admin/routes" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={searchOptions}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm tuyến"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={routeColumn}
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
        title="Sửa thông tin tuyến"
        data={currentRoute}
        fields={searchOptions}
        onSave={handleUpdateRoute}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm tuyến"
        fields={searchOptions}
        defaultValues={{ status: 1 }}
        onSave={handleCreateRoute}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa tuyến này?"
        onConfirm={removeRoute}
        onCancel={() => setIsDeleteConfirmVisible(false)}
        type="delete"
      />
    </div>
  );
};
export default AdminRoute;
