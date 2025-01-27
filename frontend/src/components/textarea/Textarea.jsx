import "./textarea.css";

export default function Textarea({ placeholder, width }) {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      style={{ width: width }}
    />
  );
}
