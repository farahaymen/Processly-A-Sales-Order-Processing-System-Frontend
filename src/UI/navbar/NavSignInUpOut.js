import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import NavItem from "./NavItem";

const NavSignInUpOut = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const signout = () => {
    authContext.logout();
    toast.success("Signed out successfully...", {
      // shows toast which is housed by the container ToastContainer in App.js
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(props.portal);
  };

  return (
    <>
      <ul
        className={
          (authContext.token && "nav-hide-element") || "nav-not-signed"
        }
      >
        <NavItem to={`${props.portal}signin`}>Sign In</NavItem>
        {props.portal === "/" && (
          <>
            <NavItem notClickable={true}>&nbsp; / &nbsp;</NavItem>
            <NavItem to="/signup">Sign Up</NavItem>
          </>
        )}
      </ul>
      <ul className={(authContext.token && "nav-signed") || "nav-hide-element"}>
        <NavItem notClickable={true}>Welcome, {authContext.name}</NavItem>
        <NavItem notClickable={true}>&nbsp; / &nbsp;</NavItem>
        <button className="nav-button nav-make-line" onClick={signout}>
          Sign out
        </button>
      </ul>
    </>
  );
};

export default NavSignInUpOut;
