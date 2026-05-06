import { Combine, Scissors, Image as ImageIcon, Zap, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const tools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDFs into one unified document.',
    icon: Combine,
    active: true,
    color: 'bg-indigo-500/20 text-indigo-400'
  },
  {
    title: 'Split PDF',
    description: 'Extract specific pages or separate pages into individual files.',
    icon: Scissors,
    active: false,
    color: 'bg-pink-500/20 text-pink-400'
  },
  {
    title: 'Image to PDF',
    description: 'Convert JPG, PNG, and other images to high-quality PDF.',
    icon: ImageIcon,
    active: false,
    color: 'bg-green-500/20 text-green-400'
  },
  {
    title: 'Compress PDF',
    description: 'Reduce file size while keeping the highest quality.',
    icon: Zap,
    active: false,
    color: 'bg-orange-500/20 text-orange-400'
  },
  {
    title: 'Protect PDF',
    description: 'Add encryption and passwords to your confidential documents.',
    icon: Lock,
    active: false,
    color: 'bg-purple-500/20 text-purple-400'
  }
];

export default function ToolsGrid() {
  return (
    <section className="container mx-auto px-4 py-24" id="tools">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">Everything you need.</h2>
        <p className="mt-4 text-slate-400 text-lg">Professional PDF manipulation without the privacy risk.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className={`relative group h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/20 ${!tool.active ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className={`mb-4 inline-flex items-center justify-center rounded-xl h-12 w-12 ${tool.color} transition-transform duration-300 group-hover:scale-110`}>
              <tool.icon className="h-6 w-6" />
            </div>
            
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              {tool.title}
            </h3>
            
            <p className="text-xs leading-relaxed text-slate-500 line-clamp-2 md:hidden lg:block">
              {tool.description}
            </p>

            {!tool.active && (
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                SOON
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
