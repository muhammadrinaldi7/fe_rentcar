"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllCars } from "@/api/services/cars/useViewCars";
import { ProductCard } from "@/components/cards/ProductCard";
import { PromoCard } from "@/components/cards/PromoCard";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

export default function Home() {
  const { data: fetchCars, isLoading } = useFetchAllCars(endpoints.cars);
  return (
    <LayoutUser>
      <div className="flex py-8 flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-seccond-400">Promo</h1>
            <Link href="/user/promo">
              <p className="text-primary-500">See All</p>
            </Link>
          </div>
          <Carousel>
            <CarouselContent>
              <CarouselItem className="lg:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="lg:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="lg:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="lg:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="lg:basis-1/3">
                <PromoCard />
              </CarouselItem>
              {/* <CarouselItem className="lg:basis-1/3">
                <ProductCard
                  image="https://images.unsplash.com/photo-1643792773771-8171455aaaf9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  title="Innova Reborn"
                  type="Family Car"
                  transmission="Automatic"
                  capacity="4"
                  fuel="70"
                  price={350000}
                />
              </CarouselItem> */}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-seccond-400">Armada Kami</h1>
            <Link href="/user/promo">
              <p className="text-primary-500">See All</p>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center">
            {isLoading ? (
              <p>Loading...</p>
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
          <div className="flex items-center justify-center px-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
