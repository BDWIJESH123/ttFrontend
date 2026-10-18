
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "dashboard") {
    return <Dashboard onLogout={() => setPage("login")} />;
  }

  if (page === "register") {
    return <Register onLogin={() => setPage("login")} />;
  }

  if (page === "forgot") {
    return <ForgotPassword onLogin={() => setPage("login")} />;
  }

  return (
    <Login
      onLogin={() => setPage("dashboard")}
      onRegister={() => setPage("register")}
      onForgotPassword={() => setPage("forgot")}
    />
  );
}
