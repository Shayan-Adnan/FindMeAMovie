import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

        if (response.data.success) {
          login(response.data.userData);
        }
      } catch (error) {
        console.log("Error getting user: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
