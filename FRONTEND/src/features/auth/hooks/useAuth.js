import { register, login, getMe, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  async function registerHandler({ email, username, password }) {
    setLoading(true);
    const data = await register({ email, username, password });
    setUser(data.user);
    setLoading(false);
  }

  async function loginHandler({ email, password }) {
    setLoading(true);
    const data = await login({ email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function getMeHandler() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }

  async function logoutHandler() {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  }

  return {
    user,
    loading,
    registerHandler,
    loginHandler,
    getMeHandler,
    logoutHandler,
  };
};
