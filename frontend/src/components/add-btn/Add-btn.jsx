import "./add-btn.css";
import { useState, useRef, useEffect } from "react";
import Input from "../input/Input";
import InputSelect from "../input-select/Input-select";
import Button from "../button-1/Button-1";
import Textarea from "../textarea/Textarea";
import { createNote } from "../../../../firebase/notes";

export default function AddBtn({ onRefreshList }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectValues, setSelectValues] = useState({
    selectType: "",
    selectPriority: "",
  });

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
  const msgRef = useRef(null);

  const openModal = () => {
    setModalOpen(!modalOpen);
    modalAddNoteRef.current.classList.toggle("open");
    iconRef.current.classList.toggle("rotate");
    msgRef.current.innerHTML = "😁 Boa! Bora criar uma anotação!";
  };

  const handleSelectChange = (key, value) => {
    setSelectValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [key]: value,
      };
      return updatedValues;
    });
  };

  //Função para criar uma nova anotação
  const handleAddNote = async () => {
    setIsLoading(true);
    const userId = () => {
      if (localStorage.getItem("userId")) {
        return localStorage.getItem("userId");
      } else {
        return sessionStorage.getItem("userId");
      }
    };

    const newNote = {
      title: title,
      content: content,
      type: selectValues.selectType,
      priority: selectValues.selectPriority,
      userId: userId(),
    };

    if (newNote.title === "" || newNote.content === "" || newNote.type === "") {
      msgRef.current.innerHTML = "😥 Ops! Preencha todos os campos!";
      setIsLoading(false);
      return;
    } else if (newNote.type === "task" && newNote.priority === "") {
      msgRef.current.innerHTML = "😥 Ops! Selecione a prioridade!";
      setIsLoading(false);
      return;
    }

    const response = await createNote(
      newNote.title,
      newNote.type,
      newNote.priority,
      newNote.content,
      newNote.userId
    );
    console.log(response);

    if (response) {
      onRefreshList();
      setTitle("");
      setContent("");
      setSelectValues({
        selectType: "",
        selectPriority: "",
      });
      setIsLoading(false);
      msgRef.current.innerHTML = "👏 Perfeito! Anotação criada com sucesso!";

      setTimeout(() => {
        setModalOpen(false);
        modalAddNoteRef.current.classList.toggle("open");
        iconRef.current.classList.toggle("rotate");
      }, 1000);
    } else {
      setIsLoading(false);
      msgRef.current.innerHTML = "🙁 Ops! Algo deu errado. Tente novamente.";
    }
  };

  return (
    <>
      <div className={"add-note-modal"} ref={modalAddNoteRef}>
        <p className="form-msg" ref={msgRef}>
          😁 Boa! Bora criar uma anotação!
        </p>

        <div className="selects">
          <InputSelect
            placeholder="Tipo"
            options={typeOptions}
            onChange={(value) => handleSelectChange("selectType", value)}
            value={selectValues.selectType}
          />
          <InputSelect
            placeholder="Prioridade"
            options={priorityOptions}
            onChange={(value) => handleSelectChange("selectPriority", value)}
            value={selectValues.selectPriority}
            isDesabled={selectValues.selectType === 'note'}
          />
        </div>

        <Input
          type="text"
          placeholder="Título"
          width={"100%"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Conteúdo"
          width={"100%"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          text={"Adicionar"}
          width={"100%"}
          type={"button"}
          onClick={handleAddNote}
          isLoading={isLoading}
        />
      </div>

      <button className="add-btn" onClick={openModal}>
        <div ref={iconRef} className="icon">
          <i className="bi bi-plus"></i>
        </div>
      </button>
    </>
  );
}
