import { useState } from "react";
import WordForm from "./components/Wordform";
import BulkEntry from "./components/BulkEntry";
import PdfPreview from "./components/PdfReview";
import { generatePdf } from "./components/GeneratePdf";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPdfMode, setIsPdfMode] = useState(false);

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
    <div className="flex gap-6 p-6">
      {/* LEFT PANEL */}
      <div className="w-1/3 space-y-4">
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
  onClick={() => generatePdf(entries)}
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
        />
      </div>
    </div>
  );
}
