import api from "../api/api";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ On app load, check if user info exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("Stored user found:",JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login user
  const login = async (userData) => {
    try {
      const response = await api.post("/users/login", userData); // backend endpoint
      const { user, token } = response.data;

      // Save token (optional) and user info to localStorage
      localStorage.setItem("token", token); // optional for auth headers
      localStorage.setItem("user", JSON.stringify(user));

      // Set user in context
      setUser(user);

      console.log("User logged in:", user);
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  // ✅ Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
