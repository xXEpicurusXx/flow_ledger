"use client";

import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useInvoice } from "@/app/context/invoice-context";
import { generatePDF } from "@/app/utils/pdf-generator";
import { formatDate } from "@/app/utils/formatters";
import { useState } from "react";
import Image from "next/image";

interface InvoicePreviewProps {
  onBack: () => void;
}

export default function InvoicePreview({ onBack }: InvoicePreviewProps) {
  const { invoice } = useInvoice();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDownloadPDF = async () => {
  const url = await generatePDF(invoice);
  if (url) setPdfUrl(url);
};

  const formatYen = (value: number) => {
    if (isNaN(value)) return "¥0";
    return `¥${Math.round(value).toLocaleString("ja-JP")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoice Preview</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={onBack}>
              Back to Edit
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {pdfUrl && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <iframe src={pdfUrl} width="100%" height="600px" />
          </div>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="relative w-full h-22">
              {/* Logo on the left */}
              <div className="absolute left-0 top-0 w-100 h-22">
                <Image
                  src="/Logo.webp"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Date on the right */}
              <p className="absolute right-0 top-6 text-sm text-gray-600">
                Date: {formatDate(invoice.date)}
              </p>
            </div>

            {/* Invoice Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
              <p className="text-gray-600">#{invoice.invoiceNumber}</p>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold mb-2">Site Address:</h3>
              <p className="text-gray-600">{invoice.siteAddress}</p>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">From:</h3>
                <p className="font-medium">{invoice.fromName}</p>
                <p className="text-gray-600">{invoice.fromEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">To:</h3>
                <p className="font-medium">{invoice.toName}</p>
                <p className="text-gray-600">{invoice.toEmail}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-2">Description</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.description}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">
                      {formatYen(typeof item.rate === "number" ? item.rate : 0)}
                    </td>
                    <td className="py-2 text-right">
                      {formatYen(
                        typeof item.amount === "number" ? item.amount : 0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatYen(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Tax (
                    {typeof invoice.taxRate === "number" ? invoice.taxRate : 0}
                    %):
                  </span>
                  <span>{formatYen(invoice.taxAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>{formatYen(invoice.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
