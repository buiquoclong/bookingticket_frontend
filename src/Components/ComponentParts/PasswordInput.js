import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ComponentParts.scss";

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  toggleShow,
  errorMessage,
  hintText,
  name,
}) => {
  return (
    <div className="passwordGroup">
      <label className="label">{label}</label>
      <div className="inputWrapper">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="inputField"
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
        {showPassword ? (
          <FaEyeSlash onClick={toggleShow} className="toggleIcon" />
        ) : (
          <FaEye onClick={toggleShow} className="toggleIcon" />
        )}
      </div>
      {errorMessage ? (
        <p className="errorText">{errorMessage}</p>
      ) : (
        hintText && <p className="hintText">{hintText}</p>
      )}
    </div>
  );
};

export default PasswordInput;
