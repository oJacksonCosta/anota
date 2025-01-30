import "./form-1.css";
import Input from "../input/Input";
import Button1 from "../button-1/Button-1";
import { useState } from "react";
import { registerUser } from "../../../firebase/users";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";

export default function Form1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [time, setTime] = useState(3000);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (!email) {
      setAlertMessage("Por favor, preencha o campo de e-mail.");
      setAlertType("error");
      setShowAlert(true);
      setIsLoading(false);
      return;
    } else if (password.length < 6) {
      setAlertMessage("A senha deve ter pelo menos 6 caracteres.");
      setAlertType("error");
      setShowAlert(true);
      setIsLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setAlertMessage("As senhas não coincidem.");
      setAlertType("error");
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    const result = await registerUser(email, password);
    setIsLoading(true);

    if (result.status) {
      setAlertMessage("Usuário registrado com sucesso!");
      setAlertType("success");
      setShowAlert(true);

      // Limpa os campos
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTime(1200);

      // Redireciona para a página de login imediatamente após o alerta
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setAlertMessage(result.errorMessage);
      setAlertType("error");
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <form className="form-1" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Digite seu e-mail"
        width="100%"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="0 0 0.8rem 0"
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        width="100%"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="0 0 0.8rem 0"
      />
      <Input
        type="password"
        placeholder="Confirme sua senha"
        width="100%"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="0 0 0.8rem 0"
      />
      <Button1
        text="Cadastrar"
        width="100%"
        isLoading={isLoading}
        type="submit"
      />
      <div className="alert-container">
        <Alert
          message={alertMessage}
          type={alertType}
          isShowing={showAlert}
          onClose={closeAlert}
          time={time}
        />
      </div>
    </form>
  );
}
