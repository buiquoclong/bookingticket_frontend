import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import useDebounce from "./useDebounce";
import AdminTable from "../../ComponentParts/AdminComponents/AdminTable";
import ConfirmDeleteModal from "../../ComponentParts/ModelComponents/ConfirmDeleteModal";
import EditModal from "../../ComponentParts/ModelComponents/EditModal";
import AddModal from "../../ComponentParts/ModelComponents/AddModal";
import GenericAdminHeader from "../../ComponentParts/AdminComponents/GenericAdminHeader";
import { seatColumn, seatFields } from "../../../Utils/bookingUtils";
import { validateFields, sendRequest } from "../../../Utils/apiHelper";
import LoadingBackdrop from "../../ComponentParts/LoadingBackdrop";
import {
  CREATE_SEAT,
  GET_ALL_KIND_VEHICLE,
  GET_SEAT_BY_ID,
  GET_SEAT_PAGE,
} from "../../../Utils/apiUrls";

const AdminSeat = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSeat, setcurrentSeat] = useState({});

  const [isAdd, setIsAdd] = useState(false);
  const [records, setRecords] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [kindVehicles, setKindVehicles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [seatToDelete, setSeatToDelete] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(
    typeof searchValue === "string" ? searchValue.trim() : searchValue,
    500
  );

  const statusMap = {
    1: "Đang hoạt động",
    2: "Tạm dừng hoạt động",
    3: "Ngừng hoạt động",
  };

  const statusColorMap = {
    1: "#008000b3", // Đang làm
    2: "#ffa9008a", // Tạm nghỉ
    3: "#ff0000c2", // Tạm khóa
  };
  const fetchKindVehicles = useCallback(async () => {
    try {
      const data = await sendRequest(GET_ALL_KIND_VEHICLE, "GET");
      setKindVehicles(data);
      return data;
    } catch (error) {
      console.error("Error fetching routes:", error);
      return null;
    }
  }, []);
  const fetchSeats = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        setIsLoading(true);
        const data = await sendRequest(
          GET_SEAT_PAGE(page, 10, searchCriteria, searchDebounce),
          "GET"
        );
        return data;
      } catch (error) {
        console.error("Error fetching seats:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSeats(searchDebounce, searchCriteria);

      if (data) {
        setRecords(data.seats);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
    fetchKindVehicles();
  }, [page, searchDebounce, fetchKindVehicles, searchCriteria, fetchSeats]);
  const handleEditClick = (seat) => {
    setcurrentSeat(seat);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };

  const handleCreateSeat = async (newSeat) => {
    if (
      !validateFields({
        "Loại xe": newSeat.kindVehicleId,
        "Tên ghế": newSeat.name,
        "Trạng thái": newSeat.status,
      })
    )
      return;
    const newSeatData = {
      kindVehicleId: newSeat.kindVehicleId,
      name: newSeat.name,
      status: newSeat.status,
    };
    try {
      setIsLoading(true);
      const created = await sendRequest(CREATE_SEAT, "POST", newSeatData);

      toast.success("Ghế ngồi mới đã được tạo thành công!");
      setRecords((prev) => [...prev, created]);
      setIsAdd(false);
    } catch (error) {
      console.error("Lỗi khi tạo ghế ngồi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSeat = async (updateSeat) => {
    if (
      !validateFields({
        "Loại xe": updateSeat.kindVehicleId,
        "Tên ghế": updateSeat.name,
        "Địa chỉ": updateSeat.status,
      })
    )
      return;
    const updateSeatData = {
      kindVehicleId: updateSeat.kindVehicleId,
      name: updateSeat.name,
      status: updateSeat.status,
    };

    try {
      setIsLoading(true);
      const updated = await sendRequest(
        GET_SEAT_BY_ID(updateSeat.id),
        "PUT",
        updateSeatData
      );

      toast.success("Ghế ngồi đã được cập nhật thành công!");
      setRecords((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi update ghế ngồi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSeat = async () => {
    const seatId = seatToDelete.id;

    try {
      setIsLoading(true);
      await sendRequest(GET_SEAT_BY_ID(seatId), "DELETE");

      setRecords((prev) => prev.filter((record) => record.id !== seatId));
      toast.success("Ghế ngồi đã được xóa thành công!");
      setIsDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa ghế ngồi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = (seat) => {
    setSeatToDelete(seat);
    setIsDeleteConfirmVisible(true);
  };
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  const searchOptions = seatFields.map((field) => {
    if (field.type === "select") {
      if (field.key === "kindVehicleId") {
        return { ...field, value: field.key, options: kindVehicles };
      }

      if (field.key === "status") {
        return { ...field, value: field.key, options: statusMap };
      }
    }

    return { ...field, value: field.key };
  });

  return (
    <div className="main-container">
      <LoadingBackdrop open={isLoading} message="Đang tải dữ liệu..." />
      <GenericAdminHeader
        title="Quản lý ghế ngồi"
        breadcrumbLinks={[
          { label: "Admin", href: "/admin" },
          { label: "Ghế ngồi", href: "/admin/seats" },
        ]}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchOptions={searchOptions}
        searchCriteria={searchCriteria}
        handleCriteriaChange={handleCriteriaChange}
        addButtonLabel="Thêm ghế ngồi"
        onAddClick={handleCreateClick}
      />

      <div className="HisContent">
        <div className="HistoryTick">
          <div className="devide"></div>
          <AdminTable
            columns={seatColumn}
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
        title="Sửa thông tin ghế ngồi"
        data={currentSeat}
        fields={searchOptions}
        onSave={handleUpdateSeat}
        onCancel={() => setIsEditing(false)}
      />

      <AddModal
        visible={isAdd}
        title="Thêm ghế ngồi"
        fields={searchOptions}
        defaultValues={{ status: 1 }}
        onSave={handleCreateSeat}
        onCancel={() => setIsAdd(false)}
      />

      <ConfirmDeleteModal
        visible={isDeleteConfirmVisible}
        message="Bạn có chắc chắn muốn xóa ghế ngồi này?"
        onConfirm={removeSeat}
        onCancel={() => setIsDeleteConfirmVisible(false)}
        type="delete"
      />
    </div>
  );
};
export default AdminSeat;
