import { Link } from "react-router-dom";
import Form1 from "../../components/form-1/Form-1";
import Copyright from "../../components/copyright/Copyright";
import Logo from "../../components/logo/Logo";
import "./register.css";
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
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
        <p>Cadastre-se para poder criar suas notas!</p>
        <Form1 errorNotify={errorNotify} sucessNotify={sucessNotify} />
        <p>
          Já tem uma conta?{" "}
          <Link className="link-to" to="/login">
            Login
          </Link>
          .
        </p>

        <Copyright />
      </Container>
    </Background>
  );
}
