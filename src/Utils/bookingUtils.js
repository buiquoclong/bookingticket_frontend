export const SEAT_STATUS = {
  SOLD: 1,
  RESERVED: 2,
  AVAILABLE: 0,
};

// Format ngày
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
};
