import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import AuthShell from "../components/AuthShell.jsx";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be 6+ characters");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created!");
      nav("/app");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell title="Join StudyNotes" subtitle="Free for students. Always.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-mint text-ink font-bold border-2 border-ink shadow-pop disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </motion.button>
        <p className="text-sm text-ink-soft text-center">
          Already have one? <Link to="/login" className="text-indigo-deep font-semibold underline">Log in</Link>
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
