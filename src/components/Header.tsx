import { Shield, Github, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 font-bold text-white shadow-lg shadow-blue-500/20">
            P
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Pure<span className="text-blue-500">PDF</span>
          </span>
        </div>
        
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">How it works</a>
          <a href="#privacy" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Privacy</a>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            <span className="h-2 w-2 rounded-full bg-green-400 mr-1 animate-pulse" />
            <span>100% Client-side</span>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <button className="rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400 active:scale-95">
            Get Pro
          </button>
        </div>
      </div>
    </header>
  );
}
