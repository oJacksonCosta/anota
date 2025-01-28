import "./add-btn.css";
import { useState, useRef } from "react";
import Input from "../input/Input";
import InputSelect from "../input-select/Input-select";
import Button from "../button-1/Button-1";
import Textarea from "../textarea/Textarea";

export default function AddBtn() {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    modalAddNoteRef.current.classList.toggle("open");
  };

  //Função para criar uma nova anotação
  const handleAddNote = () => {
    // const response = await addNote(title, content);
    // if (response?.status) {
    //   setModalOpen(false);
    //   setTitle("");
    //   setContent("");
    // }

    console.log(title, content);
  };

  return (
    <>
      <div className={"add-note-modal"} ref={modalAddNoteRef}>
        <p className="form-msg">Boa! Bora criar uma anotação!</p>

        <div className="selects">
          <InputSelect placeholder="Tipo" options={typeOptions} />
          <InputSelect placeholder="Prioridade" options={priorityOptions} />
        </div>

        <Input
          type="text"
          placeholder="Título"
          width={"100%"}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Conteúdo"
          width={"100%"}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          text={"Adicionar"}
          width={"100%"}
          type={"button"}
          onClick={handleAddNote}
        />
      </div>

      <button className="add-btn" onClick={openModal}>
        <div ref={iconRef} className={modalOpen ? "rotate-in" : "rotate-out"}>
          <i className="bi bi-plus"></i>
        </div>
      </button>
    </>
  );
}
