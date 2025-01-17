import "./Login.css";
import Background from "../../components/background/Background";
import BannerImg from "../../components/banner-img/Banner-img";
import Logo from "../../components/logo/Logo";
import Form2 from "../../components/form-2/Form-2";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Background>
      <section className="container">
        <div className="left-container">
          <BannerImg />
        </div>
        <div className="right-container">
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
          <p id="copyright">
            Developed by <span>Jackson Costa</span>
          </p>
        </div>
      </section>
    </Background>
  );
}
