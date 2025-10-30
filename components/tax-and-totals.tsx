import { useInvoice } from "@/app/context/invoice-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function TaxAndTotals() {
  const { invoice, updateInvoice } = useInvoice();

  const handleTaxRateChange = (value: string) => {
    if (value === "") {
      updateInvoice({ taxRate: "" });
    } else {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        updateInvoice({ taxRate: numValue });
      }
    }
  };

  const handleTaxRateBlur = () => {
    if (invoice.taxRate === "" || isNaN(Number(invoice.taxRate))) {
      updateInvoice({ taxRate: 0 });
    }
  };

  const formatYen = (value: number) => {
    if (isNaN(value)) return "¥0";
    return `¥${Math.round(value).toLocaleString("ja-JP")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax & Totals</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={invoice.taxRate}
            onChange={(e) => handleTaxRateChange(e.target.value)}
            onBlur={handleTaxRateBlur}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatYen(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Tax ({typeof invoice.taxRate === "number" ? invoice.taxRate : 0}
              %):
            </span>
            <span>{formatYen(invoice.taxAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>{formatYen(invoice.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
