"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllCars } from "@/api/services/cars/useViewCars";
import { ProductCard } from "@/components/cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
export const ProductPage = () => {
  const { data: fetchCars, isLoading } = useFetchAllCars(endpoints.cars);
  return (
    <>
      <section id="product" className="w-full py-4 px-8">
        <div className="flex flex-col gap-6 w-full">
          <Carousel className="w-full">
            <CarouselContent className="">
              {[
                "/toyotan.png",
                "/Wuling.png",
                "/suzuki.png",
                "/tesla.png",
                "/mercedes.png",
                "/honda.png",
                "/hyundai.png",
                "/jeep.png",
                "/kia.png",
                "/lexus.png",
                "/mitsubishi.png",
                "/nissan.png",
              ].map((src, index) => (
                <CarouselItem key={index} className="basis-1/3 lg:basis-1/6">
                  <div data-aos="fade-up" className="w-24 h-24">
                    <Image
                      width={1000}
                      height={1000}
                      src={src}
                      alt={`Logo ${index + 1}`}
                      className="w-full h-full object-contain grayscale hover:grayscale-0"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Link href="/user/home" className="self-end">
            {" "}
            <p className="text-sm text-primary-500 font-bold ">See All</p>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
            {isLoading ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] bg-seccond-400 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 bg-seccond-400 w-[250px]" />
                  <Skeleton className="h-4 bg-seccond-400 w-[200px]" />
                </div>
              </div>
            ) : (
              fetchCars?.data.map((car, index) => (
                <ProductCard
                  key={index}
                  id={car.id}
                  image={car.image_urls[0]}
                  available={car.available}
                  title={car.name}
                  type={car.model}
                  transmission={car.transmission}
                  capacity={car.capacity}
                  fuel={car.fuel}
                  price={car.price_per_day}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

// {
//   [
//     "/toyotan.png",
//     "/Wuling.png",
//     "/suzuki.png",
//     "/tesla.png",
//     "/mercedes.png",
//     "/honda.png",
//     "/hyundai.png",
//     "/jeep.png",
//     "/kia.png",
//     "/lexus.png",
//     "/mitsubishi.png",
//     "/nissan.png",
//   ].map((src, index) => (
//     <div key={index} className="w-24 h-24">
//       <Image
//         width={1000}
//         height={1000}
//         src={src}
//         alt={`Logo ${index + 1}`}
//         className="w-full h-full object-contain grayscale hover:grayscale-0"
//       />
//     </div>
//   ));
// }
