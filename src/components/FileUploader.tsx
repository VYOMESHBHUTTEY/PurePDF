import { useState, useRef, useCallback, ChangeEvent, DragEvent } from 'react';
import { Upload, FileText, X, Files } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  isLoading: boolean;
}

export default function FileUploader({ onFilesSelected, isLoading }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter((f: any) => f.type === "application/pdf") as File[];
      setSelectedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files).filter((f: any) => f.type === "application/pdf") as File[];
      setSelectedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <div 
        className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 p-12 text-center overflow-hidden
          ${dragActive ? 'border-blue-500 bg-white/10 ring-4 ring-blue-500/20' : 'border-white/10 bg-white/5 backdrop-blur-md hover:border-blue-500/50 hover:bg-white/[0.07]'}
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -inset-x-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[60px]" />
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {selectedFiles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <motion.div
                animate={dragActive ? { scale: 1.15 } : {}}
                className="rounded-2xl bg-blue-500/20 p-6 shadow-xl shadow-blue-500/10 transition-transform duration-300 group-hover:scale-110"
              >
                <Upload className="h-10 w-10 text-blue-500" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white tracking-tight">Drop PDF files here</h3>
                <p className="text-slate-500">or click to browse from your computer</p>
              </div>
              <button
                onClick={onButtonClick}
                className="mt-2 rounded-xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
              >
                Choose Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {selectedFiles.map((file, idx) => (
                  <motion.div
                    key={`${file.name}-${idx}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <FileText className="h-5 w-5 flex-shrink-0 text-blue-400" />
                      </div>
                      <span className="truncate text-xs font-medium text-slate-300">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="ml-2 rounded-full p-2 text-slate-500 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button
                  onClick={onButtonClick}
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <Files className="h-4 w-4" />
                  Add more
                </button>
                <button
                  onClick={() => onFilesSelected(selectedFiles)}
                  disabled={selectedFiles.length < 2}
                  className="rounded-xl bg-blue-500 px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Merge PDFs
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus Ring Overlay on hover */}
        <div className="absolute -inset-[2px] rounded-3xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 ring-8 ring-blue-500/10 pointer-events-none transition-opacity" />
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
        <ShieldCheckIcon />
        <span>End-to-end local processing</span>
      </div>
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <svg 
      className="h-4 w-4 text-blue-500/80" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
