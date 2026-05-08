import { useEffect, useState } from "react";
import api from "../services/api";

export default function Categories({ onBack }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data ?? response.data);
    } catch {
      setError("Erro ao carregar categorias.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/categories", { name });
      setName("");
      await loadCategories();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          JSON.stringify(err.response?.data?.errors) ||
          "Erro ao criar categoria."
      );
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.badge}>ExpenseFlow</span>
          <h1 style={styles.title}>Gerenciar categorias</h1>
          <p style={styles.subtitle}>
            Cadastre categorias usadas nas despesas corporativas.
          </p>
        </div>

        <button style={styles.backButton} onClick={onBack}>
          Voltar
        </button>
      </header>

      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.contentGrid}>
        <form style={styles.panel} onSubmit={handleSubmit}>
          <h2 style={styles.sectionTitle}>Nova categoria</h2>

          <input
            style={styles.input}
            placeholder="Ex: Alimentação, Transporte..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button style={styles.primaryButton} type="submit">
            Salvar categoria
          </button>
        </form>

        <div style={styles.panel}>
          <h2 style={styles.sectionTitle}>Categorias cadastradas</h2>

          {categories.length === 0 ? (
            <p style={styles.empty}>Nenhuma categoria cadastrada.</p>
          ) : (
            <div style={styles.categoryList}>
              {categories.map((category) => (
                <div key={category.id} style={styles.categoryItem}>
                  <span>{category.name}</span>
                  <small>ID #{category.id}</small>
                </div>
              ))}
            </div>
          )}
        </div>
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
  subtitle: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "16px",
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
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    marginBottom: "14px",
    boxSizing: "border-box",
  },
  primaryButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
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
  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
};