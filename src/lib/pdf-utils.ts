import { PDFDocument } from 'pdf-lib';

export async function mergeFiles(files: File[], onProgress?: (progress: number) => void): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    
    if (onProgress) {
      onProgress(Math.round(((i + 1) / total) * 100));
    }
  }

  return await mergedPdf.save();
}

export function downloadBlob(data: Uint8Array, fileName: string, type: string) {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
