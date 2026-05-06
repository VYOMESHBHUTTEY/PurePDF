import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUploader from './components/FileUploader';
import ToolsGrid from './components/ToolsGrid';
import ProcessingOverlay from './components/ProcessingOverlay';
import { mergeFiles, downloadBlob } from './lib/pdf-utils';
import { Shield, Lock, FileCheck } from 'lucide-react';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMerge = async (files: File[]) => {
    try {
      setIsProcessing(true);
      setProgress(0);
      
      const mergedPdf = await mergeFiles(files, (p) => {
        setProgress(p);
      });
      
      downloadBlob(mergedPdf, 'merged-purepdf.pdf', 'application/pdf');
    } catch (error) {
      console.error('PDF Merge Error:', error);
      alert('An error occurred while merging your PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] selection:bg-blue-500/30">
      <Header />
      
      <main className="relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="pointer-events-none absolute right-0 top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 z-10">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 tracking-wide uppercase">
                  <Shield className="w-3 h-3 mr-2" />
                  Your files never leave your device
                </div>
                
                <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight sm:text-7xl">
                  PDF Tools, <span className="text-blue-500">Reimagined.</span>
                </h1>
                
                <p className="mx-auto mb-12 max-w-xl text-lg text-slate-400 sm:text-xl">
                  Professional PDF manipulation without the privacy risk. 
                  No uploads, no servers, just pure speed in your browser.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10"
              >
                <FileUploader onFilesSelected={handleMerge} isLoading={isProcessing} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <ToolsGrid />

        {/* Privacy Section */}
        <section id="privacy" className="container mx-auto px-4 py-24 mb-20 border-t border-slate-800/50">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-24">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                Your files are your business. <br />
                We keep it that way.
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Unlike other PDF tools that upload your sensitive documents to their servers, 
                PurePDF uses <span className="text-white">WebAssembly</span> and 
                <span className="text-white"> Client-side JavaScript</span> to process everything 
                locally on your computer.
              </p>
              <div className="space-y-4">
                {[
                  "No data is ever sent to a server",
                  "Process gigabytes of files in seconds",
                  "Works offline after initial load",
                  "Open source and transparent"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20">
                      <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-600/20 to-transparent p-1 ring-1 ring-blue-500/20">
                <div className="rounded-xl bg-[#0F172A] p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-500">Security Audit</p>
                      <h4 className="text-xl font-bold text-white">Privacy Report</h4>
                    </div>
                    <Shield className="h-8 w-8 text-blue-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div className="h-full w-full rounded-full bg-blue-500" />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-400">
                      <span>Server Storage</span>
                      <span className="text-white uppercase">0% Usage</span>
                    </div>
                    
                    <div className="h-1.5 w-full rounded-full bg-slate-800 mt-4">
                      <div className="h-full w-full rounded-full bg-blue-500" />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-400">
                      <span>Data Leak Probability</span>
                      <span className="text-white uppercase">Impossible</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-blue-500/5 p-4 border border-blue-500/10">
                    <p className="text-xs text-slate-400 italic">
                      "PurePDF's architecture ensures total privacy by eliminating the need 
                      for server-side processing entirely."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {isProcessing && <ProcessingOverlay progress={progress} />}
      </AnimatePresence>
    </div>
  );
}
