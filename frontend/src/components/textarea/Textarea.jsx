import "./textarea.css";

export default function Textarea({ placeholder, width, onChange, value }) {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      style={{ width: width }}
      onChange={onChange}
      value={value}
    />
  );
}
