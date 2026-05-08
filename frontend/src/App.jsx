import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import CreateExpense from "./pages/CreateExpense";
import EditExpense from "./pages/EditExpense";
import Categories from "./pages/Categories";

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
  if (page === "categories") {
    return <Categories onBack={() => setPage("dashboard")} />;
  } 

  return (
    <Dashboard
      onLogout={() => setIsLogged(false)}
      onGoToExpenses={() => setPage("expenses")}
      onGoToCategories={() => setPage("categories")}
    />  
  );
}

export default App;