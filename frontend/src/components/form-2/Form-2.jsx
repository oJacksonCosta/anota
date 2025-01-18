import "./form-2.css";
import Input from "../input/Input";
import Button1 from "../button-1/Button-1";
import { loginUser } from "../../../../firebase/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";

export default function Form2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } else if (!password) {
      setAlertMessage("Por favor, preencha o campo de senha.");
      setAlertType("error");
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    const result = await loginUser(email, password);
    setIsLoading(true);

    if (result.status) {
      setAlertMessage("Usuário registrado com sucesso!");
      setAlertType("success");
      setShowAlert(true);

      // Limpa os campos
      setEmail("");
      setPassword("");
      setTime(1200);

      // Redireciona para a página de login imediatamente após o alerta
      setTimeout(() => {
        navigate("/home");
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
    <form className="form-2">
      <Input
        type="email"
        placeholder="Digite seu e-mail"
        width="100%"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        width="100%"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button1
        text="Login"
        width="100%"
        onClick={handleSubmit}
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
