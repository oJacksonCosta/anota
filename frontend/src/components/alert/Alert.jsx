import "./alert.css";
import { useEffect } from "react";
import { useState } from "react";

export default function Alert({ message, type, isShowing, onClose }) {
  const [visibility, setVisibility] = useState("hide");

  useEffect(() => {
    if (isShowing) {
      setVisibility("show");
      const timer = setTimeout(() => {
        onClose();
        setVisibility("hide");
      }, 3000); // O alerta fecha automaticamente após 3 segundos
      return () => clearTimeout(timer);
    }
  }, [isShowing, onClose]);

  if (!isShowing) return null;

  return (
    <div className={`alert-${type} ${visibility}`}>
      <p>{message}</p>
    </div>
  );
}
