import "./card.css";
import { useState, useEffect, useRef } from "react";

export default function Card({
  id,
  title,
  content,
  priority,
  status,
  type,
  date,
}) {
  const [priorityColor, setPriorityColor] = useState("");
  const [typeIcon, setTypeIcon] = useState("");
  const [noteType, setNoteType] = useState("");
  const [checkBtnVisibility, setCheckBtnVisibility] = useState("hide");
  const [modalOptionsIsShow, setModalOptionsIsShow] = useState(false);

  const modalOptionsRef = useRef(null);
  const btnOptionsRef = useRef(null);

  useEffect(() => {
    switch (priority) {
      case "low":
        setPriorityColor("green");
        break;
      case "medium":
        setPriorityColor("orange");
        break;
      case "high":
        setPriorityColor("red");
        break;
      default:
        setPriorityColor("blue");
        break;
    }
  }, [priority]);

  useEffect(() => {
    switch (type) {
      case "task":
        setTypeIcon("bi bi-ui-checks");
        break;
      case "note":
        setTypeIcon("bi bi-sticky-fill");
        break;
      default:
        setTypeIcon("bi bi-x-octagon-fill");
        break;
    }
  }, [type]);

  useEffect(() => {
    switch (type) {
      case "task":
        setNoteType("Tarefa");
        break;
      case "note":
        setNoteType("Anotação");
        break;
      default:
        setNoteType("Desconhecido");
        break;
    }
  }, [type]);

  useEffect(() => {
    if (status === "todo" && type === "task") {
      setCheckBtnVisibility("show");
    } else {
      setCheckBtnVisibility("hide");
    }
  }, [status]);

  const handleOptions = () => {
    if (modalOptionsIsShow) {
      modalOptionsRef.current.classList.remove("hide");
      modalOptionsRef.current.classList.add("show");
      setModalOptionsIsShow(false);
    } else {
      setModalOptionsIsShow(true);
      modalOptionsRef.current.classList.remove("show");
      modalOptionsRef.current.classList.add("hide");
    }
  };

  return (
    <div className="card">
      <button
        className="btn-options"
        type="button"
        onClick={handleOptions}
        ref={btnOptionsRef}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>

      <div
        className={`options-modal ${modalOptionsIsShow}`}
        ref={modalOptionsRef}
      >
        <button>
          <i className="bi bi-pencil-fill"></i>
          Editar
        </button>
        <button>
          <i className="bi bi-trash-fill"></i>
          Excluir
        </button>
      </div>

      <div className={`card-priority ${priorityColor}`}></div>
      <h2>{title}</h2>
      <p className="content">{content}</p>

      <div className="card-footer">
        <p className="date">
          <i className="bi bi-calendar2-fill"> </i>
          {date}
        </p>

        <div className="card-type">
          <p className="type">
            <i className={typeIcon}></i>
            {noteType}
          </p>

          <button className={`check-btn-${checkBtnVisibility}`} type="button">
            <i className="bi bi-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
