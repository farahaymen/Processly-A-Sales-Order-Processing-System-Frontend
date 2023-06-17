import navLogo from "../../assets/orange-box-by-good-ware.png";

import NavItem from "./NavItem";

const NavListOptions = (props) => {
  return (
    <ul className="nav-options">
      {Object.entries(props.options).map(([to, text]) => (
        <NavItem to={to} key={to}>
          {text}
        </NavItem>
      ))}
    </ul>
  );
};

export default NavListOptions;
