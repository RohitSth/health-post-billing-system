"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type Bill, bills as initialBills } from "@/lib/data";
import { BillForm } from "./bill-form";
import { Plus, Search, Pencil, Trash2, FileText } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BillDetails } from "./bill-details";

export default function BillingPage() {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [viewingBill, setViewingBill] = useState<Bill | null>(null);

  const itemsPerPage = 5;

  // Filter bills based on search term
  const filteredBills = bills.filter(
    (bill) =>
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBills = filteredBills.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle bill creation and update
  const handleSaveBill = (bill: Bill) => {
    if (editingBill) {
      // Update existing bill
      setBills(bills.map((b) => (b.id === bill.id ? bill : b)));
    } else {
      // Create new bill with a unique ID
      const newBill = {
        ...bill,
        id: Date.now().toString(),
      };
      setBills([...bills, newBill]);
    }
    setIsFormOpen(false);
    setEditingBill(null);
  };

  // Handle bill deletion
  const handleDeleteBill = (id: string) => {
    setBills(bills.filter((bill) => bill.id !== id));
  };

  // Open form for editing
  const handleEdit = (bill: Bill) => {
    setEditingBill(bill);
    setIsFormOpen(true);
  };

  // Open form for creating
  const handleCreate = () => {
    setEditingBill(null);
    setIsFormOpen(true);
  };

  // View bill details
  const handleViewDetails = (bill: Bill) => {
    setViewingBill(bill);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Billing Management</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create New Bill
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bills by customer name..."
            className="pl-8"
            value={searchTerm}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBills.length > 0 ? (
              paginatedBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.customerName}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {bill.medicines.length + bill.charges.length} items
                  </TableCell>
                  <TableCell>${bill.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(bill)}
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(bill)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this bill from the
                              system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBill(bill.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No bills found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {isFormOpen && (
        <BillForm
          bill={editingBill}
          onSave={handleSaveBill}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingBill(null);
          }}
        />
      )}

      {viewingBill && (
        <BillDetails bill={viewingBill} onClose={() => setViewingBill(null)} />
      )}
    </div>
  );
}
