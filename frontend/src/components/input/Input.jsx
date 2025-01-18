import "bootstrap-icons/font/bootstrap-icons.css";
import { useRef } from "react";
import "./input.css";

export default function InputMail({
  type,
  placeholder,
  value,
  width,
  onChange,
}) {
  const inputRef = useRef(null);
  const iconRef = useRef(null);

  if (type === "password") {
    return (
      <div className="input-container">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          style={{ width: width, paddingRight: "3rem" }}
          onChange={onChange}
          ref={inputRef}
        />
        <button
          className="eye-btn"
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();

            if (inputRef.current.type === "password") {
              inputRef.current.type = "text";
              iconRef.current.classList.remove("bi-eye-slash-fill");
              iconRef.current.classList.add("bi-eye-fill");
              inputRef.current.focus();
            } else {
              inputRef.current.type = "password";
              iconRef.current.classList.remove("bi-eye-fill");
              iconRef.current.classList.add("bi-eye-slash-fill");
              inputRef.current.focus();
            }
          }}
        >
          <i className="bi bi-eye-slash-fill" ref={iconRef}></i>
        </button>
      </div>
    );
  } else {
    return (
      <div className="input-container">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          style={{ width: width }}
          onChange={onChange}
        />
      </div>
    );
  }
}
