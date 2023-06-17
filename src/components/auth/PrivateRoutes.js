import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const PrivateRoutes = (props) => {
  const authcontext = useContext(AuthContext);
  return authcontext.token && authcontext.role === props.role ? (
    <Outlet />
  ) : (
    <Navigate to={`${props.role === "client" ? "" : props.role}/signin`} />
  );
};

export default PrivateRoutes;
