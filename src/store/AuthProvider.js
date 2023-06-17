import AuthContext from "./authContext";

import { useState } from "react";

const AuthProvider = (props) => {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const authContext = {
    name: name,
    email: email,
    id: id,
    role: role,
    token: token,
    login: (id, name, email, role, token) => {
      setID(id);
      setName(name);
      setEmail(email);
      setRole(role);
      setToken(token);
    },
    logout: () => {
      setID("");
      setName("");
      setEmail("");
      setRole("");
      setToken("");
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
