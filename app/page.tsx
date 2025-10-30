"use client";
import InvoiceForm from "@/components/invoice-form";
import InvoicePreview from "@/components/invoice-preview";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);

  if (showPreview) {
    return <InvoicePreview onBack={() => setShowPreview(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="relative w-100 h-22">
            <Image
              src="/Logo.webp"
              alt="Company Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Invoice</h1>
          <Button onClick={() => setShowPreview(true)} className="w-auto">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>

        <InvoiceForm />
      </div>
    </div>
  );
}

  // "invoice": "請求書",
  // "subtotal": "小計",
  // "total": "合計",
  // "tax": "税"