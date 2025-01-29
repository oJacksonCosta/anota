import "./textarea.css";

export default function Textarea({ placeholder, width, onChange }) {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      style={{ width: width }}
      onChange={onChange}
    />
  );
}
