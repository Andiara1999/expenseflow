import { useEffect, useState } from "react";
import api from "../services/api";

export default function Expenses({ onBack, onCreate, onEdit }) {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  async function loadExpenses() {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data.data ?? response.data);
    } catch (err) {
      setError("Erro ao carregar despesas.");
    }
  }

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function handleDelete(id) {
  const confirmDelete = window.confirm("Deseja realmente excluir esta despesa?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${id}`);
      await loadExpenses();
    } catch (err) {
      setError("Erro ao excluir despesa.");
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.badge}>ExpenseFlow</span>
          <h1 style={styles.title}>Minhas despesas</h1>
          <p style={styles.subtitle}>
            Acompanhe suas despesas cadastradas no sistema.
          </p>
        </div>
        
        <button onClick={onCreate} style={styles.backButton}>
          + Nova despesa
        </button>

        <button style={styles.backButton} onClick={onBack}>
          Voltar
        </button>
      </header>

      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.panel}>
        {expenses.length === 0 ? (
          <p style={styles.empty}>Nenhuma despesa cadastrada.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Título</th>
                <th style={styles.th}>Categoria</th>
                <th style={styles.th}>Valor</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Data</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td style={styles.td}>{expense.title}</td>
                  <td style={styles.td}>
                    {typeof expense.category === "object"
                    ? expense.category?.name
                    : expense.category }
                    </td>
                  <td style={styles.td}>{formatCurrency(expense.amount)}</td>
                  <td style={styles.td}>
                    <span style={styles.status}>{expense.status}</span>
                  </td>
                  <td style={styles.td}>{expense.expense_date}</td>
                   <tr>
                    <td style={styles.td}>
                    <button style={styles.editButton} onClick={() => onEdit(expense.id)}>
                      Editar
                    </button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(expense.id)}>
                      Excluir
                    </button>
                   </td>
                </tr>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    color: "#1f2937",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
  },

  badge: {
    display: "inline-block",
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  title: {
    fontSize: "36px",
    margin: 0,
    color: "#0f172a",
  },

  marginTop: "8px",
  subtitle: {
    color: "#64748b",
    fontSize: "16px",
  },
  editButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "8px",
  },

  backButton: {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  panel: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#475569",
    fontSize: "14px",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
  },

  status: {
    background: "#eef2ff",
    color: "#3730a3",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  empty: {
    color: "#64748b",
  },

  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
};