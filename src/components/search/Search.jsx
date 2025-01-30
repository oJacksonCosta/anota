import "./search.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRef } from "react";

export default function Search({ onSearch }) {
  const iconRef = useRef(null);

  const searchFocus = () => {
    if (iconRef.current) {
      iconRef.current.style.color = "var(--blue)";
    }
  };

  const searchBlur = () => {
    if (iconRef.current) {
      iconRef.current.style.color = "#ffffff80";
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Pesquisar"
        onChange={handleSearch}
        onFocus={searchFocus}
        onBlur={searchBlur}
      />
      <i className="bi bi-search" ref={iconRef}></i>
    </div>
  );
}
