import BannerImg from "../../components/banner-img/Banner-img";
import Form1 from "../../components/form-1/Form-1";
import Logo from "../../components/logo/Logo";
import "./register.css";

export default function Register() {
  return (
    <section className="container">
      <div className="left-container">
        <BannerImg />
      </div>
      <div className="right-container">
        <Logo />
        <p>Cadastre-se para poder criar suas notas!</p>
        <Form1 />
        <p style={{ marginTop: "2rem" }}>
          Já tem uma conta? <a href="/login">Faça login!</a>
        </p>
        <p id="copyright">
          Developed by <span>Jackson Costa</span>
        </p>
      </div>
    </section>
  );
}
