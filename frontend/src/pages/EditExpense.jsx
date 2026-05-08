import { useEffect, useState } from "react";
import api from "../services/api";

export default function EditExpense({ expenseId, onBack }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    expense_category_id: "",
    expense_date: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadData() {
    try {
      const [expenseResponse, categoriesResponse] = await Promise.all([
        api.get(`/expenses/${expenseId}`),
        api.get("/categories"),
      ]);

      const expense = expenseResponse.data.data ?? expenseResponse.data;
      const categoriesData = categoriesResponse.data.data ?? categoriesResponse.data;

      setCategories(categoriesData);

      setForm({
        title: expense.title || "",
        amount: expense.amount || "",
        expense_category_id:
          expense.expense_category_id || expense.category?.id || "",
        expense_date: expense.expense_date || "",
        description: expense.description || "",
      });
    } catch (err) {
      setError("Erro ao carregar despesa.");
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.put(`/expenses/${expenseId}`, form);
      onBack();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          JSON.stringify(err.response?.data?.errors) ||
          "Erro ao atualizar despesa."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={styles.page}>
      <h1>Editar despesa</h1>

      <button onClick={onBack} style={styles.backButton}>
        Voltar
      </button>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="amount"
          placeholder="Valor"
          value={form.amount}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="expense_date"
          value={form.expense_date}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="expense_category_id"
          value={form.expense_category_id}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Selecione categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    padding: 40,
    fontFamily: "Arial",
    background: "#f4f7fb",
    minHeight: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxWidth: 420,
    marginTop: 20,
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
  },
  button: {
    padding: 12,
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    maxWidth: 420,
  },
};