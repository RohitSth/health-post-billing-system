"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Bill } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";

interface BillDetailsProps {
  bill: Bill;
  onClose: () => void;
}

export function BillDetails({ bill, onClose }: BillDetailsProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Bill Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">Invoice #{bill.id}</h3>
              <p className="text-muted-foreground">Date: {bill.date}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold">Customer</h3>
              <p>{bill.customerName}</p>
            </div>
          </div>

          {/* Charges Section */}
          {bill.charges.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Services & Charges</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bill.charges.map((charge) => (
                      <TableRow key={charge.id}>
                        <TableCell>{charge.description}</TableCell>
                        <TableCell className="text-right">
                          ${charge.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Medicines Section */}
          {bill.medicines.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Medicines</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bill.medicines.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell>{med.medicineName}</TableCell>
                        <TableCell>{med.quantity}</TableCell>
                        <TableCell>${med.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${med.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Totals Section */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${bill.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount:</span>
              <span>${bill.discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>${bill.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
