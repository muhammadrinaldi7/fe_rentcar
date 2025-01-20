"use client";
import endpoints from "@/api/endpoints";
import { useFetchDetailCar } from "@/api/services/cars/useViewCars";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import {
  faGasPump,
  faGears,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TokenSession } from "@/middleware";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFetchPromoActive } from "@/api/services/promos/useViewPromos";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
export default function CreateBooking() {
  const params = useParams();
  const token = Cookies.get("token");
  const { data: promoActive } = useFetchPromoActive(endpoints.promosActive);
  const { data: detailMobil } = useFetchDetailCar(
    endpoints.detailCar + params.id
  );

  const [user, setUser] = useState<TokenSession | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [typeDiscount, setTypeDiscount] = useState<string>("");
  const [valueDiscount, setValueDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>("");

  useEffect(() => {
    try {
      const user = jwtDecode(token || "") as TokenSession;
      setUser(user);
    } catch (error) {
      console.error("Gagal mendekode token:", error);
    }
  }, [token]);

  useEffect(() => {
    if (startDate && endDate) {
      calculatePrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, promoCode]);

  const handleChangePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const promoInput = e.target.value.trim().toUpperCase(); // Memastikan promo code dalam format yang konsisten

    setPromoCode(promoInput);

    // Mencari promo yang sesuai dengan promo code yang dimasukkan
    const selectedPromo = promoActive?.find(
      (promo) => promo.code.toUpperCase() === promoInput // Bandingkan dalam format uppercase agar case-insensitive
    );
    if (selectedPromo) {
      setTypeDiscount(selectedPromo.discount_type);
      setValueDiscount(selectedPromo.discount_value);
    } else {
      setTypeDiscount("");
      setValueDiscount(0);
    }
  };
  const handleClickPromo = () => {
    const selectedPromo = promoActive?.find(
      (promo) => promo.code.toUpperCase() === promoCode // Bandingkan dalam format uppercase agar case-insensitive
    );
    if (selectedPromo) {
      let discount = 0;
      // Cek apakah ada promo code
      if (promoCode) {
        // discount = totalPrice * 0.5; // Diskon 50% jika kode promo sesuai
        switch (typeDiscount) {
          case "%":
            discount = (price * valueDiscount) / 100;
            break;
          case "fixed":
            discount = valueDiscount;
            break;
        }
      }
      // Hitung harga final setelah diskon
      const final = price - discount;
      setFinalPrice(final);
      toast.success("Promo Berhasil Ditambahkan");
    } else {
      toast.error("Promo Tidak Ditemukan");
    }
  };

  const calculatePrice = () => {
    if (startDate && endDate && detailMobil) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Menghitung jumlah hari sewa
      const durationInMilliseconds = end.getTime() - start.getTime();
      const durationInDays = Math.ceil(
        durationInMilliseconds / (1000 * 3600 * 24)
      );

      // Menghitung harga berdasarkan durasi sewa
      const totalPrice = durationInDays * detailMobil.data.price_per_day;

      setPrice(totalPrice);
      setFinalPrice(totalPrice);
    }
  };

  return (
    <>
      <LayoutUser>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="block lg:w-2/6 lg:order-2 rounded-lg p-4 bg-white shadow-sm shadow-indigo-100">
            <Image
              alt=""
              width={1000}
              height={1000}
              src={detailMobil?.data?.image_urls[0] || "/tesla.png"}
              className="h-56 w-full rounded-md object-contain"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dt className="sr-only">Price</dt>

                  <dd className="text-sm flex gap-4 text-gray-500">
                    <p>Price : </p>
                    Rp.{" "}
                    {detailMobil?.data?.price_per_day.toLocaleString("id-ID")}
                    /Hari
                  </dd>
                </div>

                <div>
                  <dt className="sr-only">Address</dt>

                  <dd className="font-medium">
                    {detailMobil?.data?.brand} {detailMobil?.data?.name}
                  </dd>
                </div>
              </dl>

              <div className="mt-3 flex mb-3 items-center gap-8 text-xs">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    className="size-4 text-info-600"
                  />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Capacity</p>

                    <p className="font-medium">
                      {detailMobil?.data?.capacity} Orang
                    </p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <FontAwesomeIcon
                    icon={faGears}
                    className="size-4 text-info-600"
                  />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Transmission</p>

                    <p className="font-medium">
                      {detailMobil?.data?.transmission}
                    </p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <FontAwesomeIcon
                    icon={faGasPump}
                    className="size-4 text-info-600"
                  />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Fuel</p>

                    <p className="font-medium">{detailMobil?.data?.fuel} Bar</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Insert Promo Code"
                  className=" bg-[#F6F7F9] border-[#F6F7F9] text-seccond-400 font-semibold"
                  value={promoCode.toUpperCase()}
                  onChange={handleChangePromo}
                />
                <span className="absolute inset-y-0 end-10 grid w-10 place-content-center">
                  <Button
                    onClick={handleClickPromo}
                    className="bg-none border-none font-semibold outline-none shadow-none"
                  >
                    Apply Now
                  </Button>
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 lg:w-4/6 lg:order-1 flex flex-col gap-4 bg-white rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">Create Booking</h1>
              <p className="text-primary-500 text-sm">Step 1</p>
            </div>
            <form action="" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <Input type="text" value={user ? user.email : ""} readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Nama</label>
                <Input type="text" value={user ? user.name : ""} readOnly />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label>Dari Tanggal</label>
                <input
                  type="datetime-local"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors"
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <label>Sampai Tanggal</label>
                <input
                  type="datetime-local"
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Price</label>
                <Input
                  type="text"
                  value={price.toLocaleString("id-ID")}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Final Price</label>
                <Input
                  type="text"
                  value={finalPrice.toLocaleString("id-ID")}
                  readOnly
                />
              </div>

              <div className="flex self-end gap-2">
                <Button className="bg-primary-500 text-white">Submit</Button>
                <Link href="/user/home">
                  <Button className="bg-red-500 text-white">Cancel</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </LayoutUser>
    </>
  );
}
