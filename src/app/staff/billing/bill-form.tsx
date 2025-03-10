"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type Bill,
  type Charge,
  type BillMedicine,
  medicines as allMedicines,
} from "@/lib/data";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BillFormProps {
  bill: Bill | null;
  onSave: (bill: Bill) => void;
  onCancel: () => void;
}

export function BillForm({ bill, onSave, onCancel }: BillFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [charges, setCharges] = useState<Charge[]>([]);
  const [medicines, setMedicines] = useState<BillMedicine[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // New charge and medicine state
  const [newCharge, setNewCharge] = useState<Charge>({
    id: "",
    description: "",
    amount: 0,
  });
  const [selectedMedicineId, setSelectedMedicineId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Initialize form with bill data if editing
  useEffect(() => {
    if (bill) {
      setCustomerName(bill.customerName);
      setDate(bill.date);
      setDiscount(bill.discount);
      setCharges([...bill.charges]);
      setMedicines([...bill.medicines]);
    } else {
      // Set default date to today for new bills
      const today = new Date().toISOString().split("T")[0];
      setCustomerName("");
      setDate(today);
      setDiscount(0);
      setCharges([]);
      setMedicines([]);
    }
  }, [bill]);

  // Calculate totals
  const calculateSubtotal = () => {
    const medicinesTotal = medicines.reduce((sum, med) => sum + med.total, 0);
    const chargesTotal = charges.reduce(
      (sum, charge) => sum + charge.amount,
      0
    );
    return medicinesTotal + chargesTotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  // Handle adding a new charge
  const handleAddCharge = () => {
    if (!newCharge.description.trim()) {
      setErrors((prev) => ({
        ...prev,
        chargeDescription: "Description is required",
      }));
      return;
    }

    if (newCharge.amount <= 0) {
      setErrors((prev) => ({
        ...prev,
        chargeAmount: "Amount must be greater than 0",
      }));
      return;
    }

    const chargeId = Date.now().toString();
    setCharges([...charges, { ...newCharge, id: chargeId }]);
    setNewCharge({ id: "", description: "", amount: 0 });
    setErrors((prev) => ({ ...prev, chargeDescription: "", chargeAmount: "" }));
  };

  // Handle removing a charge
  const handleRemoveCharge = (id: string) => {
    setCharges(charges.filter((charge) => charge.id !== id));
  };

  // Handle adding a medicine
  const handleAddMedicine = () => {
    if (!selectedMedicineId) {
      setErrors((prev) => ({
        ...prev,
        medicineId: "Please select a medicine",
      }));
      return;
    }

    if (selectedQuantity <= 0) {
      setErrors((prev) => ({
        ...prev,
        quantity: "Quantity must be greater than 0",
      }));
      return;
    }

    const medicine = allMedicines.find((med) => med.id === selectedMedicineId);

    if (medicine) {
      const medicineId = Date.now().toString();
      const total = medicine.price * selectedQuantity;

      setMedicines([
        ...medicines,
        {
          id: medicineId,
          medicineId: medicine.id,
          medicineName: medicine.name,
          quantity: selectedQuantity,
          unitPrice: medicine.price,
          total,
        },
      ]);

      setSelectedMedicineId("");
      setSelectedQuantity(1);
      setErrors((prev) => ({ ...prev, medicineId: "", quantity: "" }));
    }
  };

  // Handle removing a medicine
  const handleRemoveMedicine = (id: string) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (discount < 0) {
      newErrors.discount = "Discount cannot be negative";
    }

    if (charges.length === 0 && medicines.length === 0) {
      newErrors.items = "Add at least one charge or medicine";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const subtotal = calculateSubtotal();
      const total = calculateTotal();

      const newBill: Bill = {
        id: bill?.id || "",
        customerName,
        date,
        charges,
        medicines,
        subtotal,
        discount,
        total,
      };

      onSave(newBill);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{bill ? "Edit Bill" : "Create New Bill"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={errors.customerName ? "border-destructive" : ""}
              />
              {errors.customerName && (
                <p className="text-sm text-destructive">
                  {errors.customerName}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={errors.date ? "border-destructive" : ""}
              />
              {errors.date && (
                <p className="text-sm text-destructive">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Charges Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {charges.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {charges.map((charge) => (
                          <TableRow key={charge.id}>
                            <TableCell>{charge.description}</TableCell>
                            <TableCell>${charge.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveCharge(charge.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No charges added yet
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-end">
                  <div>
                    <Label htmlFor="chargeDescription">Description</Label>
                    <Input
                      id="chargeDescription"
                      value={newCharge.description}
                      onChange={(e) =>
                        setNewCharge({
                          ...newCharge,
                          description: e.target.value,
                        })
                      }
                      className={
                        errors.chargeDescription ? "border-destructive" : ""
                      }
                    />
                    {errors.chargeDescription && (
                      <p className="text-sm text-destructive">
                        {errors.chargeDescription}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="chargeAmount">Amount ($)</Label>
                    <Input
                      id="chargeAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newCharge.amount}
                      onChange={(e) =>
                        setNewCharge({
                          ...newCharge,
                          amount: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className={
                        errors.chargeAmount ? "border-destructive" : ""
                      }
                    />
                    {errors.chargeAmount && (
                      <p className="text-sm text-destructive">
                        {errors.chargeAmount}
                      </p>
                    )}
                  </div>

                  <Button type="button" onClick={handleAddCharge}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medicines Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Medicines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicines.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medicine</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {medicines.map((med) => (
                          <TableRow key={med.id}>
                            <TableCell>{med.medicineName}</TableCell>
                            <TableCell>{med.quantity}</TableCell>
                            <TableCell>${med.unitPrice.toFixed(2)}</TableCell>
                            <TableCell>${med.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveMedicine(med.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No medicines added yet
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-2 items-end">
                  <div>
                    <Label htmlFor="medicineSelect">Medicine</Label>
                    <Select
                      value={selectedMedicineId}
                      onValueChange={setSelectedMedicineId}
                    >
                      <SelectTrigger
                        className={
                          errors.medicineId ? "border-destructive" : ""
                        }
                      >
                        <SelectValue placeholder="Select a medicine" />
                      </SelectTrigger>
                      <SelectContent>
                        {allMedicines.map((medicine) => (
                          <SelectItem key={medicine.id} value={medicine.id}>
                            {medicine.name} - ${medicine.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.medicineId && (
                      <p className="text-sm text-destructive">
                        {errors.medicineId}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={selectedQuantity}
                      onChange={(e) =>
                        setSelectedQuantity(
                          Number.parseInt(e.target.value) || 1
                        )
                      }
                      className={errors.quantity ? "border-destructive" : ""}
                    />
                    {errors.quantity && (
                      <p className="text-sm text-destructive">
                        {errors.quantity}
                      </p>
                    )}
                  </div>

                  <Button type="button" onClick={handleAddMedicine}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Totals Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="discount">Discount:</Label>
                  <div className="w-[120px]">
                    <Input
                      id="discount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={discount}
                      onChange={(e) =>
                        setDiscount(Number.parseFloat(e.target.value) || 0)
                      }
                      className={`text-right ${
                        errors.discount ? "border-destructive" : ""
                      }`}
                    />
                  </div>
                </div>
                {errors.discount && (
                  <p className="text-sm text-destructive text-right">
                    {errors.discount}
                  </p>
                )}

                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {errors.items && (
            <p className="text-sm text-destructive">{errors.items}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {bill ? "Update Bill" : "Create Bill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
