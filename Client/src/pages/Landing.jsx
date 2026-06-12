import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Search, FolderKanban, NotebookPen } from "lucide-react";

const features = [
  { icon: NotebookPen, title: "Quick capture", desc: "Jot down lecture notes in seconds.", color: "bg-mint" },
  { icon: FolderKanban, title: "Categories", desc: "Organize by subject and topic.", color: "bg-sun" },
  { icon: Search, title: "Instant search", desc: "Find that one note before the exam.", color: "bg-coral" },
];

export default function Landing() {
  return (
    <div className="min-h-full">
      <header className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo text-paper grid place-items-center shadow-pop">
            <NotebookPen size={18} />
          </div>
          <span className="font-display text-xl font-bold">Draftly</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-lavender">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-xl bg-ink text-paper text-sm font-semibold shadow-pop hover:-translate-y-0.5 transition-transform">
            Get started
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Notes that actually <span className=" text-indigo">stick</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="mt-5 text-lg text-ink-soft max-w-md"
          >
            A cozy, distraction free notebook for class, side projects, and lastbminute cramming.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mt-8 flex gap-3"
          >
            <Link to="/register" className="px-6 py-3 rounded-2xl bg-coral text-ink font-bold shadow-pop hover:-translate-y-0.5 transition-transform">
              Start studying 
            </Link>
            <Link to="/login" className="px-6 py-3 rounded-2xl border-2 border-ink font-semibold hover:bg-paper">
              I have an account
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
          transition={{ type: "spring", stiffness: 90 }}
          className="relative"
        >
          <div className="paper-bg bg-paper rounded-3xl border-2 border-ink p-6 shadow-pop">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-coral" />
              <div className="w-2.5 h-2.5 rounded-full bg-sun" />
              <div className="w-2.5 h-2.5 rounded-full bg-mint" />
              <span className="ml-2 text-xs text-ink-soft font-medium">biology · chapter 4</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-3">Cell respiration </h3>
            <ul className="space-y-2 text-ink-soft leading-8">
              <li>• Glycolysis happens in the cytoplasm</li>
              <li>• Krebs cycle : mitochondrial matrix</li>
              <li>• ETC pumps protons across the membrane</li>
              <li>• Net yield ≈ 30–32 ATP per glucose</li>
            </ul>
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-sun border-2 border-ink rounded-2xl px-4 py-2 font-display font-bold rotate-6 shadow-pop"
          >
            A+ ready
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-24 grid md:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-paper rounded-2xl border-2 border-ink p-6 shadow-pop"
          >
            <div className={`w-11 h-11 rounded-xl ${f.color} grid place-items-center border-2 border-ink mb-4`}>
              <f.icon size={20} />
            </div>
            <h3 className="font-display text-xl font-bold mb-1">{f.title}</h3>
            <p className="text-ink-soft">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
