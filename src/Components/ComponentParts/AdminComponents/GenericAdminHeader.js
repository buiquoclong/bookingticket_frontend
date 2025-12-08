import React, { useRef, useEffect } from "react";
import {
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "./TableComponent.scss";

const GenericAdminHeader = ({
  title = "Admin Page",
  breadcrumbLinks = [],
  searchValue,
  setSearchValue,
  searchOptions = [],
  searchCriteria,
  handleCriteriaChange,
  addButtonLabel = "Thêm",
  onAddClick,
}) => {
  const dateInputRef = useRef();
  const prevCriteriaRef = useRef(searchCriteria);

  const effectiveCriteria =
    searchOptions.length === 1 ? searchOptions[0].key : searchCriteria || "";

  const selectedOption = searchOptions.find(
    (opt) => opt.key === effectiveCriteria
  );
  const optionLabel = selectedOption ? selectedOption.label : "";
  const fieldType = selectedOption ? selectedOption.type : "text";

  const handleCriteriaChangeInternal = (event) => {
    setSearchValue?.("");
    handleCriteriaChange?.(event);
  };

  useEffect(() => {
    if (prevCriteriaRef.current !== effectiveCriteria && searchValue) {
      setSearchValue?.("");
    }
    prevCriteriaRef.current = effectiveCriteria;
  }, [effectiveCriteria, searchValue, setSearchValue]);

  return (
    <div className="generic-admin-header">
      {/* Breadcrumb */}
      <div className="breadcrumbs">
        {breadcrumbLinks.map((link, index) => (
          <React.Fragment key={index}>
            <MuiLink underline="hover" color="inherit" href={link.href}>
              {link.label}
            </MuiLink>
            {index < breadcrumbLinks.length - 1 && (
              <span className="separator">/</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="header-main">
        <div className="title">{title}</div>

        <div className="actions">
          {searchOptions.length > 0 && (
            <div className="search-group">
              {fieldType === "select" ? (
                <FormControl
                  size="small"
                  sx={{
                    minWidth: "180px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "40px",
                    },
                  }}
                >
                  <InputLabel id="select-label">{`Chọn ${optionLabel}`}</InputLabel>
                  <Select
                    labelId="select-label"
                    label={`Chọn ${optionLabel}`}
                    value={searchValue || ""}
                    onChange={(e) => setSearchValue(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>-- Chọn {optionLabel} --</em>
                    </MenuItem>
                    {Array.isArray(selectedOption.options)
                      ? selectedOption.options.map((opt, i) => (
                          <MenuItem key={i} value={opt.value || opt.id}>
                            {opt.label || opt.name}
                          </MenuItem>
                        ))
                      : Object.entries(selectedOption.options || {}).map(
                          ([key, label]) => (
                            <MenuItem
                              key={key}
                              value={key}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                color: "gold",
                                fontSize: "18px",
                              }}
                            >
                              {label}
                            </MenuItem>
                          )
                        )}
                  </Select>
                </FormControl>
              ) : fieldType === "date" || fieldType === "datetime" ? (
                <div
                  style={{ display: "inline-block" }}
                  onClick={() => dateInputRef.current?.showPicker?.()}
                >
                  <TextField
                    type={fieldType === "datetime" ? "datetime-local" : "date"}
                    label={optionLabel}
                    variant="outlined"
                    size="small"
                    // Key để force re-render khi đổi criteria
                    key={effectiveCriteria}
                    value={
                      searchValue
                        ? fieldType === "datetime"
                          ? searchValue.replace(" ", "T")
                          : searchValue
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (fieldType === "datetime") {
                        const formatted = val.replace("T", " ");
                        setSearchValue(formatted);
                      } else {
                        setSearchValue(val);
                      }
                    }}
                    inputRef={dateInputRef}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        height: "40px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "0.9rem",
                        top: "2px",
                      },
                      "& input": { padding: "10px 12px", cursor: "pointer" },
                    }}
                  />
                </div>
              ) : (
                <TextField
                  type="text"
                  // Key để force re-render khi đổi criteria
                  key={effectiveCriteria}
                  label={`Tìm kiếm bằng ${optionLabel}`}
                  variant="outlined"
                  size="small"
                  value={searchValue || ""}
                  onChange={(e) => setSearchValue(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "40px",
                    },
                    "& .MuiInputLabel-root": { fontSize: "0.9rem", top: "2px" },
                    "& input": { padding: "10px 12px" },
                  }}
                />
              )}

              {/* Key để force re-render khi đổi criteria */}
              {searchOptions.length > 1 && (
                <FormControl
                  variant="outlined"
                  size="small"
                  className="search-select"
                  sx={{
                    minWidth: "160px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "40px",
                    },
                  }}
                >
                  <InputLabel id="criteria-label">Tìm kiếm bằng</InputLabel>
                  <Select
                    labelId="criteria-label"
                    value={searchCriteria || ""}
                    onChange={handleCriteriaChangeInternal}
                    label="Tìm kiếm bằng"
                  >
                    {searchOptions.map((option) => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
          )}

          {onAddClick && (
            <button className="btn add-btn" onClick={onAddClick}>
              {addButtonLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericAdminHeader;
