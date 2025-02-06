import "./user.css";
import { getUserName } from "../../../firebase/notes";
import { useEffect, useState, useRef } from "react";

export default function User() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const userModalref = useRef(null);
  const userIconRef = useRef(null);

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

  // Obtém o nome do usuário
  useEffect(() => {
    if (!userId) return; // Garante que userId tenha um valor antes de chamar a função

    const getUserNameAsync = async () => {
      try {
        const result = await getUserName(userId);
        if (result) {
          setUserName(result.name);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      }
    };

    getUserNameAsync();
  }, [userId]);

  //Logout
  const handleLogout = () => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    } else {
      sessionStorage.removeItem("userId");
    }
    window.location.href = "/login";
  };

  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
    userModalref.current.classList.toggle("open");
  };

  // Fecha o modal ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userModalref.current &&
        !userModalref.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setModalOpen(false);
        userModalref.current.classList.remove("open");
      }
    }

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) {
      userIconRef.current.style.color = "#7580ff";
    } else {
      userIconRef.current.style.color = "#ffffff38";
    }
  }, [modalOpen]);

  return (
    <div className="user-container">
      <i
        className="bi bi-person-circle user-icon"
        onClick={handleOpenModal}
        ref={userIconRef}
      ></i>

      <div className="user-modal" ref={userModalref}>
        <h3>{userName}</h3>
        <button id="account">Conta</button>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}
