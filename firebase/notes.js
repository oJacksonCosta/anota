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
} from "firebase/firestore";

// Cria uma nova nota
export const createNote = async (
  title,
  type,
  priority,
  status,
  content,
  userId
) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    const docRef = await addDoc(collection(db, "notes"), {
      title: title,
      type: type,
      priority: priority,
      status: status,
      content: content,
      userId: userId,
    });
    //console.log("Nota criada com sucesso, ID: ", docRef.id);

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao adicionar a nota: ", err);

    ret.status = false;
    ret.errorMessage = "Erro ao adicionar a nota: " + err;
  }
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
    //console.log("Nota atualizada com sucesso!");

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    //console.error("Erro ao atualizar a nota: ", err);

    ret.status = false;
    ret.errorMessage = "Erro ao atualizar a nota: " + err;
  }
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
      });
    });

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
};
