import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import CreateExpense from "./pages/CreateExpense";
import EditExpense from "./pages/EditExpense";

function App() {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("expenseflow_token")
  ); 
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [page, setPage] = useState("dashboard");

  if (!isLogged) {
    return <Login onLogin={() => setIsLogged(true)} />;
  }

    if (page === "edit") {
    return (
      <EditExpense
        expenseId={selectedExpenseId}
        onBack={() => setPage("expenses")}
      />
    );
  }
  if (page === "expenses") {
    return (
      <Expenses
        onBack={() => setPage("dashboard")}
        onCreate={() => setPage("create")}
        onEdit={(id) => {
          setSelectedExpenseId(id);
          setPage("edit");
        }}
      />
    );
  }

  if (page === "create") {
    return <CreateExpense onBack={() => setPage("expenses")} />;
  }

  return (
    <Dashboard
      onLogout={() => setIsLogged(false)}
      onGoToExpenses={() => setPage("expenses")}
    />
  );
}

export default App;