import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("expenseflow_token")
  );

  if (!isLogged) {
    return <Login onLogin={() => setIsLogged(true)} />;
  }

  return <Dashboard onLogout={() => setIsLogged(false)} />;
}

export default App;