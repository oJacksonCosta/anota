import "./home.css";
import Background from "../../components/background/Background";
import InputSelect from "../../components/input-select/Input-select";
import Search from "../../components/search/Search";
import { useRef, useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { getNotes } from "../../../firebase/notes";
import AddBtn from "../../components/add-btn/Add-btn";
import toast, { Toaster } from "react-hot-toast";
import Caption from "../../components/caption/Caption";
import User from "../../components/user/User";

export default function Home() {
  const cardContainer = useRef(null);
  const homeContainerRef = useRef(null);
  const emptyListRef = useRef(null);

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [userId, setUserId] = useState("");

  const [selectValues, setSelectValues] = useState({
    selectType: "",
    selectPriority: "",
    selectStatus: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  //Notificação
  const sucessNotify = (message) =>
    toast.success(message, {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#212134",
        color: "#ffffff",
        border: "1px solid #7580ff",
        borderRadius: "0.6rem",
      },
    });

  const errorNotify = (message) =>
    toast.error(message, {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#212134",
        color: "#ffffff",
        border: "1px solid #7580ff",
        borderRadius: "0.6rem",
      },
    });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const typeOptions = [
    { value: "task", label: "Tarefa" },
    { value: "note", label: "Anotação" },
  ];

  const priorityOptions = [
    { value: "low", label: "Baixa" },
    { value: "medium", label: "Média" },
    { value: "high", label: "Alta" },
  ];

  const statusOptions = [
    { value: "all", label: "Todas" },
    { value: "todo", label: "Pendente" },
    { value: "concluded", label: "Concluído" },
  ];

  const handleSelectChange = (key, value) => {
    setSelectValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [key]: value,
      };
      return updatedValues;
    });
  };

  // Pega o ID do usuário do localStorage ou sessionStorage
  useEffect(() => {
    let id = localStorage.getItem("userId");

    if (!id) {
      id = sessionStorage.getItem("userId");
    }

    if (id) {
      setUserId(id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  // Obtém todas as notas do usuário
  const listCards = async () => {
    const response = await getNotes(userId);
    if (response?.status) {
      setNotes(response.notes);
      //console.log(response.notes.length);
      if (response.notes.length <= 0) {
        setTimeout(() => {
          emptyListRef.current.classList.add("show");
        }, 200);
      } else {
        emptyListRef.current.classList.remove("show");
      }
    } else {
      errorNotify(`Erro ao buscar as notas: ${response.errorMessage}`);
    }
  };

  const onRefreshList = () => {
    listCards();
  };

  // Pega a Quantidade de tarefas por prioridade e as notas
  const highPriority = notes.filter((note) => note.priority === 'high' && note.status === 'todo').length;
  const mediumPriority = notes.filter((note) => note.priority === 'medium' && note.status === 'todo').length;
  const lowPriority = notes.filter((note) => note.priority === 'low' && note.status === 'todo').length;
  const amountNotes = notes.filter((note) => note.type === 'note').length;


  // Aplica os filtros (tipo, prioridade, status, e pesquisa)
  const applyFilters = () => {
    let filtered = notes;

    // Filtra pelo tipo
    if (selectValues.selectType && selectValues.selectType !== "all") {
      filtered = filtered.filter(
        (note) => note.type === selectValues.selectType
      );
    }

    // Filtra pela prioridade
    if (selectValues.selectPriority && selectValues.selectPriority !== "all") {
      filtered = filtered.filter(
        (note) => note.priority === selectValues.selectPriority
      );
    }

    // Filtra pelo status
    if (selectValues.selectStatus && selectValues.selectStatus !== "all") {
      filtered = filtered.filter(
        (note) => note.status === selectValues.selectStatus
      );
    }

    // Filtra pelo termo de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotes(filtered);
  };

  // Chama a função listCards quando o componente é montado ou quando userId muda
  useEffect(() => {
    if (userId) {
      listCards();
    }
  }, [userId]);

  // Chama a função applyFilters sempre que notes, selectValues ou searchTerm mudarem
  useEffect(() => {
    applyFilters();
  }, [notes, selectValues, searchTerm]);

  return (
    <Background>
      <Toaster />

      <div className="home-container" ref={homeContainerRef}>
        <Caption 
          highPriority = {highPriority <= 99 ? highPriority : "99+"}
          mediumPriority = {mediumPriority <= 99 ? mediumPriority : "99+"}
          lowPriority = {lowPriority <= 99 ? lowPriority : "99+"}
          notes = {amountNotes <= 99 ? amountNotes : "99+"}
        />

        <div className="filter">
          <InputSelect
            options={typeOptions}
            placeholder={"Tipo"}
            onChange={(value) => handleSelectChange("selectType", value)}
            value={selectValues.selectType}
          />
          <InputSelect
            options={priorityOptions}
            placeholder={"Prioridade"}
            onChange={(value) => handleSelectChange("selectPriority", value)}
            value={selectValues.selectPriority}
          />
          <InputSelect
            options={statusOptions}
            placeholder={"Status"}
            onChange={(value) => handleSelectChange("selectStatus", value)}
            value={selectValues.selectStatus}
          />
          <Search onSearch={(value) => handleSearch(value)} />
        </div>

        <div className="cards-container" ref={cardContainer}>
          <div className="empty-list" ref={emptyListRef}>
            <i className="bi bi-sticky"></i>
            <p>Você não tem nenhuma nota...</p>
          </div>

          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              priority={note.priority}
              status={note.status}
              type={note.type}
              date={note.date}
              onRefreshList={onRefreshList}
              errorNotify={errorNotify}
              sucessNotify={sucessNotify}
            />
          ))}
        </div>

        <AddBtn onRefreshList={onRefreshList} />

        <User />
      </div>
    </Background>
  );
}
