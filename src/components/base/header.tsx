import { MainNav } from "./main-nav";
import { Stethoscope } from "lucide-react";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center font-bold text-xl mr-4">
          <Stethoscope className="mr-2 h-6 w-6" />
          MedBill
        </div>
        <MainNav />
      </div>
    </div>
  );
}
