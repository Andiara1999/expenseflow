import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard({ onLogout }) {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data.data ?? response.data);
    } catch (err) {
      setError("Erro ao carregar dashboard.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("expenseflow_token");
    onLogout();
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!dashboard) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ fontFamily: "Arial", padding: 40 }}>
      <h1>Dashboard ExpenseFlow</h1>

      <button onClick={handleLogout}>Sair</button>

      <h2>Resumo</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <div>
          <strong>Total</strong>
          <p>{dashboard.summary.total_expenses}</p>
        </div>

        <div>
          <strong>Pendentes</strong>
          <p>{dashboard.summary.total_pending}</p>
        </div>

        <div>
          <strong>Aprovadas</strong>
          <p>{dashboard.summary.total_approved}</p>
        </div>

        <div>
          <strong>Pagas</strong>
          <p>{dashboard.summary.total_paid}</p>
        </div>
      </div>

      <h2>Valores</h2>

      <ul>
        <li>Total geral: R$ {dashboard.amounts.total_amount}</li>
        <li>Total pendente: R$ {dashboard.amounts.total_amount_pending}</li>
        <li>Total aprovado: R$ {dashboard.amounts.total_amount_approved}</li>
        <li>Total pago: R$ {dashboard.amounts.total_amount_paid}</li>
      </ul>

      <h2>Por categoria</h2>

      <ul>
        {dashboard.expenses_by_category.map((item, index) => (
          <li key={index}>
            {item.category}: R$ {item.total}
          </li>
        ))}
      </ul>
    </div>
  );
}