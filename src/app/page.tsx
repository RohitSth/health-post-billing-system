"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MedalIcon as MedicineBotIcon, ReceiptIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Medical Billing System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MedicineBotIcon className="h-6 w-6" />
              Admin - Medicine Management
            </CardTitle>
            <CardDescription>
              Create, view, update, and delete medicines in the inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => router.push("/admin/medicines")}
            >
              Access Medicine Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ReceiptIcon className="h-6 w-6" />
              Staff - Billing Management
            </CardTitle>
            <CardDescription>
              Create and manage customer bills, charges, and medicine dispensing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => router.push("/staff/billing")}
            >
              Access Billing Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
