import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const token = Cookies.get("token");
    if (token) {
      const { data } = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      getUser();
    }
  }, []);

  const login = async (token) => {
    Cookies.set("token", token); 
    await getUser(); 
  };

  const logout = () => {
    Cookies.remove("token"); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
