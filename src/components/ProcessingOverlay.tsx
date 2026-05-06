import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ProcessingOverlayProps {
  progress: number;
}

export default function ProcessingOverlay({ progress }: ProcessingOverlayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0F172A]/90 backdrop-blur-sm"
    >
      <div className="w-full max-w-md px-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 ring-1 ring-blue-500/20"
        >
          <Loader2 className="h-8 w-8 text-blue-500" />
        </motion.div>
        
        <h2 className="mb-2 text-2xl font-bold text-white">Generating your PDF</h2>
        <p className="mb-8 text-slate-400">Processing locally in your browser...</p>
        
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>Processing files</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
