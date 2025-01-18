import BannerImg from "../banner-img/Banner-img";
import "./container.css";

export default function Container({ children }) {
  return (
    <div className="container">
      <div className="left">
        <BannerImg />
      </div>
      <div className="right">{children}</div>
    </div>
  );
}
