import { useEffect, useState } from "react";
import api from "../services/api";

export default function CreateExpense({ onBack }) {
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

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data ?? response.data);
    } catch (err) {
      setError("Erro ao carregar categorias.");
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
      await api.post("/expenses", form);
      onBack(); // volta para lista/dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div style={styles.page}>
      <h1>Nova despesa</h1>

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
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    padding: 40,
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxWidth: 400,
    marginTop: 20,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  button: {
    padding: 12,
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  backButton: {
    marginTop: 10,
    padding: 8,
  },

  error: {
    color: "red",
    marginTop: 10,
  },
};