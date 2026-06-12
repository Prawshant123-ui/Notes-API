import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";
import NoteEditor from "../components/NoteEditor.jsx";

export default function NoteDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setNote(data);
      } catch (err) { toast.error(err.response?.data?.message || "Not found"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const del = async () => {
    if (!confirm("Delete this note?")) return;
    try { await api.delete(`/notes/${id}`); toast.success("Deleted"); nav("/app"); }
    catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  if (loading) return <div className="h-64 rounded-3xl bg-paper border-2 border-line animate-pulse" />;
  if (!note) return (
    <div className="text-center py-20">
      <p className="text-ink-soft">Note not found.</p>
      <Link to="/app" className="text-indigo-deep font-semibold underline">Back to notes</Link>
    </div>
  );

  return (
    <div>
      <Link to="/app" className="inline-flex items-center gap-1 text-ink-soft hover:text-ink mb-6 font-semibold">
        <ArrowLeft size={16} /> Back
      </Link>
      <motion.article
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="paper-bg bg-paper rounded-3xl border-2 border-ink shadow-pop p-8 md:p-12"
      >
        {note.category && (
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-ink text-paper px-2.5 py-1 rounded-md mb-4">
            {note.category}
          </span>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{note.title}</h1>
        <p className="text-ink-soft mb-8 text-sm">
          {note.createdAt && new Date(note.createdAt).toLocaleString()}
        </p>
        <div className="whitespace-pre-wrap text-lg leading-9 text-ink/90">{note.content}</div>
        <div className="flex gap-2 mt-10 pt-6 border-t-2 border-ink/10">
          <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sun border-2 border-ink font-bold shadow-pop">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={del} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-paper border-2 border-ink font-bold hover:bg-coral">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </motion.article>
      <AnimatePresence>
        {editing && (
          <NoteEditor initial={note} onClose={() => setEditing(false)} onSaved={(n) => { setNote(n); setEditing(false); toast.success("Updated"); }} />
        )}
      </AnimatePresence>
    </div>
  );
}
