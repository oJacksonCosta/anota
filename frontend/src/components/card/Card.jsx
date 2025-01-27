import "./card.css";
import { useState, useEffect, useRef } from "react";
import {
  deleteNote,
  concludeTask,
  reopenTask,
} from "../../../../firebase/notes";
import { updateNote } from "../../../../firebase/notes";

export default function Card({
  id,
  title,
  content,
  priority,
  status,
  type,
  date,
  onRefreshList,
}) {
  const [priorityColor, setPriorityColor] = useState("");
  const [typeIcon, setTypeIcon] = useState("");
  const [noteType, setNoteType] = useState("");
  const [checkBtnVisibility, setCheckBtnVisibility] = useState("hide");
  const [isExpanded, setIsExpanded] = useState(false);
  const [icon, setIcon] = useState("bi bi-caret-down-fill");
  const [isEditing, setIsEditing] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);

  const concludedIconRef = useRef(null);
  const openTaskRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const saveRef = useRef(null);
  const editRef = useRef(null);
  const deleteRef = useRef(null);
  const expandRef = useRef(null);
  const modalConfirmRef = useRef(null);
  const checkBtnRef = useRef(null);

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
      openTaskRef.current.style.display = "none";
    } else if (status === "concluded" && type === "task") {
      setCheckBtnVisibility("hide");
      concludedIconRef.current.style.display = "block";
      openTaskRef.current.style.display = "flex";
    } else {
      setCheckBtnVisibility("hide");
      concludedIconRef.current.style.display = "none";
      openTaskRef.current.style.display = "none";
    }
  }, [status]);

  // Função para expandir a nota
  const handleExpandTask = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      contentRef.current.style.display = "block";
      setIcon("bi bi-caret-up-fill");
    } else {
      contentRef.current.style.display = "-webkit-box";
      setIcon("bi bi-caret-down-fill");
    }
  }, [isExpanded]);

  // Função para editar a nota
  const handleEditNote = () => {
    if (isEditing) {
      setIsExpanded(false);
      contentRef.current.setAttribute("contenteditable", "false");
      titleRef.current.setAttribute("contenteditable", "false");
      saveRef.current.style.display = "none";
      editRef.current.removeAttribute("disabled");
      deleteRef.current.removeAttribute("disabled");
      expandRef.current.removeAttribute("disabled");
      openTaskRef.current.removeAttribute("disabled");
      setIsEditing(false);
    } else {
      setIsExpanded(true);
      contentRef.current.setAttribute("contenteditable", "true");
      titleRef.current.setAttribute("contenteditable", "true");
      saveRef.current.style.display = "flex";
      editRef.current.setAttribute("disabled", "true");
      deleteRef.current.setAttribute("disabled", "true");
      expandRef.current.setAttribute("disabled", "true");
      openTaskRef.current.setAttribute("disabled", "true");
      checkBtnRef.current.setAttribute("disabled", "true");
      contentRef.current.focus();
      setIsEditing(true);
    }
  };

  //Função para salvar a nota editada
  const handleSaveNote = async () => {
    const response = await updateNote(
      id,
      titleRef.current.innerText,
      contentRef.current.innerText
    );
    if (response?.status) {
      setIsEditing(false);
      contentRef.current.setAttribute("contenteditable", "false");
      titleRef.current.setAttribute("contenteditable", "false");
      saveRef.current.style.display = "none";
      editRef.current.removeAttribute("disabled");
      deleteRef.current.removeAttribute("disabled");
      expandRef.current.removeAttribute("disabled");
      openTaskRef.current.removeAttribute("disabled");
      checkBtnRef.current.removeAttribute("disabled");
      onRefreshList();
    } else {
      console.error("Erro ao salvar nota:", response?.errorMessage);
    }
  };

  //Função para concluir a tarefa
  const handleConcludeTask = async () => {
    const response = await concludeTask(id);
    if (response?.status) {
      setIsExpanded(false);
      onRefreshList();
    } else {
      console.error(
        "Erro ao concluir tarefa:",
        response?.errorMessage || "Resposta inválida."
      );
    }
  };

  // Função para reabrir a tarefa
  const handleReopenTask = () => {
    reopenTask(id);
    onRefreshList();
  };

  // Função para excluir a nota
  const handleDeleteNote = async () => {
    const response = await deleteNote(id);
    if (response?.status) {
      onRefreshList();
    } else {
      console.error("Erro ao excluir nota:", response?.errorMessage);
    }
  };

  const handleOpenModalConfirmation = () => {
    setIsShowModalConfirm(true);
  };

  useEffect(() => {
    if (isShowModalConfirm) {
      modalConfirmRef.current.classList.add("active");
    } else {
      modalConfirmRef.current.classList.remove("active");
    }
  }, [isShowModalConfirm]);

  return (
    <div className="card">
      <div className="header">
        <h2 className="title" ref={titleRef}>
          {title}
        </h2>

        <div className="options">
          <button
            className="save-update"
            type="button"
            tabIndex={-1}
            ref={saveRef}
            onClick={handleSaveNote}
          >
            <i className="bi bi-floppy2-fill"></i>
          </button>

          <button
            className="open-task"
            type="button"
            tabIndex={-1}
            ref={openTaskRef}
            onClick={handleReopenTask}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

          <button
            className="edit"
            type="button"
            tabIndex={-1}
            onClick={handleEditNote}
            ref={editRef}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>

          <button
            className="delete"
            type="button"
            tabIndex={-1}
            ref={deleteRef}
            onClick={handleOpenModalConfirmation}
          >
            <i className="bi bi-trash-fill"></i>
          </button>

          <button
            className="expand"
            type="button"
            tabIndex={-1}
            ref={expandRef}
            onClick={handleExpandTask}
          >
            <i className={icon}></i>
          </button>
        </div>

        <div className={`card-priority ${priorityColor}`}></div>
      </div>

      <hr />

      <p className="content" ref={contentRef}>
        {content}
      </p>

      <div className="card-footer">
        <p className="date">
          <i className="bi bi-calendar2-fill card-footer-icon"> </i>
          {date}
        </p>

        <div className="card-type">
          <button
            className={`check-btn-${checkBtnVisibility}`}
            type="button"
            onClick={handleConcludeTask}
            ref={checkBtnRef}
          >
            Concluir
          </button>

          <i
            className="bi bi-check-all card-footer-icon"
            ref={concludedIconRef}
          ></i>

          <p className="type">
            <i className={`${typeIcon} card-footer-icon`}></i>
            {noteType}
          </p>
        </div>
      </div>

      <div className={`overlay ${isShowModalConfirm ? "active" : ""}`}></div>
      <div className="delete-modal" ref={modalConfirmRef}>
        <p>Deseja realmente excluir?</p>
        <div className="confirm-btns">
          <button id="yes">Sim</button>
          <button id="no">Não</button>
        </div>
      </div>
    </div>
  );
}
