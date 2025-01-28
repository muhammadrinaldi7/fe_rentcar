"use client";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProcessPayment() {
  const params = useParams();
  console.log(params);
  return (
    <LayoutUser>
      <div className="flex gap-2 flex-col">
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-white">
          <h1 className="text-lg font-bold">Detail Transaksi</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <Image
                src="/hrv.png"
                alt="product"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Mobil</dt>
                  <dd className="text-gray-700 sm:col-span-2">Mr</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    John Frusciante
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Occupation</dt>
                  <dd className="text-gray-700 sm:col-span-2">Guitarist</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Salary</dt>
                  <dd className="text-gray-700 sm:col-span-2">$1,000,000+</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Bio</dt>
                  <dd className="text-gray-700 sm:col-span-2"></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
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
