import { createContext } from "react";

//We  define our context with empty data for better code completion later on
const AuthContext = createContext({
  id: "",
  name: "",
  email: "",
  token: "",
  role: "",
  login: (id, name, email, role, token) => {},
  logout: () => {},
});

export default AuthContext;
