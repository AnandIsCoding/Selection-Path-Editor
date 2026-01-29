export default function PdfPreview({ entries, onEdit, isPdfMode, titleColor, pdfTitle }) {
  const today = new Date().toLocaleDateString("en-GB");
  
  // Logic to split entries into chunks of 6
  const itemsPerPage = 8;
  const pages = [];
  for (let i = 0; i < entries.length; i += itemsPerPage) {
    pages.push(entries.slice(i, i + itemsPerPage));
  }

  // If no entries, show one empty page
  const displayPages = pages.length > 0 ? pages : [[]];

  return (
    <div id="pdf-content" className="flex flex-col gap-8 bg-gray-200 p-4">
      {displayPages.map((pageEntries, pageIndex) => (
        <div
          key={pageIndex}
          className="relative bg-white w-[794px] min-h-[1123px] p-10 font-serif shadow-lg mb-4"
        >
          {/* WATERMARK */}
          <img
            src="/watermark.jpeg"
            alt="watermark"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] opacity-10 z-0"
          />

        {/* HEADER - Only shows on Page 1 */}
{pageIndex === 0 && (
 <div className="relative z-10 mb-8 flex items-center justify-between rounded-lg border-l-4 border-blue-600 border-y border-r border-blue-200 bg-gradient-to-r from-blue-50 to-white px-6 py-5 shadow-sm">
  <div>
    <h2 className="text-lg font-bold tracking-tight text-blue-900 uppercase">
      Selection Path <span className="text-blue-600 font-medium text-sm normal-case ml-1">: Competitive English Coaching</span>
    </h2>
    <p className="text-xs italic font-medium text-blue-700/80 mb-2">
      "From Preparation To Selection"
    </p>
    <div className="flex flex-col gap-0.5 text-[13px] text-gray-600">
      <p className="flex items-center gap-1">
        📍 Madhav Niketan, Leader Club, Pani Tanki Chowk, Katihar
      </p>
      <p className="font-semibold text-gray-800">
        Guided by: <span className="text-blue-900">Aditya Jha</span>
      </p>
    </div>
  </div>

  <div className="text-right border-l border-blue-200 pl-6">
    <p className="text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1">Contact</p>
    <p className="flex items-center justify-end gap-1.5 text-md font-bold text-blue-900">
      <span className="text-blue-600">📞</span> 6205679886
    </p>
    <p className="text-[11px] text-gray-500 mt-1">{new Date().toLocaleDateString('en-GB')}</p>
  </div>
</div>
)}

          {/* TITLE */}
        <div className="relative z-10 text-center mb-10">
  {/* TITLE */}
  <h1
    className="text-[32px] font-extrabold tracking-wide underline underline-offset-4"
    style={{
      color: titleColor,
      textShadow: `
        1px 1px 0 rgba(0,0,0,0.25),
        2px 2px 0 rgba(0,0,0,0.15),
        3px 3px 0 rgba(0,0,0,0.08)
      `,
    }}
  >
    {pdfTitle || "ONE WORD SUBSTITUTION"}
  </h1>

  {/* DATE */}
  <p className="mt-2 text-[12px] tracking-widest uppercase text-gray-500">
    {today}
  </p>

  {/* SUBTLE DIVIDER */}
  <div className="mx-auto mt-3 h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
</div>



          {/* CONTENT */}
          <div className="space-y-6">
            {pageEntries.map((e, i) => {
              const globalIndex = pageIndex * itemsPerPage + i;
              return (
                <div
                  key={globalIndex}
                  className="relative z-10 grid grid-cols-[1fr_160px] gap-4 items-start border-b border-gray-100 pb-4"
                >
                  <div className="text-[15px] leading-6">
                    <p>
                      <span className="font-semibold">
                        {globalIndex + 1}. {e.word}
                      </span>{" "}
                      – {e.en}
                    </p>

                    <p className="mt-1 inline-block bg-blue-100 px-2 py-[2px] rounded text-[16px]">
                      {e.hi}
                    </p>

                    {!isPdfMode && (
                      <button
                        onClick={() => onEdit(globalIndex)}
                        className="mt-2 block text-xs text-blue-700 underline"
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </div>

                  {e.image && (
                    <img
                      src={e.image}
                      alt=""
                      crossOrigin="anonymous"
                      className="w-[150px] h-[100px] object-cover border"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* PAGE NUMBER */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
            Page {pageIndex + 1} of {displayPages.length}
          </div>
        </div>
      ))}
    </div>
  );
}