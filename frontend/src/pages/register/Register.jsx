import { Link } from "react-router-dom";
import BannerImg from "../../components/banner-img/Banner-img";
import Form1 from "../../components/form-1/Form-1";
import Logo from "../../components/logo/Logo";
import "./register.css";
import Background from "../../components/background/Background";

export default function Register() {
  return (
    <Background>
      <section className="container">
        <div className="left-container">
          <BannerImg />
        </div>
        <div className="right-container">
          <Logo />
          <p>Cadastre-se para poder criar suas notas!</p>
          <Form1 />
          <p style={{ marginTop: "2rem" }}>
            Já tem uma conta?{" "}
            <Link id="link-to" to="/login">
              Login
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
