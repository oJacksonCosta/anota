import { Link } from "react-router-dom";
import Form1 from "../../components/form-1/Form-1";
import Copyright from "../../components/copyright/Copyright";
import Logo from "../../components/logo/Logo";
import "./register.css";
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";

export default function Register() {
  return (
    <Background>
      <Container>
        <>
          <Logo />
          <p>Cadastre-se para poder criar suas notas!</p>
          <Form1 />
          <p style={{ marginTop: "1rem" }}>
            Já tem uma conta?{" "}
            <Link id="link-to" to="/login">
              Login
            </Link>
            .
          </p>
          <Copyright />
        </>
      </Container>
    </Background>
  );
}
