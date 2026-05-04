import { useState } from "react";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("andiara@email.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("expenseflow_token", response.data.access_token);
      onLogin();
    } catch (err) {
      setError("Email ou senha inválidos.");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", fontFamily: "Arial" }}>
      <h1>ExpenseFlow</h1>
      <p>Faça login para acessar o sistema.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 10, marginBottom: 12 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            style={{ width: "100%", padding: 10, marginBottom: 12 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={{ width: "100%", padding: 10 }} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}