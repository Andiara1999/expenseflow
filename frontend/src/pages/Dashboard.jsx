import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard({ onLogout, onGoToExpenses, onGoToCategories  }) {
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

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorBox}>{error}</div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div style={styles.page}>
        <p style={styles.loading}>Carregando dashboard...</p>
      </div>
    );
  }

  const cards = [
    {
      label: "Total",
      value: dashboard.summary.total_expenses,
      description: "Despesas cadastradas",
    },
    {
      label: "Pendentes",
      value: dashboard.summary.total_pending,
      description: "Aguardando análise",
    },
    {
      label: "Aprovadas",
      value: dashboard.summary.total_approved,
      description: "Aprovadas para pagamento",
    },
    {
      label: "Pagas",
      value: dashboard.summary.total_paid,
      description: "Finalizadas",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={styles.secondaryButton} onClick={onGoToExpenses}>
          Ver despesas
        </button>

        <button style={styles.secondaryButton} onClick={onGoToCategories}>
          Categorias
        </button>

        <button style={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      </div>

      <section style={styles.grid}>
        {cards.map((card) => (
          <div key={card.label} style={styles.card}>
            <p style={styles.cardLabel}>{card.label}</p>
            <strong style={styles.cardValue}>{card.value}</strong>
            <span style={styles.cardDescription}>{card.description}</span>
          </div>
        ))}
      </section>

      <section style={styles.contentGrid}>
        <div style={styles.panel}>
          <h2 style={styles.sectionTitle}>Resumo de valores</h2>

          <div style={styles.amountList}>
            <div style={styles.amountItem}>
              <span>Total geral</span>
              <strong>{formatCurrency(dashboard.amounts.total_amount)}</strong>
            </div>

            <div style={styles.amountItem}>
              <span>Total pendente</span>
              <strong>
                {formatCurrency(dashboard.amounts.total_amount_pending)}
              </strong>
            </div>

            <div style={styles.amountItem}>
              <span>Total aprovado</span>
              <strong>
                {formatCurrency(dashboard.amounts.total_amount_approved)}
              </strong>
            </div>

            <div style={styles.amountItem}>
              <span>Total pago</span>
              <strong>{formatCurrency(dashboard.amounts.total_amount_paid)}</strong>
            </div>
          </div>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.sectionTitle}>Despesas por categoria</h2>

          {dashboard.expenses_by_category.length === 0 ? (
            <p style={styles.empty}>Nenhuma despesa por categoria.</p>
          ) : (
            <div style={styles.categoryList}>
              {dashboard.expenses_by_category.map((item, index) => (
                <div key={index} style={styles.categoryItem}>
                  <span>{item.category}</span>
                  <strong>{formatCurrency(item.total)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
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

  subtitle: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "16px",
  },

  logoutButton: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
    marginBottom: "28px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
  },

  cardLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  cardValue: {
    display: "block",
    fontSize: "34px",
    margin: "10px 0",
    color: "#0f172a",
  },

  cardDescription: {
    color: "#94a3b8",
    fontSize: "13px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
  },

  panel: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
  },

  sectionTitle: {
    marginTop: 0,
    marginBottom: "18px",
    color: "#0f172a",
    fontSize: "20px",
  },

  amountList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  amountItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #e5e7eb",
    color: "#475569",
  },

  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  categoryItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f8fafc",
    padding: "14px",
    borderRadius: "12px",
    color: "#334155",
  },

  empty: {
    color: "#64748b",
  },

  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#64748b",
  },

  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "16px",
    borderRadius: "12px",
    maxWidth: "500px",
    margin: "80px auto",
    textAlign: "center",
  },
  secondaryButton: {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }
};