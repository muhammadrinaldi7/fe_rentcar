"use client";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

export default function ProcessPayment() {
  const params = useParams();
  console.log(params);
  return (
    <LayoutUser>
      <div className="flex flex-col">
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Proses Pembayaran</h1>
            <p className="text-primary-500 text-sm">Step 2</p>
          </div>
          <div className="rounded-lg bg-[#F6F7F9] p-4">
            <Input
              type="text"
              placeholder="Promo Code"
              className="text-white"
            />
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
