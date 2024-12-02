// src/sjy_profile/services/pdfExportService.js
import jsPDF from 'jspdf';

const exportToPDF = (content) => {
  const doc = new jsPDF();
  doc.html(content, {
    callback: function (doc) {
      doc.save('portfolio.pdf');
    },
    x: 10,
    y: 10,
  });
};

export default {
  exportToPDF,
};
