import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
// import "../AdminReview/AdminReview.scss"
import { Pagination, Breadcrumbs, Link } from "@mui/material";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";
import useDebounce from "./useDebounce";

const AdminReview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setcurrentReview] = useState();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("userName");
  const [searchValue, setSearchValue] = useState("");
  const searchDebounce = useDebounce(searchValue.trim(), 500);
  const columns = [
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          ID
        </div>
      ),
      selector: (row) => row.id,
      width: "3rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {row.id}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Tên
        </div>
      ),
      selector: (row) => row.user.name,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.user.name}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Chuyến
        </div>
      ),
      selector: (row) => row.trip.route.name,
      width: "10rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.trip.route.name}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Tên xe
        </div>
      ),
      selector: (row) => row.trip.vehicle.name,
      width: "7rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.trip.vehicle.name}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Loại xe
        </div>
      ),
      selector: (row) => row.trip.vehicle.kindVehicle.name,
      width: "7rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.trip.vehicle.kindVehicle.name}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Biển số
        </div>
      ),
      selector: (row) => row.trip.vehicle.vehicleNumber,
      width: "6rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.trip.vehicle.vehicleNumber}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Thời gian khởi hành{" "}
        </div>
      ),
      width: "10rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.trip.timeStart.slice(0, 5)} - {formatDate(row.trip.dayStart)}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Đánh giá
        </div>
      ),
      selector: (row) => row.rating,
      width: "7rem",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={{
                color: index < row.rating ? "gold" : "grey",
                fontSize: "20px",
              }}
            >
              ★
            </span>
          ))}
        </div>
      ),
    },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Nội dung
        </div>
      ),
      selector: (row) => row.content,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          {row.content}
        </div>
      ),
    },
    // ,
    // {
    //     name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Tài khoản</div>,
    //     selector: row => row.status,
    //     width: '10rem',
    //     cell: row => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',backgroundColor: statusColorMap[row.status] || 'transparent', padding:".3rem 0rem", borderRadius:"5px", fontWeight:"600", color:"" }}>{statusMap[row.status] || 'Unknown Status'}</div>
    // },
    {
      name: (
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Hành động
        </div>
      ),
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <FiEdit
            size={24}
            style={{
              color: "#3b82f6",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onClick={() => handleEditClick(row)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3b82f6")}
            title="Chỉnh sửa"
          />
          <FiTrash
            size={24}
            style={{
              color: "#ef4444",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onClick={() => handleRemoveClick(row)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ef4444")}
            title="Xóa"
          />
        </div>
      ),
    },
  ];
  const ratingsDescription = ["Tệ", "Trung bình", "Tốt", "Rất tốt", "Xuất sắc"];
  const fetchReviews = useCallback(
    async (searchDebounce) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/review/page?page=${page}&size=10&${searchCriteria}=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return null;
      }
    },
    [page, searchCriteria]
  ); // Chỉ phụ thuộc vào page và searchCriteria vì searchDebounce được truyền trực tiếp vào hàm

  // Dùng useEffect để gọi API khi page, searchDebounce hoặc searchCriteria thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReviews(searchDebounce);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.reviews);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchReviews]);
  const handleEditClick = (kindVehicle) => {
    setcurrentReview(kindVehicle);
    setIsEditing(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleUpdateRating = async (e) => {
    e.preventDefault();
    let missingInfo = [];
    if (!currentReview.rating) {
      missingInfo.push("Đánh giá");
    }
    if (missingInfo.length > 0) {
      const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
        ",  "
      )}`;
      toast.error(message);
    } else {
      try {
        const token = localStorage.getItem("token");
        const newRating = {
          rating: currentReview.rating,
          content: currentReview.content,
        };

        const response = await fetch(
          `http://localhost:8081/api/review/${currentReview.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newRating),
          }
        );

        if (response.ok) {
          // Xử lý thành công
          toast.success("Bạn đã cập nhật đánh giá thành công");
          // Cập nhật danh sách đánh giá sau khi cập nhật thành công
          const updatedReview = await response.json();
          const updatedReviews = records.map((review) => {
            if (review.id === updatedReview.id) {
              return updatedReview;
            }
            return review;
          });
          setRecords(updatedReviews);
          setIsEditing(false);
          // window.location.reload();
        } else {
          toast.error("Có lỗi xảy ra khi tạo đánh giá!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi:", error);
      }
    }
  };
  const removeReview = async () => {
    const reviewId = reviewToDelete.id;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.ok) {
        // Lọc danh sách các thành phố để loại bỏ thành phố đã xóa
        const updatedReview = records.filter(
          (record) => record.id !== reviewId
        );
        setRecords(updatedReview);
        toast.success("Đánh giá đã được xóa thành công!");
        setIsDeleteConfirmVisible(false);
      } else {
        console.error("Có lỗi xảy ra khi xóa Review!");
        toast.error("Có lỗi xảy ra khi xóa Đánh giá!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Lỗi:", error.message);
    }
  };

  const handleRemoveClick = (review) => {
    setReviewToDelete(review);
    setIsDeleteConfirmVisible(true);
  };

  const NoDataComponent = () => (
    <div className="emptyData">Không có dữ liệu</div>
  );
  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  return (
    <div className="main-container">
      {/* <section className="main section"> */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/reviews">
          Đánh giá
        </Link>
      </Breadcrumbs>

      <div className="HisContent">
        <div className="searchIn">
          {/* <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/> */}
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Tìm kiếm`}
            value={searchValue}
            className="findTuyen"
            style={{ marginRight: "1rem" }}
          />
          <FormControl
            sx={{ minWidth: 150 }}
            variant="outlined"
            className="searchCriteria"
            size="small"
          >
            <InputLabel id="search-criteria-label">Tìm kiếm bằng</InputLabel>
            <Select
              labelId="search-criteria-label"
              id="search-criteria"
              value={searchCriteria}
              onChange={handleCriteriaChange}
              label="Tiềm kiếm bằng"
            >
              <MenuItem value="userName">Tên</MenuItem>
              <MenuItem value="rating">Số sao đánh giá</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="HistoryTick">
          <div className="contentTikcet">
            <div className="title">Đánh giá</div>
            {/* <button className="btn back">Tạo chi tiết hóa đơn</button> */}
          </div>
          <div className="devide"></div>
          <DataTable
            columns={columns}
            data={records}
            // pagination
            noDataComponent={<NoDataComponent />}
          ></DataTable>
          <Pagination
            count={totalPages}
            boundaryCount={1}
            siblingCount={1}
            color="primary"
            showFirstButton
            showLastButton
            style={{ float: "right", padding: "1rem" }}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>

      {isEditing && (
        <div className="modal" id="deleteModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Sửa Chi tiết Đánh giá</h2>
              </div>
              <div className="modal-body">
                <div className="infoBookingTicket">
                  <div className="lineInfo">
                    <span>Tuyến:</span>
                    <div className="rightInfo">
                      <span>{currentReview.trip.route.name}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Loại xe:</span>
                    <div className="rightInfo">
                      <span>{currentReview.trip.vehicle.kindVehicle.name}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Ngày:</span>
                    <div className="rightInfo">
                      <span>{formatDate(currentReview.trip.dayStart)}</span>
                    </div>
                  </div>
                  <div className="lineInfo">
                    <span>Thời gian:</span>
                    <div className="rightInfo">
                      <span>{currentReview.trip.timeStart.slice(0, 5)}</span>
                    </div>
                  </div>
                </div>
                <div className="devide"></div>
                <h3 className="modal-title">Chi tiết Đánh giá</h3>
                <form>
                  <div className="ratingStars">
                    <StarRatings
                      rating={currentReview.rating}
                      starRatedColor="#ffe600"
                      changeRating={(newRating) =>
                        setcurrentReview({
                          ...currentReview,
                          rating: newRating,
                        })
                      }
                      numberOfStars={5}
                      name="rating"
                      starHoverColor="#ffe600"
                      starDimension="35px"
                    />
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <p
                        style={{
                          color:
                            currentReview.rating >= 4 ? "#ffe600" : "inherit",
                        }}
                      >
                        {currentReview.rating > 0
                          ? ratingsDescription[currentReview.rating - 1]
                          : ""}
                      </p>
                    </div>
                  </div>
                  <textarea
                    className="contentTextarea"
                    style={{ width: "100%", height: "150px" }}
                    placeholder="Nhập nội dung đánh giá"
                    value={currentReview.content}
                    onChange={(e) =>
                      setcurrentReview({
                        ...currentReview,
                        content: e.target.value,
                      })
                    }
                  />
                  <div className="listButton">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="cancel"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="save"
                      onClick={handleUpdateRating}
                    >
                      Sửa đánh giá
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeleteConfirmVisible && (
        <div className="modal" id="confirmDeleteModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Xác nhận xóa</h2>
              </div>
              <div className="modal-body">
                <p className="textConfirm">
                  Bạn có chắc chắn muốn xóa đánh giá này?
                </p>
                <div className="listButton">
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirmVisible(false)}
                    className="cancel"
                  >
                    Hủy
                  </button>
                  <button type="button" className="save" onClick={removeReview}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminReview;
