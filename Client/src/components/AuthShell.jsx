import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NotebookPen } from "lucide-react";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-full grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-ink text-paper">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-coral text-ink grid place-items-center"><NotebookPen size={18} /></div>
          <span className="font-display text-xl font-bold">Draftly</span>
        </Link>
        <div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-bold leading-tight">
            Your study buddy <br /> in your pocket.
          </motion.h2>
          <p className="mt-4 text-paper/70 max-w-sm">Organize lectures, sketch ideas, and breeze through exams.</p>
        </div>
        <p className="text-paper/50 text-sm">© Draftly , developed by Prashant Sharma</p>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo text-paper grid place-items-center"><NotebookPen size={18} /></div>
            <span className="font-display text-xl font-bold">StudyNotes</span>
          </Link>
          <h1 className="font-display text-4xl font-bold">{title}</h1>
          <p className="text-ink-soft mt-2 mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
