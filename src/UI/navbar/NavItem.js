import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const NavItem = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const signout = (portal) => {
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
    navigate(portal);
  };

  if ("notClickable" in props) {
    return (
      <li key={props.to} className={`nav-button`}>
        {props.children}
      </li>
    );
  }
  if (props.className === "to-about") {
    if ("externalLink" in props) {
      return (
        <a
          href={props.externalLink}
          className="span-hyperlink nav-make-line"
          target="_blank"
          rel="noreferrer"
          key={props.to}
        >
          {props.children}
        </a>
      );
    }
    return (
      <NavLink
        to={props.to}
        key={props.to}
        className="span-hyperlink nav-make-line"
      >
        {props.children}
      </NavLink>
    );
  }
  if ("signOut" in props) {
    signout(props.portal);
  }
  return (
    <NavLink key={props.to} to={props.to}>
      <li
        className={`nav-button${
          props.className === "no-line" || " nav-make-line"
        }`}
      >
        {props.children}
      </li>
    </NavLink>
  );
};

export default NavItem;
