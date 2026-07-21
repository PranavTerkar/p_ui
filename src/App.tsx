import { useState } from "react";
import * as api from "./lib/api";
import type { AuthUser } from "./lib/api";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

type Session = {
  token: string;
  user: AuthUser;
};

const STORAGE_KEY = "auth_session";

function loadSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function App() {
  const [session, setSession] = useState<Session | null>(loadSession);
  const [view, setView] = useState<"login" | "register">("login");

  const handleLogin = async (email: string, password: string) => {
    const res = await api.login(email, password);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    setSession(res);
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    await api.register(name, email, password);
    await handleLogin(email, password);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {session ? (
        <Dashboard token={session.token} user={session.user} onLogout={handleLogout} />
      ) : view === "login" ? (
        <LoginForm onSubmit={handleLogin} onSwitchToRegister={() => setView("register")} />
      ) : (
        <RegisterForm onSubmit={handleRegister} onSwitchToLogin={() => setView("login")} />
      )}
    </div>
  );
}

export default App;
