import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

// Registra um novo usuário
export const registerUser = async (email, password) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // console.log("Usuário criado com sucesso:", user.uid);

    ret.status = true;
    ret.errorMessage = "";
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        console.error("Este email já está sendo utilizado.");

        ret.status = false;
        ret.errorMessage = "Este email já está sendo utilizado.";

        break;
      case "auth/invalid-email":
        console.error("O email fornecido é inválido.");

        ret.status = false;
        ret.errorMessage = "O email fornecido é inválido.";

        break;
      case "auth/weak-password":
        console.error("A senha é muito fraca. Escolha uma senha mais forte.");

        ret.status = false;
        ret.errorMessage =
          "A senha é muito fraca. Escolha uma senha mais forte.";

        break;
      default:
        console.error("Erro ao criar usuário:", error.message);

        ret.status = false;
        ret.errorMessage = "Erro ao criar usuário: " + error.message;
    }
  }

  return ret;
};

// Login de usuário
export const loginUser = async (email, password) => {
  let ret = {
    status: false,
    errorMessage: "",
  };

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Usuário logado com sucesso:", user.uid);

    ret.status = true;
    ret.errorMessage = "";
  } catch (err) {
    if (err.code === "auth/invalid-credential") {
      console.error("Credenciais inválidas.");

      ret.status = false;
      ret.errorMessage = "Credenciais inválidas.";
    } else {
      console.error("Erro ao fazer login: ", err.message);

      ret.status = false;
      ret.errorMessage = "Erro ao fazer login: " + err.message;
    }
  }

  return ret;
};
