import { jsPDF } from "jspdf";
import { InvoiceData } from "../types/invoice";
// @ts-ignore
import { NotoSansJPRegular } from "./fonts/NotoSansJP-Regular";

export const generatePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF();

  // Register the Japanese font
  doc.addFileToVFS("NotoSansJP-Regular.ttf", NotoSansJPRegular);
  doc.addFont("NotoSansJP-Regular.ttf", "NotoSansJP", "normal");
  doc.setFont("NotoSansJP");

  const formatYen = (value: number) =>
    `¥${Math.round(value).toLocaleString("ja-JP")}`;

  let y = 30;

  doc.setFontSize(24);
  doc.text("INVOICE", 20, y);
  doc.setFontSize(12);
  doc.text(
    `Date: ${new Date(invoice.date).toLocaleDateString("ja-JP")}`,
    150,
    y
  );
  y += 10;
  doc.text(`#${invoice.invoiceNumber}`, 20, y);
  y += 15;

  doc.setFontSize(10);
  doc.text(`Site Address :  ${invoice.siteAddress}`, 20, y);
  y += 20;

  doc.setFontSize(14);
  doc.text("From:", 20, y);
  doc.text("To:", 120, y);
  y += 10;

  doc.setFontSize(10);
  doc.text(invoice.fromName, 20, y);
  doc.text(invoice.toName, 120, y);
  y += 6;
  doc.text(invoice.fromEmail, 20, y);
  doc.text(invoice.toEmail, 120, y);
  y += 20;

  doc.setFontSize(10);
  doc.text("Description", 20, y);
  doc.text("Qty", 120, y);
  doc.text("Rate", 140, y);
  doc.text("Amount", 160, y);
  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  invoice.items.forEach((item) => {
    doc.text(item.description, 20, y);
    doc.text(item.quantity.toString(), 120, y);
    doc.text(formatYen(Number(item.rate)), 140, y);
    doc.text(formatYen(item.amount), 160, y);
    y += 8;
  });

  y += 10;
  doc.line(140, y, 190, y);
  y += 10;

  doc.text("Subtotal:", 140, y);
  doc.text(formatYen(invoice.subtotal), 160, y);
  y += 8;
  doc.text(`Tax (${invoice.taxRate}%):`, 140, y);
  doc.text(formatYen(invoice.taxAmount), 160, y);
  y += 8;
  doc.setFontSize(12);
  doc.text("Total:", 140, y);
  doc.text(formatYen(invoice.total), 160, y);

  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};
