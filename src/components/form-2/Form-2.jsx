import "./form-2.css";
import Input from "../input/Input";
import Button1 from "../button-1/Button-1";
import { loginUser } from "../../../firebase/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form2({ errorNotify, sucessNotify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (!email) {
      errorNotify("Por favor, preencha o campo de e-mail.");

      setIsLoading(false);
      return;
    } else if (!password) {
      errorNotify("Por favor, preencha o campo de senha.");

      setIsLoading(false);
      return;
    }

    const result = await loginUser(email, password);
    setIsLoading(true);

    if (result.status) {
      sucessNotify("Login realizado com sucesso!");

      //Salva o id do usuário no localStorage ou sessionStorage
      if (isChecked) {
        localStorage.setItem("userId", result.userId);
        sessionStorage.removeItem("userId");
      } else {
        sessionStorage.setItem("userId", result.userId);
        localStorage.removeItem("userId");
      }

      // Redireciona para a página de login imediatamente após o alerta
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      errorNotify(result.errorMessage);

      setIsLoading(false);
    }
  };

  return (
    <form className="form-2">
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
        margin="0.8rem"
      />
      <Button1
        text="Login"
        width="100%"
        onClick={handleSubmit}
        isLoading={isLoading}
        type="submit"
      />

      <div className="remember-me">
        <input
          type="checkbox"
          id="remember-me"
          value={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="remember-me">Lembrar-me</label>
      </div>
    </form>
  );
}
