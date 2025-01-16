import "./banner-img.css";
import CityImage from "../../assets/pexels-rickyrecap-1563256.jpg";

export default function BannerImg() {
  return (
    <div className="banner-img">
      <img className="city-image" src={CityImage} alt="banner-img" />
    </div>
  );
}
