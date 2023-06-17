import React from "react";
import NavItem from "../../UI/navbar/NavItem";
import Gallery from "../../components/media/Gallery";

const HomePage = () => {
  return (
    <div className="home">
      <h1>
        You <span style={{ color: "#0096FF" }}>Ask</span>, We{" "}
        <span style={{ color: "green" }}>Provide</span>
      </h1>
      <div className="h-grid">
        <h2>
          Check Out December's <br />
          <br /> New Merch!
          <span>
            And see how Processly impacted the club&nbsp;
            <NavItem to="/about" className="to-about">
              here
            </NavItem>
          </span>
        </h2>
        <Gallery
          imgUrls={[
            "https://i.imgur.com/69kQuj0.png",
            "https://i.imgur.com/zacKm42.jpg",
            "https://i.imgur.com/zeTXYMc.jpg",
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
