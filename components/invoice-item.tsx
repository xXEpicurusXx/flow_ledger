import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useInvoice } from "@/app/context/invoice-context";
import type { InvoiceItem as InvoiceItemType } from "@/app/types/invoice";

interface InvoiceItemProps {
  item: InvoiceItemType;
  index: number;
  canRemove: boolean;
}

export default function InvoiceItem({
  item,
  index,
  canRemove,
}: InvoiceItemProps) {
  const { removeItem, updateItem } = useInvoice();

  const handleQuantityChange = (value: string) => {
    if (value === "") {
      updateItem(index, "quantity", "");
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "quantity", numValue);
      }
    }
  };

  const handleQuantityBlur = () => {
    if (item.quantity === "" || item.quantity === 0) {
      updateItem(index, "quantity", 1);
    }
  };

  const handleRateChange = (value: string) => {
    if (value === "") {
      updateItem(index, "rate", "");
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "rate", numValue);
      }
    }
  };

  const handleRateBlur = () => {
    if (item.rate === "") {
      updateItem(index, "rate", 0);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border rounded-lg items-end">
      <div className="col-span-5">
        <Label>Description</Label>
        <Input
          placeholder="Item description"
          value={item.description}
          onChange={(e) => updateItem(index, "description", e.target.value)}
        />
      </div>

      <div className="col-span-2">
        <Label>Quantity</Label>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleQuantityBlur}
        />
      </div>

      <div className="col-span-2">
        <Label>Rate</Label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={item.rate}
          onChange={(e) => handleRateChange(e.target.value)}
          onBlur={handleRateBlur}
        />
      </div>

      <div className="col-span-2">
        <Label>Amount</Label>
        <div className="px-3 border rounded-md bg-gray-50 flex items-center h-9 text-sm">
          ¥{typeof item.amount === "number" ? Math.round(item.amount) : 0}
        </div>
      </div>

      <div className="col-span-1 flex justify-center items-end pb-[2px]">
        <Button
          variant="outline"
          size="icon"
          onClick={() => removeItem(index)}
          disabled={!canRemove}
          className="flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
