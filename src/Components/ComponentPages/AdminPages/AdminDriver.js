import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
// import "../AdminDriver/AdminDriver.scss"
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination, Breadcrumbs, Link } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";
import useDebounce from "./useDebounce";

const AdminDriver = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentDriver, setcurrentDriver] = useState();
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("name");
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
          Tên tài xế
        </div>
      ),
      selector: (row) => row.name,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {row.name}
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
          Email
        </div>
      ),
      selector: (row) => row.email,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {row.email}
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
          Số điện thoại
        </div>
      ),
      selector: (row) => row.phone,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {row.phone}
        </div>
      ),
    },
    // ,
    // {
    //     name: <div style={{ color: 'blue', fontWeight: 'bold', fontSize:"16px", textAlign:"center", width: '100%' }}>Trạng thái</div>,
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

  // const statusMap = {
  //     1: 'Đang làm',
  //     2: 'Tạm nghỉ',
  //     3: 'Tạm khóa',
  // };
  // const statusColorMap = {
  //     1: '#008000b3',  // Đang làm
  //     2: '#ffa9008a', // Tạm nghỉ
  //     3: '#ff0000c2'     // Tạm khóa
  // };
  const fetchDrivers = useCallback(
    async (searchDebounce, searchCriteria) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/driver/page?page=${page}&size=10&${searchCriteria}=${searchDebounce}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
        return null;
      }
    },
    [page]
  ); // Chỉ tái tạo khi page thay đổi

  // Dùng useEffect để gọi API khi page, searchCriteria, hoặc searchDebounce thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDrivers(searchDebounce, searchCriteria);

      // Cập nhật trạng thái nếu dữ liệu có
      if (data) {
        setRecords(data.drivers);
        setTotalPages(data.totalPages);
      }
    };

    fetchData();
  }, [page, searchDebounce, searchCriteria, fetchDrivers]);
  const handleEditClick = (kindVehicle) => {
    setcurrentDriver(kindVehicle);
    setIsEditing(true);
  };
  const handleCreateClick = () => {
    setIsAdd(true);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    // setEmail(event.target.value);
    const emailAddress = event.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Biểu thức chính quy kiểm tra email

    // Kiểm tra xem email nhập vào có khớp với biểu thức chính quy không
    if (!emailPattern.test(emailAddress)) {
      setEmailErrorMessage("Email không hợp lệ.");
    } else {
      setEmailErrorMessage(""); // Nếu hợp lệ, xóa thông báo lỗi
    }
    setEmail(emailAddress);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  // const handleStatusChange = (event) => {
  //     setStatus(event.target.value)
  // };
  const handleCreateDriver = async (e) => {
    e.preventDefault();
    let missingInfo = [];
    if (!name) {
      missingInfo.push("Tên tài xế");
    }
    if (!email) {
      missingInfo.push("Email");
    } else if (emailErrorMessage) {
      toast.error(emailErrorMessage);
      return;
    }
    if (!phone) {
      missingInfo.push("Số điện thoại");
    }
    if (missingInfo.length > 0) {
      const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
        ",  "
      )}`;
      toast.error(message);
    } else {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ local storage
        const newDriverData = {
          name: name,
          email: email,
          phone: phone,
        };

        const response = await fetch("http://localhost:8081/api/driver", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
          body: JSON.stringify(newDriverData),
        });

        if (response.ok) {
          console.log("Tài xế đã được tạo thành công!");
          toast.success("Tài xế đã được tạo thành công!");
          const newDriver = await response.json();
          setRecords((prevRecords) => [...prevRecords, newDriver]);
          setName("");
          setEmail("");
          setPhone("");
          setIsAdd(false);
        } else {
          console.error("Có lỗi xảy ra khi tạo tài xế!");
          toast.error("Có lỗi xảy ra khi tạo tài xế!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi:", error.message);
      }
    }
  };
  //     e.preventDefault();
  //     let missingInfo = [];
  //     if (!currentDriver.name) {
  //         missingInfo.push("Tên tài xế");
  //     }
  //     if (!currentDriver.email) {
  //         missingInfo.push("Email");
  //     } else if (emailErrorMessage) { // Kiểm tra nếu có errorMessage cho email
  //         toast.error(emailErrorMessage); // Hiển thị errorMessage nếu có
  //         return; // Dừng xử lý tiếp theo nếu có lỗi
  //     }
  //     if (!currentDriver.phone) {
  //         missingInfo.push("Số điện thoại");
  //     }
  //     // if (currentDriver.status === null || currentDriver.status === undefined) {
  //     //     missingInfo.push("Trạng thái");
  //     // }
  //     if (missingInfo.length > 0) {
  //         const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(",  ")}`;
  //         toast.error(message);
  //     } else {
  //         try {
  //             const newDriverData = {
  //                 name: currentDriver.name,
  //                 email: currentDriver.email,
  //                 phone: currentDriver.phone
  //                 // ,
  //                 // status: currentDriver.status
  //             };

  //             const response = await fetch(`http://localhost:8081/api/driver/${currentDriver.id}`, {
  //                 method: "PUT",
  //                 headers: {
  //                     "Content-Type": "application/json"
  //                 },
  //                 body: JSON.stringify(newDriverData)
  //             });

  //             if (response.ok) {
  //                 // Xử lý thành công
  //                 console.log("Driver đã được cập nhật thành công!");
  //                 toast.success("Driver đã được cập nhật thành công!");
  //                 const updatedDriver = await response.json();
  //                 const updatedDrivers = records.map(driver => {
  //                     if (driver.id === updatedDriver.id) {
  //                         return updatedDriver;
  //                     }
  //                     return driver;
  //                 });
  //                 setRecords(updatedDrivers);
  //                 // Reset form hoặc làm gì đó khác
  //                 setName('');
  //                 setEmail('');
  //                 setPhone('');
  //                 setIsEditing(false);
  //                 // window.location.reload();
  //             } else {
  //                 console.error("Có lỗi xảy ra khi cập nhật driver!");
  //                 toast.error("Có lỗi xảy ra khi cập nhật driver!");
  //             }
  //         } catch (error) {
  //             console.error("Lỗi:", error);
  //             toast.error("Lỗi:", error);
  //         }
  //     }
  // };
  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    let missingInfo = [];
    if (!currentDriver.name) {
      missingInfo.push("Tên tài xế");
    }
    if (!currentDriver.email) {
      missingInfo.push("Email");
    } else if (emailErrorMessage) {
      toast.error(emailErrorMessage);
      return;
    }
    if (!currentDriver.phone) {
      missingInfo.push("Số điện thoại");
    }
    if (missingInfo.length > 0) {
      const message = `Vui lòng điền thông tin còn thiếu:\n- ${missingInfo.join(
        ",  "
      )}`;
      toast.error(message);
    } else {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ local storage
        const newDriverData = {
          name: currentDriver.name,
          email: currentDriver.email,
          phone: currentDriver.phone,
        };

        const response = await fetch(
          `http://localhost:8081/api/driver/${currentDriver.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
            body: JSON.stringify(newDriverData),
          }
        );

        if (response.ok) {
          console.log("Tài xế đã được cập nhật thành công!");
          toast.success("Tài xế đã được cập nhật thành công!");
          const updatedDriver = await response.json();
          const updatedDrivers = records.map((driver) => {
            if (driver.id === updatedDriver.id) {
              return updatedDriver;
            }
            return driver;
          });
          setRecords(updatedDrivers);
          setName("");
          setEmail("");
          setPhone("");
          setIsEditing(false);
        } else {
          console.error("Có lỗi xảy ra khi cập nhật tài xế!");
          toast.error("Có lỗi xảy ra khi cập nhật tài xế!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi:", error.message);
      }
    }
  };
  const removeDriver = async () => {
    const driverId = driverToDelete.id;

    try {
      const token = localStorage.getItem("token"); // Lấy token từ local storage
      const response = await fetch(
        `http://localhost:8081/api/driver/${driverId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.ok) {
        const updatedDriver = records.filter(
          (record) => record.id !== driverId
        );
        setRecords(updatedDriver);
        toast.success("Driver đã được xóa thành công!");
        setIsDeleteConfirmVisible(false);
      } else {
        console.error("Có lỗi xảy ra khi xóa Driver!");
        toast.error("Có lỗi xảy ra khi xóa Driver!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Lỗi:", error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRemoveClick = (driver) => {
    setDriverToDelete(driver);
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
        <Link underline="hover" color="inherit" href="/admin/drivers">
          Tài xế
        </Link>
      </Breadcrumbs>

      <div className="HisContent">
        <div className="searchIn">
          {/* <input type="text" onChange={handleFilter} placeholder="Tìm kiếm" className="findTuyen"/> */}
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Tìm kiếm `}
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
              <MenuItem value="name">Tên</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Số điện thoại</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="HistoryTick">
          <div className="contentTikcet">
            <div className="title">Quản lý tài xế</div>
            <button className="btn back" onClick={() => handleCreateClick()}>
              Thêm tài xế
            </button>
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
                <h2 className="modal-title">Sửa thông tin tài xế</h2>
              </div>
              <div className="modal-body">
                <form>
                  <div className="infoCity">
                    <label className="info">Tên:</label>
                    <input
                      type="text"
                      value={currentDriver.name}
                      onChange={(e) =>
                        setcurrentDriver({
                          ...currentDriver,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="infoCity">
                    <label className="info">Email:</label>
                    <input
                      type="text"
                      value={currentDriver.email}
                      onChange={(e) =>
                        setcurrentDriver({
                          ...currentDriver,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="infoCity">
                    <label>Số điện thoại:</label>
                    <input
                      type="text"
                      value={currentDriver.phone}
                      onChange={(e) =>
                        setcurrentDriver({
                          ...currentDriver,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* <div className="infoCity">
                                        <label>Trạng thái:</label> */}
                  {/* <input type="text" className="inputValue" value={statusMap[currentDriver.status] || 'Unknown Status'} onChange={(e) => setcurrentDriver({ ...currentDriver, status: e.target.value })} /> */}
                  {/* <select 
                                            value={currentDriver.status}  className="inputValue"
                                            onChange={(e) => setcurrentDriver({ ...currentDriver, status: e.target.value })}
                                        >
                                            {Object.keys(statusMap).map(key => (
                                                <option key={key} value={key}>
                                                    {statusMap[key]}
                                                </option>
                                            ))}
                                        </select> */}
                  {/* </div> */}
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
                      onClick={handleUpdateDriver}
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAdd && (
        <div className="modal" id="deleteModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Thêm tài xế</h2>
              </div>
              <div className="modal-body">
                <form>
                  <div className="infoCity">
                    <label className="info">Tên:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="infoCity">
                    <label className="info">Email:</label>
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="infoCity">
                    <label>Số điện thoại:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  {/* <div className="infoCity">
                                        <label>Tài khoản:</label> */}
                  {/* <input type="text" className="inputValue" value={statusMap[currentDriver.status] || 'Unknown Status'} onChange={(e) => setcurrentDriver({ ...currentDriver, status: e.target.value })} /> */}
                  {/* <select 
                                            className="inputValue"
                                            value={status} onChange={handleStatusChange} 
                                        >
                                            <option value="">Chọn trạng thái</option>
                                            {Object.keys(statusMap).map(key => (
                                                <option key={key} value={key}>
                                                    {statusMap[key]}
                                                </option>
                                            ))}
                                        </select> */}
                  {/* </div> */}
                  <div className="listButton">
                    <button
                      type="button"
                      onClick={() => setIsAdd(false)}
                      className="cancel"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="save"
                      onClick={handleCreateDriver}
                    >
                      Tạo
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
                  Bạn có chắc chắn muốn xóa tài xế này?
                </p>
                <div className="listButton">
                  <button
                    type="button"
                    onClick={() => setIsDeleteConfirmVisible(false)}
                    className="cancel"
                  >
                    Hủy
                  </button>
                  <button type="button" className="save" onClick={removeDriver}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* </section> */}
      <ToastContainer
        className="toast-container"
        toastClassName="toast"
        bodyClassName="toast-body"
        progressClassName="toast-progress"
        theme="colored"
        transition={Zoom}
        autoClose={500}
        hideProgressBar={true}
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};
export default AdminDriver;
