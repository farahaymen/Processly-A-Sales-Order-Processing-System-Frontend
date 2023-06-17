import NavItem from "../../UI/navbar/NavItem";
import Gallery from "../../components/media/Gallery";

const AboutPage = (props) => {
  return (
    <div className="home">
      <h1>Two Years in The Making</h1>
      <h3>And Still Going Strong!</h3>
      <div className="h-grid" style={{ marginTop: "1rem" }}>
        <span>
          Since its inception in 2020 by&nbsp;
          <NavItem
            to="/about"
            className="to-about"
            externalLink={"www.linkedin.com/in/ashrafharess/"}
          >
            Ashraf
          </NavItem>
          ,&nbsp;
          <NavItem
            to="/about"
            className="to-about"
            externalLink={"https://www.linkedin.com/in/bavshehata/"}
          >
            Bavly
          </NavItem>
          , and&nbsp;
          <NavItem
            to="/about"
            className="to-about"
            externalLink={"https://www.linkedin.com/in/farah-aymen-2ba8a71b2/"}
          >
            Farah
          </NavItem>
          <br /> The company has made many impacts to various
          <br /> university clubs including, most proudly, BUE's
          <br /> ACM club. Just this year, they've recruited over
          <br /> 200 students while using our made-with-love
          <br /> merch! &#128521;
        </span>
        <Gallery
          imgUrls={[
            "https://i.imgur.com/tTFtm2U.jpg",
            "https://i.imgur.com/uw1y0Fb.jpg",
            "https://i.imgur.com/ktb937a.png",
          ]}
        />
      </div>
    </div>
  );
};

export default AboutPage;
