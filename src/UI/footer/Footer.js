import fb from "../../assets/facebook.png";
import ig from "../../assets/instagram.png";
import dc from "../../assets/discord.png";

const Footer = (props) => {
  return (
    <div className="h-grid">
      <div className="copyright">
        &#169;
        <span style={{ color: "#0FE22D", fontWeight: "500" }}>Processly</span>
        2022
      </div>
      <div className="social-grid">
        <a
          className="social-icon"
          href="https://www.facebook.com/acmbue/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={fb} alt="facebook" />
        </a>
        <a
          className="social-icon"
          href="https://www.instagram.com/acm_bue/?hl=en"
          target="_blank"
          rel="noreferrer"
        >
          <img src={ig} alt="instagram" />
        </a>
        <a
          className="social-icon"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noreferrer"
        >
          <img src={dc} alt="discord" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
