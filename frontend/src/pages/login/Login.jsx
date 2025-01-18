import "./Login.css";
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Copyright from "../../components/copyright/Copyright";
import Logo from "../../components/logo/Logo";
import Form2 from "../../components/form-2/Form-2";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Background>
      <Container>
        children=
        {
          <>
            <Logo />
            <p>Entre e anote suas ideias, do seu jeito!</p>
            <Form2 />
            <p style={{ marginTop: "2rem" }}>
              Ainda não tem uma conta?{" "}
              <Link id="link-to" to="/register">
                Cadastre-se
              </Link>
              .
            </p>
            <Copyright />
          </>
        }
      </Container>
    </Background>
  );
}
