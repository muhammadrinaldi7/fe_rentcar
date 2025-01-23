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
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  BookPayload,
  useActionBook,
} from "@/api/services/bookings/useActionBook";
export default function CreateBooking() {
  const params = useParams();
  const route = useRouter();
  const { applyPromo } = useActionBook(endpoints.applyPromo);
  const { data: detailMobil } = useFetchDetailCar(
    endpoints.detailCar + params.id
  );
  const { createBook } = useActionBook(endpoints.createBook);
  const [price, setPrice] = useState<number>(
    detailMobil?.data.price_per_day || 0
  );
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [payload, setPayload] = useState<BookPayload>({
    car_id: Number(params.id),
    promo_code: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (payload.start_date && payload.end_date) {
      calculatePrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.start_date, payload.end_date]);

  console.log(price);
  const handleClickPromo = () => {
    applyPromo(
      { promo_code: payload.promo_code, total_price: price },
      {
        onSuccess: (data) => {
          console.log(data);
          setFinalPrice(data.final_price);
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const calculatePrice = () => {
    if (payload.start_date && payload.end_date && detailMobil) {
      const start = new Date(payload.start_date);
      const end = new Date(payload.end_date);

      // Menghitung jumlah hari sewa
      const durationInMilliseconds = end.getTime() - start.getTime();
      const durationInDays = Math.ceil(
        durationInMilliseconds / (1000 * 3600 * 24)
      );

      // Menghitung harga berdasarkan durasi sewa
      const totalPrice = durationInDays * detailMobil.data.price_per_day;

      setPrice(totalPrice);
      setFinalPrice(totalPrice);
      setPayload((prev) => ({
        ...prev,
        final_price: totalPrice,
        total_price: totalPrice,
      }));
    }
  };
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    createBook(payload, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Booking Berhasil");
        route.push("/user/payments/pay/" + data.data.id);
      },
    });
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
                  value={payload.promo_code}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      promo_code: e.target.value,
                    })
                  }
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
            <form
              onSubmit={handleCreateBooking}
              className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            >
              <div className="flex w-full flex-col gap-2">
                <label>Dari Tanggal</label>
                <input
                  type="datetime-local"
                  onChange={(e) =>
                    setPayload({ ...payload, start_date: e.target.value })
                  }
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors"
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <label>Sampai Tanggal</label>
                <input
                  type="datetime-local"
                  onChange={(e) =>
                    setPayload({ ...payload, end_date: e.target.value })
                  }
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
                <Button type="submit" className="bg-primary-500 text-white">
                  Submit
                </Button>
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
