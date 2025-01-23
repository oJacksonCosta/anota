import "./card.css";
import { useState, useEffect, useRef } from "react";
import { deleteNote, concludeTask } from "../../../../firebase/notes";

export default function Card({
  id,
  title,
  content,
  priority,
  status,
  type,
  date,
  onTaskConcluded,
}) {
  const [priorityColor, setPriorityColor] = useState("");
  const [typeIcon, setTypeIcon] = useState("");
  const [noteType, setNoteType] = useState("");
  const [checkBtnVisibility, setCheckBtnVisibility] = useState("hide");

  const concludedIconRef = useRef(null);

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
      concludedIconRef.current.style.display = "none";
    } else if (status === "concluded" && type === "task") {
      setCheckBtnVisibility("hide");
      concludedIconRef.current.style.display = "block";
    } else {
      setCheckBtnVisibility("hide");
      concludedIconRef.current.style.display = "none";
    }
  }, [status]);

  const handleConcludeTask = async () => {
    const response = await concludeTask(id);
    if (response?.status) {
      onTaskConcluded();
    } else {
      console.error(
        "Erro ao concluir tarefa:",
        response?.errorMessage || "Resposta inválida."
      );
    }
  };

  return (
    <div className="card">
      <div className="options">
        <button className="edit" type="button" tabIndex={-1}>
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button className="delete" type="button" tabIndex={-1}>
          <i className="bi bi-trash-fill"></i>
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

          <i className="bi bi-check-all" ref={concludedIconRef}></i>

          <button
            className={`check-btn-${checkBtnVisibility}`}
            type="button"
            onClick={handleConcludeTask}
          >
            Concluir
          </button>

          <div className="note-modal"></div>
        </div>
      </div>
    </div>
  );
}
