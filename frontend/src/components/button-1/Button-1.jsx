import "./button-1.css";

export default function Button1({ text, onClick, width }) {
  return (
    <button className="button-1" onClick={onClick} style={{ width: width }}>
      {text}
    </button>
  );
}
