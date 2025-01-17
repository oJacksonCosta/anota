import "./form-2.css";
import Input from "../input/Input";
import Button1 from "../button-1/Button-1";

export default function Form2() {
  return (
    <form className="form-2">
      <Input type="email" placeholder="Digite seu e-mail" width="100%" />
      <Input type="password" placeholder="Digite sua senha" width="100%" />
      <Button1 text="Login" width="100%" />
    </form>
  );
}
