import "./Login.css";
import Background from "../../components/background/Background";
import Copyright from "../../components/copyright/Copyright";
import Logo from "../../components/logo/Logo";
import Form2 from "../../components/form-2/Form-2";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  //Notificação
  const sucessNotify = (message) =>
    toast.success(message, {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#212134",
        color: "#ffffff",
        border: "1px solid #7580ff",
        borderRadius: "0.6rem",
      },
    });

  const errorNotify = (message) =>
    toast.error(message, {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#212134",
        color: "#ffffff",
        border: "1px solid #7580ff",
        borderRadius: "0.6rem",
      },
    });

  return (
    <Background>
      <Toaster />
      <Container>
        <Logo />
        <p>Entre e anote suas ideias, do seu jeito!</p>
        <Form2 errorNotify={errorNotify} sucessNotify={sucessNotify} />
        <p>
          Ainda não tem uma conta?{" "}
          <Link className="link-to" to="/register">
            <br id="brake" />
            Cadastre-se
          </Link>
          .
        </p>

        <Link
          id="password-recovery"
          className="link-to"
          to="#password-recovery"
        >
          Esqueci minha senha
        </Link>
        <Copyright />
      </Container>
    </Background>
  );
}
