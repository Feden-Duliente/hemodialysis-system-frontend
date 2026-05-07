import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // check auth status
  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await api.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Auth check failed: ", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  }, []);

  // login function
  const login = async (credentials) => {
    try {
      const data = await api.login(credentials);

      console.log("LOGIN RespONSE: ", data);

      const token =
        data.token ||
        data.accessToken ||
        data.jwt ||
        data.data?.token ||
        data.data?.accessToken;

      if (!token) {
        throw new Error("Token not found!");
      }

      // store token
      localStorage.setItem("token", token);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // get user info
      const userData = await api.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      await api.register(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.logout(refreshToken);
      }
    } catch (error) {
      console.log("Logout API failed: ", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsAuthenticated(false);

      navigate("/auth");
    }
  };

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    checkAuthStatus,
  };
}
