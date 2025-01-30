import "./alert.css";
import { useEffect, useState } from "react";

export default function Alert({ message, type, isShowing, onClose, time }) {
  const [visibility, setVisibility] = useState("hide");

  // Controle de se a notificação está em animação de saída
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isShowing) {
      // Se a notificação está sendo exibida, mostramos ela
      setVisibility("show");

      setIsExiting(false);

      const timer = setTimeout(() => {
        setVisibility("hide");
        setIsExiting(true);

        // Chama a função de fechamento após a animação de saída
        setTimeout(onClose, 300); // Atrasar o fechamento para que a animação termine
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShowing, onClose]);

  // Impedir renderização quando não estiver visível
  if (!isShowing && !isExiting) return null;

  return (
    <div className={`alert-${type} ${visibility}`}>
      <p>{message}</p>
    </div>
  );
}
