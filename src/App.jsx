import { useState } from "react";
import WordForm from "./components/Wordform";
import BulkEntry from "./components/BulkEntry";
import PdfPreview from "./components/PdfReview";
import { generatePdf } from "./components/GeneratePdf";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPdfMode, setIsPdfMode] = useState(false);

  // New states
  const [pdfTitle, setPdfTitle] = useState("ONE WORD SUBSTITUTION");
  const [titleColor, setTitleColor] = useState("#000000"); // Default blue

  const handleAddOrUpdate = (entry) => {
    if (editingIndex !== null) {
      setEntries((prev) =>
        prev.map((e, i) => (i === editingIndex ? entry : e))
      );
      setEditingIndex(null);
    } else {
      setEntries((prev) => [...prev, entry]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-2 md:p-6">

    
      {/* LEFT PANEL */}
      <div className="md:w-1/3 space-y-4">
        <div className="space-y-3 rounded-xl border bg-white p-4 shadow-sm">
  {/* LABEL */}
  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
    PDF Title
  </p>

  {/* TITLE INPUT */}
  <input
    type="text"
    placeholder="Enter PDF title"
    value={pdfTitle}
    onChange={(e) => setPdfTitle(e.target.value)}
    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
               outline-none transition"
  />

  {/* COLOR PICKER ROW */}
 <div className="flex items-center justify-between pt-2">
  <span className="text-xs font-medium text-gray-600">
    Pick Title Color
  </span>

  <div className="flex items-center gap-3">
    {/* Color Code */}
    <span className="text-[11px] font-mono text-gray-500 uppercase">
      {titleColor}
    </span>

    {/* Reset Button */}
    <button
      type="button"
      onClick={() => setTitleColor("#000000")} // default
      className="text-[11px] font-semibold text-gray-500
                 hover:text-red-600 transition"
      title="Reset to default color"
    >
      Reset
    </button>

    {/* Color Picker */}
    <input
      type="color"
      value={titleColor}
      onChange={(e) => setTitleColor(e.target.value)}
      className="h-8 w-8 cursor-pointer rounded-full overflow-hidden"
    />
  </div>
</div>

</div>



        <WordForm
          onSubmit={handleAddOrUpdate}
          editingEntry={editingIndex !== null ? entries[editingIndex] : null}
          cancelEdit={() => setEditingIndex(null)}
        />

        <BulkEntry
          onBulkAdd={(list) =>
            setEntries((prev) => [...prev, ...list])
          }
        />

      

        <button
          onClick={() => generatePdf(entries, pdfTitle)}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Generate PDF
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="overflow-auto border p-4 bg-gray-200">
        <PdfPreview
          entries={entries}
          onEdit={(i) => setEditingIndex(i)}
          isPdfMode={isPdfMode}
          pdfTitle={pdfTitle}
          titleColor={titleColor}
        />
      </div>
    </div>
  );
}
