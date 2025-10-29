import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import { cityColumn } from "../../../Utils/bookingUtils";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_CITY,
  GET_CITY_BY_ID,
  GET_CITY_PAGE,
} from "../../../Utils/apiUrls";
const AdminCity = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const fetchCities = useCallback(
    async (searchDebounce) => {
      setIsLoading(true);
      try {
        const data = await sendRequest(
          GET_CITY_PAGE(page, 10, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching cities:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  // Dùng useEffect để gọi API khi page hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCities(searchDebounce);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.cities);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, fetchCities]);

  const handleEditClick = (city) => {
    setCurrentCity(city);
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const handleCreateCity = async (newCity) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        "Tên thành phố": newCity.name,
      })
    )
      return;
    const newCityData = {
      name: newCity.name,
    };
    const formData = new FormData();
    formData.append(
      "city",
      new Blob([JSON.stringify(newCityData)], { type: "application/json" })
    );
    if (newCity.file) {
      formData.append("file", newCity.file);
    }
    try {
      setIsLoading(true);
      // Gửi request tạo loại xe
      const created = await sendRequest(CREATE_CITY, "POST", formData);

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Thành phố mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo thành phố:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateCity = async (updatedCity) => {
    // Validate dữ liệu đầu vào
    if (
      !validateFields({
        "Tên thành phố": updatedCity.name,
      })
    )
      return;
    const updatedCityData = {
      name: updatedCity.name,
    };
    const formData = new FormData();
    formData.append(
      "city",
      new Blob([JSON.stringify(updatedCityData)], { type: "application/json" })
    );
    if (updatedCity.file) {
      formData.append("file", updatedCity.file);
    }
    try {
      setIsLoading(true);
      // Gửi request tạo loại xe
      const updated = await sendRequest(
        GET_CITY_BY_ID(updatedCity.id),
        "PUT",
        formData
      );

      // Hiển thị thông báo & cập nhật danh sách
      toast.success("Thành phố đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update thành phố:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCity = async () => {
    const cityId = cityToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_CITY_BY_ID(cityId), "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== cityId));
      toast.success("Thành phố đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa thành phố:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = (city) => {
    setCityToDelete(city);
    setIsDeleteConfirmVisible(true);
  };

  const cityField = [
    { key: "name", label: "Tên thành phố", type: "text" },
    {
      key: "imgUrl",
      label: "Hình ảnh",
      type: "file",
    },
  ];
  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang xử lý yêu cầu..." />
      <GenericAdminHeader
        title="Quản lý thành phố"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Thành phố", href: "/admin/cities" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={[
          { key: "name", label: "Tên thành phố", type: "text" }, // có thể thêm nhiều option khác
        ]}
        addButtonLabel="Thêm thành phố"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={cityColumn}
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
        title="Sửa thông tin thành phố"
        data={currentCity}
        fields={cityField}
        onSave={handleUpdateCity}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm thành phố"
        fields={cityField}
        defaultValues={{ status: 0 }} // mặc định status = 1
        onSave={handleCreateCity}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa thành phố này?"
        onConfirm={removeCity} // khi xác nhận
        onCancel={() => setIsDeleteConfirmVisible(false)} // khi hủy
        type="delete"
      />
    </div>
  );
};
export default AdminCity;
