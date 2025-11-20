import { useState } from "react";
import API from "../api/axios";
import type { LoginPayload, LoginResponse } from "../interfaces/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState<LoginPayload>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post<LoginResponse>("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/employees");
    } catch (error) {
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          Iniciar sesión
        </h2>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Usuario</label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="admin"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="admin123"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
