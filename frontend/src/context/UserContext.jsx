import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/auth/getUser", {
          withCredentials: true,
        });

        login(response.data);
      } catch (error) {
        console.log("No user logged in", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
