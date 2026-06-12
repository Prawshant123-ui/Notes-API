import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenCheck, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -8 }} animate={{ rotate: 0 }}
              className="w-9 h-9 rounded-xl bg-indigo text-paper grid place-items-center shadow-pop"
            >
              <BookOpenCheck size={18} />
            </motion.div>
            <span className="font-display text-xl font-bold">Draftly</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-lavender text-ink">
              <User size={14} /> <span className="text-sm font-medium">{user?.email || "Student"}</span>
            </div>
            <button
              onClick={() => { logout(); nav("/"); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-ink bg-paper hover:bg-sun transition-colors text-sm font-semibold"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
