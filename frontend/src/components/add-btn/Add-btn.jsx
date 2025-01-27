import "./add-btn.css";
import { useState, useRef } from "react";
import Input from "../input/Input";
import InputSelect from "../input-select/Input-select";
import Button from "../button-1/Button-1";
import Textarea from "../textarea/Textarea";

export default function AddBtn() {
  const [modalOpen, setModalOpen] = useState(false);

  const typeOptions = [
    { value: "task", label: "Tarefa" },
    { value: "note", label: "Anotação" },
  ];
  const priorityOptions = [
    { value: "low", label: "Baixa" },
    { value: "medium", label: "Média" },
    { value: "high", label: "Alta" },
  ];

  const iconRef = useRef(null);
  const modalAddNoteRef = useRef(null);

  const openModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      if (modalAddNoteRef) {
        // Define a opacidade dos filhos para 0
        Array.from(modalAddNoteRef.current.children).forEach((child) => {
          child.style.opacity = "0";
        });
      }
    } else {
      // Define a opacidade dos filhos para 1
      Array.from(modalAddNoteRef.current.children).forEach((child) => {
        child.style.opacity = "1";
      });
    }
  };

  return (
    <>
      <div
        className={`add-note-modal ${modalOpen ? "show-modal" : "hide-modal"}`}
        ref={modalAddNoteRef}
      >
        <p className="form-msg">Boa! Bora criar uma anotação!</p>

        <div className="selects">
          <InputSelect placeholder="Tipo" options={typeOptions} />
          <InputSelect placeholder="Prioridade" options={priorityOptions} />
        </div>

        <Input type="text" placeholder="Título" width={"100%"} />

        <Textarea placeholder="Conteúdo" width={"100%"} />

        <Button text={"Adicionar"} width={"100%"} />
      </div>

      <button className="add-btn" onClick={openModal}>
        <div ref={iconRef} className={modalOpen ? "rotate-in" : "rotate-out"}>
          <i className="bi bi-plus"></i>
        </div>
      </button>
    </>
  );
}
