import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import AuthShell from "../components/AuthShell.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      nav("/app");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Pick up where you left off.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-coral text-ink font-bold border-2 border-ink shadow-pop disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </motion.button>
        <p className="text-sm text-ink-soft text-center">
          No account? <Link to="/register" className="text-indigo-deep font-semibold underline">Sign up</Link>
        </p>
      </form>
    </AuthShell>
  );
}

function Field({ label, type, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} required
        className="mt-1 w-full px-4 py-3 rounded-xl bg-paper border-2 border-ink/20 focus:border-indigo outline-none"
      />
    </label>
  );
}
