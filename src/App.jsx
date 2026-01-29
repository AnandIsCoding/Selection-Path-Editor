import { useState } from "react";
import WordForm from "./components/Wordform";
import BulkEntry from "./components/BulkEntry";
import PdfPreview from "./components/PdfReview";
import { generatePdf } from "./components/GeneratePdf";
import { 
  FileText, 
  Download, 
  Trash2, 
  Settings2, 
  PlusCircle, 
  RotateCcw,
  Layout,
  Layers
} from "lucide-react";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [pdfTitle, setPdfTitle] = useState("ONE WORD SUBSTITUTION");
  
  // Design Constants
  const DEFAULT_COLOR = "#4f46e5"; 
  const [titleColor, setTitleColor] = useState(DEFAULT_COLOR);
  const [isPdfMode, setIsPdfMode] = useState(false); // Restored your original state

  const handleAddOrUpdate = (entry) => {
    if (editingIndex !== null) {
      setEntries((prev) => prev.map((e, i) => (i === editingIndex ? entry : e)));
      setEditingIndex(null);
    } else {
      setEntries((prev) => [...prev, entry]);
    }
  };

  const clearAll = () => {
    if (window.confirm("Clear all entries? This action cannot be undone.")) {
      setEntries([]);
    }
  };

  return (
    <div className="flex h-screen bg-black font-sans text-slate-900 overflow-hidden">
      
      {/* LEFT SIDEBAR - The Control Center */}
      <aside className="w-80 md:w-[30rem] flex flex-col border-r border-slate-200 bg-white shadow-xl z-20">
        
        {/* Header / Branding */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100">
              <FileText className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-slate-800">Selection Path </h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Editor</span>
            </div>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          
          {/* Section 1: Global Settings */}
          <section>
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <Settings2 size={14} className="stroke-[3px]" />
              <span className="text-[11px] font-black uppercase tracking-widest">Document Config</span>
            </div>
            
            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60 transition-all hover:border-indigo-100">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">Main Header Title</label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  className="w-full rounded-xl border-slate-200 bg-white text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all border p-3 shadow-sm outline-none"
                />
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Title Accent</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-400">{titleColor}</span>
                  
                  {/* Color Reset Button */}
                  <button 
                    onClick={() => setTitleColor(DEFAULT_COLOR)}
                    className={`p-1.5 rounded-md transition-all ${titleColor !== DEFAULT_COLOR ? 'text-orange-500 bg-orange-50 hover:bg-orange-100' : 'text-slate-300 opacity-0'}`}
                    title="Reset to default Indigo"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <div className="relative w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden ring-1 ring-slate-200">
                    <input
                      type="color"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                      className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer border-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Data Input */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <PlusCircle size={14} className="stroke-[3px]" />
              <span className="text-[11px] font-black uppercase tracking-widest">Content Entry</span>
            </div>

            <WordForm
              onSubmit={handleAddOrUpdate}
              editingEntry={editingIndex !== null ? entries[editingIndex] : null}
              cancelEdit={() => setEditingIndex(null)}
            />

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
              <span className="relative bg-white px-4 flex mx-auto w-fit text-[10px] font-bold text-slate-300 uppercase tracking-widest">Batch Actions</span>
            </div>

            <BulkEntry onBulkAdd={(list) => setEntries((prev) => [...prev, ...list])} />
          </section>
        </div>

        {/* Sticky Footer Actions */}
        <div className="p-1 bg-white border-t border-slate-100 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <button
            onClick={clearAll}
            className="group flex items-center justify-center w-12 h-12 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl border border-slate-100"
            title="Delete All Entries"
          >
            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => generatePdf(entries, pdfTitle)}
            className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-100 active:scale-[0.97]"
          >
            <Download size={18} />
            Generate Document
          </button>
        </div>
      </aside>

      {/* RIGHT PANEL - The Canvas Preview */}
      <main className="flex-1 overflow-y-auto relative bg-black custom-scrollbar">
        {/* Floating Toolbar Info */}
        <div className="sticky top-0  w-full px-8 py-4 flex justify-between items-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center gap-4 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-indigo-500" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Live Preview</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{entries.length} Entries</span>
          </div>
        </div>

        <div className="p-8 flex justify-center pb-20">
          {/* This is the container for your original PdfPreview */}
          <div className="w-full max-w-[850px] bg-white shadow-2xl rounded-sm border border-slate-300 min-h-[1100px] overflow-hidden">
            {/* Your component remains exactly as requested */}
            <PdfPreview
              entries={entries}
              onEdit={(i) => setEditingIndex(i)}
              isPdfMode={isPdfMode}
              pdfTitle={pdfTitle}
              titleColor={titleColor}
            />
          </div>
        </div>
      </main>
    </div>
  );
}