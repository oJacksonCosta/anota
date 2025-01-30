import BannerImg from "../banner-img/Banner-img";
import "./container.css";

export default function Container({ children }) {
  return (
    <section className="container">
      <div className="left">
        <BannerImg />
      </div>
      <div className="right">{children}</div>
    </section>
  );
}
