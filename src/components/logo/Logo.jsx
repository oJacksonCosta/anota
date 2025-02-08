import "./logo.css";
import LogoSvg from "../../assets/logo-white 1.png";

export default function Logo({ width }) {
  return (
    <img className="logo" src={LogoSvg} alt="logo" style={{ width: width }} />
  );
}
