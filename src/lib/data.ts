// Medicine types
export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  expiryDate: string;
}

// Billing types
export interface Charge {
  id: string;
  description: string;
  amount: number;
}

export interface BillMedicine {
  id: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Bill {
  id: string;
  customerName: string;
  date: string;
  charges: Charge[];
  medicines: BillMedicine[];
  subtotal: number;
  discount: number;
  total: number;
}

// Sample data
export const medicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    description: "Pain reliever and fever reducer",
    price: 5.99,
    stock: 100,
    category: "Pain Relief",
    expiryDate: "2025-12-31",
  },
  {
    id: "2",
    name: "Amoxicillin",
    description: "Antibiotic medication",
    price: 12.5,
    stock: 50,
    category: "Antibiotics",
    expiryDate: "2025-06-30",
  },
  {
    id: "3",
    name: "Loratadine",
    description: "Antihistamine for allergies",
    price: 8.75,
    stock: 75,
    category: "Allergy",
    expiryDate: "2026-03-15",
  },
  {
    id: "4",
    name: "Ibuprofen",
    description: "NSAID for pain and inflammation",
    price: 6.99,
    stock: 120,
    category: "Pain Relief",
    expiryDate: "2025-09-20",
  },
  {
    id: "5",
    name: "Omeprazole",
    description: "Proton pump inhibitor for acid reflux",
    price: 15.25,
    stock: 40,
    category: "Digestive Health",
    expiryDate: "2025-11-10",
  },
  {
    id: "6",
    name: "Simvastatin",
    description: "Statin medication for cholesterol",
    price: 22.5,
    stock: 30,
    category: "Cardiovascular",
    expiryDate: "2025-08-05",
  },
  {
    id: "7",
    name: "Metformin",
    description: "Oral diabetes medication",
    price: 18.99,
    stock: 45,
    category: "Diabetes",
    expiryDate: "2026-01-25",
  },
  {
    id: "8",
    name: "Lisinopril",
    description: "ACE inhibitor for blood pressure",
    price: 14.75,
    stock: 55,
    category: "Cardiovascular",
    expiryDate: "2025-10-15",
  },
  {
    id: "9",
    name: "Albuterol",
    description: "Bronchodilator for asthma",
    price: 25.99,
    stock: 25,
    category: "Respiratory",
    expiryDate: "2025-07-20",
  },
  {
    id: "10",
    name: "Levothyroxine",
    description: "Thyroid hormone replacement",
    price: 16.5,
    stock: 60,
    category: "Hormones",
    expiryDate: "2026-02-10",
  },
];

export const bills: Bill[] = [
  {
    id: "1",
    customerName: "John Doe",
    date: "2023-05-15",
    charges: [
      { id: "c1", description: "Doctor Consultation", amount: 50.0 },
      { id: "c2", description: "Blood Test", amount: 25.0 },
    ],
    medicines: [
      {
        id: "m1",
        medicineId: "1",
        medicineName: "Paracetamol",
        quantity: 2,
        unitPrice: 5.99,
        total: 11.98,
      },
      {
        id: "m2",
        medicineId: "3",
        medicineName: "Loratadine",
        quantity: 1,
        unitPrice: 8.75,
        total: 8.75,
      },
    ],
    subtotal: 95.73,
    discount: 5.0,
    total: 90.73,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    date: "2023-05-16",
    charges: [
      { id: "c3", description: "Doctor Consultation", amount: 50.0 },
      { id: "c4", description: "X-Ray", amount: 75.0 },
    ],
    medicines: [
      {
        id: "m3",
        medicineId: "2",
        medicineName: "Amoxicillin",
        quantity: 1,
        unitPrice: 12.5,
        total: 12.5,
      },
      {
        id: "m4",
        medicineId: "4",
        medicineName: "Ibuprofen",
        quantity: 1,
        unitPrice: 6.99,
        total: 6.99,
      },
    ],
    subtotal: 144.49,
    discount: 10.0,
    total: 134.49,
  },
  {
    id: "3",
    customerName: "Robert Johnson",
    date: "2023-05-17",
    charges: [{ id: "c5", description: "Doctor Consultation", amount: 50.0 }],
    medicines: [
      {
        id: "m5",
        medicineId: "5",
        medicineName: "Omeprazole",
        quantity: 1,
        unitPrice: 15.25,
        total: 15.25,
      },
    ],
    subtotal: 65.25,
    discount: 0.0,
    total: 65.25,
  },
];
