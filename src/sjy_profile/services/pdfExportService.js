// pdfExportService.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// iframe의 내용을 캡처하고 PDF로 저장하는 함수
export async function captureIframe(iframe) {
  if (!iframe || !iframe.contentDocument) {
    throw new Error('잘못된 iframe입니다.');
  }

  const doc = iframe.contentDocument;

  // 이미지 로딩이 완료될 때까지 대기
  const images = doc.querySelectorAll('img');
  const imagePromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
      }
    });
  });

  await Promise.all(imagePromises);

  // html2canvas를 사용하여 iframe 내용을 캡처
  const canvas = await html2canvas(doc.body, {
    useCORS: true,
  });

  // jsPDF를 사용하여 PDF 생성
  const pdf = new jsPDF();
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);

  // PDF 저장
  pdf.save('portfolio.pdf');
}
