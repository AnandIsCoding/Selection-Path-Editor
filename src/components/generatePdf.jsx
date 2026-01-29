import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePdf(entries, pdfTitle = "One-Word-Substitution") {
  const input = document.getElementById("pdf-content");
  const pages = input.querySelectorAll(".relative.bg-white");
  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < pages.length; i++) {
    const editButtons = pages[i].querySelectorAll("button");
    editButtons.forEach(btn => btn.style.display = "none");

    const canvas = await html2canvas(pages[i], {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    editButtons.forEach(btn => btn.style.display = "block");

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    if (i < pages.length - 1) pdf.addPage();
  }

  pdf.save(`${pdfTitle}.pdf`);
}
