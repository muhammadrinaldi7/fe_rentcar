"use client";
import endpoints from "@/api/endpoints";
import { useBookTopPay } from "@/api/services/bookings/useViewBook";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ProcessPayment() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { data } = useBookTopPay(endpoints.bookToPay + params.id);
  const route = useRouter();
  console.log(data);
  const createXenditInvoice = async (id: number) => {
    const res = await fetch(endpoints.xenditCreatePayment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    return data.invoice_url; // Redirect ke halaman pembayaran Xendit
  };
  const handlePayment = async () => {
    try {
      setLoading(true); // ⏳ Set state loading
      if (!data?.id) throw new Error("Data ID tidak ditemukan");

      const invoiceUrl = await createXenditInvoice(data.id);

      if (invoiceUrl) {
        console.log("Invoice URL:", invoiceUrl);
        window.open(invoiceUrl, "_blank"); // 🔗 Buka di tab baru
      } else {
        throw new Error("Gagal mendapatkan invoice URL");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Terjadi kesalahan saat membuat pembayaran. Coba lagi!");
    } finally {
      setLoading(false); // ✅ Pastikan loading direset
      toast.success("Pembayaran Berhasil!");
      route.push("/user/bookings");
    }
  };
  return (
    <LayoutUser>
      <div className="flex gap-2 flex-col">
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-white">
          <h1 className="text-lg font-bold">Detail Transaksi</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <Image
                src={data?.car?.image_urls[0] || "/hrv.png"}
                alt="product"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full flex flex-col ">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Mobil</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {data?.car?.name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Price Per Day</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {data?.car?.price_per_day.toLocaleString("id-ID")}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Lama Sewa</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {data?.duration} Hari
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Total Price</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {data?.total_price.toLocaleString("id-ID")}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">
                    Discount Applied
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {data?.discount_applied.toLocaleString("id-ID")}
                  </dd>
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
          <div className="rounded-lg flex flex-col gap-3 bg-[#F6F7F9] p-4">
            <h1 className="text-lg font-bold">Total Pembayaran</h1>
            <p className="text-lg font-bold">
              Rp. {data?.final_price.toLocaleString("id-ID")}
            </p>
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Memproses..." : "Bayar Sekarang"}
            </button>
            <Button
              className="w-full hover:bg-gray-400 bg-white text-black shadow-lg hover:shadow-md"
              onClick={() => route.push("/user/bookings")}
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
