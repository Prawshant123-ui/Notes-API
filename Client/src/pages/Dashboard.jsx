import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Tag, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";
import NoteEditor from "../components/NoteEditor.jsx";

const COLORS = ["bg-sun", "bg-mint", "bg-coral", "bg-lavender"];

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (query.trim()) {
        res = await api.get(`/notes/search`, { params: { q: query } });
        setNotes(Array.isArray(res.data) ? res.data : res.data.notes || []);
        setTotalPages(1);
      } else if (category) {
        res = await api.get(`/notes/category/${encodeURIComponent(category)}`);
        setNotes(Array.isArray(res.data) ? res.data : res.data.notes || []);
        setTotalPages(1);
      } else {
        res = await api.get(`/notes`, { params: { page, limit: 9 } });
        setNotes(res.data.notes || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load notes");
    } finally { setLoading(false); }
  }, [page, query, category]);

  useEffect(() => { load(); }, [load]);

  const onCreated = (note) => { setNotes((n) => [note, ...n]); setEditorOpen(false); toast.success("Note added"); };

  const onDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((n) => n.filter((x) => x.id !== id));
      toast.success("Deleted");
    } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  const categories = Array.from(new Set(notes.map((n) => n.category).filter(Boolean)));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-4xl font-bold">Your notebook</h1>
          <p className="text-ink-soft">Capture, find, and ace it.</p>
        </div>
        <button
          onClick={() => setEditorOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-coral text-ink font-bold border-2 border-ink shadow-pop hover:-translate-y-0.5 transition-transform"
        >
          <Plus size={18} /> New note
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); setCategory(""); }}
            placeholder="Search notes by title..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-paper border-2 border-ink/15 focus:border-indigo outline-none"
          />
        </div>
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            <FilterChip active={!category} onClick={() => setCategory("")}>All</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} active={category === c} onClick={() => { setCategory(c); setQuery(""); }}>
                <Tag size={12} /> {c}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-paper/60 border-2 border-line animate-pulse" />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <EmptyState onAdd={() => setEditorOpen(true)} />
      ) : (
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {notes.map((n, i) => (
              <motion.div
                key={n.id} layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, rotate: i % 2 ? 0.6 : -0.6 }}
                className={`${COLORS[i % COLORS.length]} rounded-2xl border-2 border-ink p-5 shadow-pop relative group`}
              >
                <button
                  onClick={() => onDelete(n.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-paper border border-ink/30"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
                <Link to={`/app/notes/${n.id}`} className="block">
                  {n.category && (
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-ink text-paper px-2 py-0.5 rounded-md mb-2">
                      {n.category}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold mb-2 line-clamp-2">{n.title}</h3>
                  <p className="text-ink/80 text-sm line-clamp-4 whitespace-pre-wrap">{n.content}</p>
                  <p className="text-[11px] text-ink/60 mt-3">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}
                  </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!query && !category && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <PgBtn disabled={page === 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={16} /></PgBtn>
          <span className="font-semibold">Page {page} of {totalPages}</span>
          <PgBtn disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight size={16} /></PgBtn>
        </div>
      )}

      <AnimatePresence>
        {editorOpen && (
          <NoteEditor onClose={() => setEditorOpen(false)} onSaved={onCreated} />
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap inline-flex items-center gap-1 px-3 py-2 rounded-xl border-2 text-sm font-semibold ${
        active ? "bg-ink text-paper border-ink" : "bg-paper text-ink border-ink/20 hover:border-ink"
      }`}
    >{children}</button>
  );
}

function PgBtn({ children, ...p }) {
  return <button {...p} className="px-3 py-2 rounded-xl border-2 border-ink bg-paper disabled:opacity-40">{children}</button>;
}

function EmptyState({ onAdd }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="text-center py-16 bg-paper rounded-3xl border-2 border-dashed border-ink/30">
      <div className="text-5xl mb-3">📓</div>
      <h3 className="font-display text-2xl font-bold">No notes yet</h3>
      <p className="text-ink-soft mt-1 mb-5">Start your first note , class doesn't wait.</p>
      <button onClick={onAdd} className="px-5 py-3 rounded-2xl bg-mint border-2 border-ink font-bold shadow-pop">
        Create your first note
      </button>
    </motion.div>
  );
}
