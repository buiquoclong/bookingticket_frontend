import React, { useState, useEffect } from "react";
import "./AdminForBookTicket.scss";
import { Breadcrumbs, Link } from "@mui/material";
import { toast } from "react-toastify";
import { FaBus, FaSearchLocation } from "react-icons/fa";
import SearchTripForm from "../../../ComponentParts/SearchTripForm";
import { sendRequest } from "../../../../Utils/apiHelper";
import { GET_ALL_CITIES } from "../../../../Utils/apiUrls";

function AdminForBookTicket() {
  const [cities, setCities] = useState([]);

  // form values chung cho SearchTripForm
  const [formValues, setFormValues] = useState({
    kind: "Một chiều",
    origin: "",
    destination: "",
    originId: null,
    destinationId: null,
    dayStart: "",
    dayReturn: "",
    navigateTo: "/admin/find-trips",
  });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await sendRequest(GET_ALL_CITIES, "GET");
      setCities(response);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Không thể tải danh sách thành phố!");
    }
  };

  return (
    <main className="admin-booking-page">
      {/* Header */}
      <section className="admin-booking-header">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
          <Link underline="hover" color="inherit" href="/admin">
            Admin
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/admin/book-ticket"
          >
            Đặt vé
          </Link>
        </Breadcrumbs>

        <div className="header-title">
          <FaBus className="title-icon" />
          <h1>Tìm chuyến xe</h1>
        </div>
      </section>

      {/* Nội dung */}
      <section className="admin-booking-content">
        <div className="booking-card">
          <div className="card-header">
            <FaSearchLocation className="card-icon" />
            <h2 className="card-title">Tra cứu chuyến đi</h2>
          </div>
          <SearchTripForm
            formValues={formValues}
            setFormValues={setFormValues}
            cities={cities}
            navigateTo="/admin/find-trips"
          />
        </div>
      </section>
    </main>
  );
}

export default AdminForBookTicket;
