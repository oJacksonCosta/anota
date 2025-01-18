import "./button-1.css";

export default function Button1({ text, onClick, width, isLoading }) {
  return (
    <button
      className="button-1"
      onClick={onClick}
      style={{ width: width }}
      disabled={isLoading}
    >
      {isLoading ? <span className="spinner"></span> : text}
    </button>
  );
}
