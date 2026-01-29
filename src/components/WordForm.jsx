import { useEffect, useState } from "react";

export default function WordForm({ onSubmit, editingEntry, cancelEdit }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editingEntry) {
      document.forms.wordForm.word.value = editingEntry.word;
      document.forms.wordForm.en.value = editingEntry.en;
      document.forms.wordForm.hi.value = editingEntry.hi;
      document.forms.wordForm.imageUrl.value = editingEntry.image || "";
      setPreview(editingEntry.image || null);
    } else {
      setPreview(null);
    }
  }, [editingEntry]);

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // This is the Base64 string
        document.forms.wordForm.imageUrl.value = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;

    const entry = {
      word: f.word.value,
      en: f.en.value,
      hi: f.hi.value,
      image: f.imageUrl.value || null,
    };

    onSubmit(entry);
    setPreview(null);
    f.reset();
  };

  return (
    <form
      name="wordForm"
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <h2 className="font-semibold text-lg text-blue-900 border-b pb-1">
        {editingEntry ? "✏️ Edit Entry" : "➕ Add New Word"}
      </h2>

      <div className="grid grid-cols-1 gap-3">
        <input name="word" placeholder="Word (e.g. Abandon)" className="input" required />
        <input name="en" placeholder="English Meaning" className="input" required />
        <input name="hi" placeholder="Hindi Meaning" className="input" required />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Image Option</label>
        <div className="flex flex-col gap-2">
          {/* File Upload */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          <div className="text-center text-xs text-gray-400">OR</div>
          
          {/* URL Input */}
          <input
            name="imageUrl"
            placeholder="Paste Image URL instead"
            className="input"
            onChange={(e) => setPreview(e.target.value)}
          />
        </div>
      </div>

      {/* Image Preview Thumbnail */}
      {preview && (
        <div className="relative mt-2 border rounded p-1 bg-gray-50 w-fit">
          <img src={preview} alt="Preview" className="h-20 w-32 object-cover rounded" />
          <button 
            type="button" 
            onClick={() => { setPreview(null); document.forms.wordForm.imageUrl.value = ""; }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded font-bold shadow-md transition-all"
        >
          {editingEntry ? "Update Entry" : "Save Entry"}
        </button>

        {editingEntry && (
          <button
            type="button"
            onClick={() => { setPreview(null); cancelEdit(); }}
            className="flex-1 bg-gray-400 text-white py-2 rounded shadow-md"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}