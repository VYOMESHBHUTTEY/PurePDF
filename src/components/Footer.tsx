import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto px-8 py-10 border-t border-white/5 bg-[#0F172A] shrink-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-[10px]">P</div>
            <span className="font-bold text-white tracking-tight">PurePDF</span>
          </div>
          <p>© {new Date().getFullYear()} PurePDF. Built for absolute privacy.</p>
        </div>
        <div className="flex gap-8 font-medium">
          <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
