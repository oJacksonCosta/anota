import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  or,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// Cria uma nova nota
export const createNote = async (title, type, priority, content, userId) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  const status = type === "task" ? "todo" : "";
  const priorityValue = type === "task" ? priority : "";

  try {
    const docRef = await addDoc(collection(db, "notes"), {
      title: title,
      type: type,
      priority: priorityValue,
      status: status,
      content: content,
      userId: userId,
      date: Timestamp.now(),
    });
    //console.log("Nota criada com sucesso, ID: ", docRef.id);

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao adicionar a nota: ", err);

    ret.status = false;
    ret.errorMessage = "Erro ao adicionar a nota: " + err;
  }

  return ret;
};

// Deleta uma nota
export const deleteNote = async (noteId) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    await deleteDoc(doc(db, "notes", noteId));
    //console.log("Nota deletada com sucesso!");

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao deletar a nota: ", err);

    ret.status = false;
    ret.errorMessage = "Erro ao deletar a nota: " + err;
  }

  return ret;
};

// Atualiza uma nota
export const updateNote = async (noteId, newTitle, newContent) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    const noteDoc = doc(db, "notes", noteId);
    await updateDoc(noteDoc, { title: newTitle, content: newContent });
    // console.log("Nota atualizada com sucesso!");

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao atualizar a nota: ", err);

    ret.status = false;
    ret.errorMessage = "Erro ao atualizar a nota: " + err;
  }

  return ret;
};

// Conclui uma tarefa
export const concludeTask = async (noteId) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    const noteDoc = doc(db, "notes", noteId);
    await updateDoc(noteDoc, { status: "concluded" });
    //console.log("Tarefa concluída com sucesso!");

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao concluir tarefa: ", err);

    ret.status = false;
    ret.errorMessage = "Erro ao concluir tarefa: " + err;
  }

  return ret;
};

// Reabre uma tarefa
export const reopenTask = async (noteId) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    const noteDoc = doc(db, "notes", noteId);
    await updateDoc(noteDoc, { status: "todo" });
    //console.log("Tarefa reaberta com sucesso!");

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao reabrir tarefa: ", err);
    ret.status = false;
    ret.errorMessage = "Erro ao reabrir tarefa: " + err;
  }

  return ret;
};

// Obtém todas as notas de um usuário
export const getNotes = async (userId) => {
  let ret = {
    status: false,
    errorMessage: "",
    notes: [],
  };

  const notes = [];
  try {
    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      notes.push({
        id: doc.id,
        title: doc.data().title,
        type: doc.data().type,
        priority: doc.data().priority,
        status: doc.data().status,
        content: doc.data().content,
        date: doc
          .data()
          .date.toDate()
          .toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24 horas
          })
          .replace(",", " -"), // Troca a vírgula por " -"
      });
    });

    notes.sort((a, b) => b.date.localeCompare(a.date));

    //console.log(notes);
    ret.status = true;
    ret.errorMessage = "";
    ret.notes = notes;
  } catch (error) {
    //console.error("Erro ao obter as notas: ", error);

    ret.status = false;
    ret.errorMessage = "Erro ao obter as notas: " + error;
    ret.notes = [];
  }

  return ret;
};

// createNote(
//   "Título da Nota",
//   "task",
//   "high",
//   "todo",
//   "Conteúdo da Nota",
//   "2aEbkcjYa7hw5oi2OvK7ni00DHX2"
// );

// createNote(
//   "Título da Nota",
//   "note",
//   "",
//   "",
//   "Conteúdo da Nota",
//   "2aEbkcjYa7hw5oi2OvK7ni00DHX2"
// );
