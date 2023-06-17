import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../store/authContext";
import NavLogo from "./NavLogo";
import NavListOptions from "./NavListOptions";
import NavSignInUpOut from "./NavSignInUpOut";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  let portal = "/";
  let navOptionsToAndText = {
    "/": "Home",
    "/orders/make": "Make An Order",
    "/orders/view": "View Orders",
    "/about": "About",
  };

  if (location.pathname.includes("st")) {
    portal = "st/";
    navOptionsToAndText = {
      "st/": "Home",
      "st/update-order-status": "Update Order Status",
      "st/generate-report": "Generate Report",
    };
  } else if (location.pathname.includes("wh")) {
    portal = "wh/";
    navOptionsToAndText = {
      "wh/": "Home",
      "wh/add-product": "Add Product",
      "wh/get-products": "Get Products",
      "wh/update-product": "Update Product",
    };
  }

  if (
    // user is trying to login as sales-team or warehouse member, so don't show them possible actions in NavBar unless they successfully sign in
    authContext.role === "" &&
    (location.pathname.includes("st") || location.pathname.includes("wh"))
  ) {
    return <div style={{ marginTop: "15vh" }}></div>;
  }

  return (
    // if all above isn't true, then the person accessing the website is either a client or an anonymous user. Either way, display client's NavBar
    <nav className="nav">
      <NavLogo to={portal} />
      <NavListOptions options={navOptionsToAndText} />
      <NavSignInUpOut portal={portal} />
    </nav>
  );
};

export default Navbar;
