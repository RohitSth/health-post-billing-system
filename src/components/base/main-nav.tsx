"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MedalIcon as MedicineBotIcon,
  ReceiptIcon,
  HomeIcon,
} from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: HomeIcon,
      active: pathname === "/",
    },
    {
      href: "/admin/medicines",
      label: "Medicines",
      icon: MedicineBotIcon,
      active: pathname.includes("/admin/medicines"),
    },
    {
      href: "/staff/billing",
      label: "Billing",
      icon: ReceiptIcon,
      active: pathname.includes("/staff/billing"),
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          <route.icon className="mr-2 h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
