import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useInvoice } from "@/app/context/invoice-context";
// import { useInvoice } from "@/context/invoice-context";

export default function BasicDetails() {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            id="invoiceNumber"
          />
        </div>
        
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => updateInvoice({ date: e.target.value })}
            value={invoice.date}
          />
        </div>
        <div>
            <Label htmlFor="siteAddress">Site Address</Label>
            <Input
              id="siteAddress"
              value={invoice.siteAddress}
              onChange={(e) => updateInvoice({ siteAddress: e.target.value })}
              placeholder="Site Address"
            />
          </div>
      </CardContent>
    </Card>
  );
}