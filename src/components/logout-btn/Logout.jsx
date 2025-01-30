import "./logout.css";

export default function LogoutBtn() {
  const handleLogout = () => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    } else {
      sessionStorage.removeItem("userId");
    }
    window.location.href = "/login";
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      <i className="bi bi-box-arrow-right"></i>
    </button>
  );
}
