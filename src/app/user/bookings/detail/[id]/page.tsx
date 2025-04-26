"use client";
import endpoints from "@/api/endpoints";
import { useFetchDetailCar } from "@/api/services/cars/useViewCars";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import LoadingSpinner from "@/components/loading/LoadingSpin";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DetailCar() {
  const params = useParams();
  const { data: detailMobil, isLoading } = useFetchDetailCar(
    endpoints.detailCar + params.id
  );
  return (
    <LayoutUser>
      <div className="flex flex-col gap-2">
        <h1 className="text-seccond-400">Detail Mobil</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/user/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail {detailMobil?.data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="rounded-lg w-full gap-4 flex flex-col lg:flex-row p-4 bg-white shadow-sm shadow-indigo-100">
          <div className="w-full lg:w-1/2">
            <Carousel className="w-full h-full flex justify-center p-3 items-center">
              <CarouselContent>
                {isLoading ? (
                  <CarouselItem>
                    <LoadingSpinner />
                  </CarouselItem>
                ) : (
                  detailMobil?.data?.image_urls.map((image, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={image}
                        alt="cars"
                        width={1000}
                        height={1000}
                        className="w-full object-contain drop-shadow-lg rounded-2xl h-full"
                      />
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex  items-center">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Nama Mobil</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {detailMobil?.data?.name}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Harga Per hari</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  Rp. {detailMobil?.data?.price_per_day.toLocaleString("id-ID")}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Transmissi</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {detailMobil?.data?.transmission}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Tahun</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {detailMobil?.data?.year}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Bensin/Kapasitas</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {detailMobil?.data?.fuel} Batang /
                  {detailMobil?.data?.capacity} Orang
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
