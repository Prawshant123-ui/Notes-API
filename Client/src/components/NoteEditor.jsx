import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";

export default function NoteEditor({ onClose, onSaved, initial }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "",
    content: initial?.content || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Add a title");
    setSaving(true);
    try {
      const res = initial
        ? await api.put(`/notes/${initial.id}`, form)
        : await api.post(`/notes`, form);
      onSaved(res.data);
    } catch (err) { toast.error(err.response?.data?.message || "Save failed"); }
    finally { setSaving(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-paper rounded-3xl border-2 border-ink shadow-pop overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink/10">
          <h2 className="font-display text-2xl font-bold">{initial ? "Edit note" : "New note"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-lavender"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <input
            autoFocus value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="w-full px-0 py-1 font-display text-3xl font-bold bg-transparent outline-none placeholder-ink/30"
          />
          <input
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category (e.g. Biology)"
            className="w-full px-4 py-2 rounded-xl bg-cream border-2 border-ink/15 outline-none focus:border-indigo"
          />
          <textarea
            value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={10} placeholder="Start writing..."
            className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-ink/15 outline-none focus:border-indigo resize-none leading-7"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border-2 border-ink/20 font-semibold">Cancel</button>
            <button disabled={saving} className="px-5 py-2.5 rounded-xl bg-coral border-2 border-ink font-bold shadow-pop disabled:opacity-60">
              {saving ? "Saving..." : initial ? "Update" : "Save note"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
