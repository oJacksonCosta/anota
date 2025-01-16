import "./form-1.css";
import Input from "../input/Input";
import Button1 from "../button-1/Button-1";
import { useState } from "react";
import { registerUser } from "../../../../firebase/users";
import Alert from "../alert/Alert";

export default function Form1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos corretamente
    if (!email) {
      setAlertMessage("Por favor, preencha o campo de email.");
      setAlertType("error");
      setShowAlert(true);
      return;
    } else if (password.length < 6) {
      setAlertMessage("A senha deve ter pelo menos 6 caracteres.");
      setAlertType("error");
      setShowAlert(true);
      return;
    } else if (password !== confirmPassword) {
      setAlertMessage("As senhas não coincidem.");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    const result = await registerUser(email, password);

    if (result.status) {
      setAlertMessage("Usuário registrado com sucesso!");
      setAlertType("sucess");
      setShowAlert(true);

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirecionar para a página de login após o registro bem-sucedido
    } else {
      setAlertMessage(result.errorMessage);
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <form className="form-1">
      <Alert
        message={alertMessage}
        type={alertType}
        isShowing={showAlert}
        onClose={closeAlert}
      />
      <Input
        type="email"
        placeholder="Digite seu e-mail"
        width="100%"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        width="100%"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirme sua senha"
        width="100%"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button1 text="Cadastrar" width="100%" onClick={handleSubmit} />
    </form>
  );
}
