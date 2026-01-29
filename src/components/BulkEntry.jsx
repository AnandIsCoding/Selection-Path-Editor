import { useState } from "react";

const DUMMY_IMAGE =
  "/watermark.jpeg";

export default function BulkEntry({ onBulkAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const lines = text.split("\n");

    const entries = lines
      .map((line) => {
        if (!line.trim()) return null;

        const parts = line.split("|").map((v) => v?.trim());

        const [word, en, hi, image] = parts;

        if (!word || !en || !hi) return null;

        // Change this line in your handleAdd function:
return {
  word,
  en,
  hi,
  image: image || null, // Set to null instead of DUMMY_IMAGE
};
      })
      .filter(Boolean);

    if (!entries.length) {
      alert("Please add at least one valid entry.");
      return;
    }

    onBulkAdd(entries);
    setText("");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-semibold text-lg">Bulk Add (Fast Mode)</h2>

      {/* INSTRUCTION */}
      <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
        <p className="font-semibold mb-1">📌 Give content in this format:</p>

        <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
Word | English Meaning | Hindi Meaning | Image URL (optional)
        </pre>

        <p className="mt-2 text-xs text-gray-700">
          👉 One entry per line. Image URL can be skipped (a dummy image will be
          used).
        </p>
      </div>

      {/* GPT PROMPT */}
      <div className="rounded border border-gray-200 bg-gray-50 p-3 text-sm">
        <p className="font-semibold mb-1">🤖 GPT Prompt (Copy & Use):</p>

        <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
Give content from the provided PDF image in this format:
Word | English Meaning | Hindi Meaning | Image URL
        </pre>
      </div>

      {/* TEXTAREA */}
      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Example:
Abandon | To leave completely | पूरी तरह छोड़ देना
Bilingual | Knowing two languages | दो भाषाओं का ज्ञान`}
        className="w-full border p-3 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* ACTION */}
      <button
        onClick={handleAdd}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-medium"
      >
        Add All Entries
      </button>
    </div>
  );
}
