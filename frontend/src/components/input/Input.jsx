import "./input.css";

export default function InputMail({ type, placeholder, width, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{ width: width }}
      onChange={onChange}
    />
  );
}
