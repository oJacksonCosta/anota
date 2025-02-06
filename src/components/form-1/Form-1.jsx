import "./form-1.css";
import Input from "../input/Input";
import Button1 from "../button-1/Button-1";
import { useState } from "react";
import { registerUser, registerName } from "../../../firebase/users";
import { useNavigate } from "react-router-dom";

export default function Form1({ errorNotify, sucessNotify }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (!name) {
      errorNotify("Por favor, preencha o campo de nome.");
      setIsLoading(false);
      return;
    } else if (name.length > 20) {
      errorNotify("O nome não pode ter mais de 20 caracteres.");
      setIsLoading(false);
      return;
    } else if (!email) {
      errorNotify("Por favor, preencha o campo de e-mail.");
      setIsLoading(false);
      return;
    } else if (password.length < 6) {
      errorNotify("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    } else if (password !== confirmPassword) {
      errorNotify("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    const result = await registerUser(email, password);
    const resultName = await registerName(result.userId, name);
    setIsLoading(true);

    if (!resultName.status) {
      errorNotify(resultName.errorMessage);
      setIsLoading(false);
      console.log(resultName.errorMessage);
    }

    if (result.status) {
      sucessNotify("Usuário registrado com sucesso!");

      // Redireciona para a página de login imediatamente após o alerta
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      errorNotify(result.errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <form className="form-1" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Digite seu nome"
        width="100%"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="0 0 0.8rem 0"
      />
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
    </form>
  );
}
