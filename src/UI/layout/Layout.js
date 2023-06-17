import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = (props) => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main>{props.children}</main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

// side note: "footer" className has to be here not in footer.js's JSX, otherwise it will not be positioned at the bottom
