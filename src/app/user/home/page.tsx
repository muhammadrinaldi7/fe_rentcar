"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllCars } from "@/api/services/cars/useViewCars";
import { useFetchPromoActive } from "@/api/services/promos/useViewPromos";
import { ProductCard } from "@/components/cards/ProductCard";
import PromoCard from "@/components/cards/PromoCard";
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
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: promos, isLoading: isLoadingPromo } = useFetchPromoActive(
    endpoints.promosActive
  );
  const [currentPage, setCurrentPage] = useState(endpoints.cars);
  const { data: fetchCars, isLoading } = useFetchAllCars(currentPage);
  const handleMore = (page: string) => {
    setCurrentPage(page);
  };
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
          {isLoadingPromo ? (
            <Skeleton className="w-full col-span-3 h-36 bg-seccond-400" />
          ) : (
            <Carousel>
              <CarouselContent>
                {promos?.map((promo, index) => (
                  <CarouselItem key={index} className="lg:basis-1/3">
                    <PromoCard
                      code={promo.code}
                      desc={promo.description}
                      type={promo.discount_type}
                      value={promo.discount_value}
                      startDate={promo.start_date}
                      endDate={promo.end_date}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-seccond-400">Armada Kami</h1>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 justify-center items-center">
            {isLoading ? (
              <Skeleton className="w-full col-span-3 h-36 bg-seccond-400" />
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
          <div className="flex justify-center">
            <div className="flex gap-2">
              <Pagination>
                <PaginationContent className="gap-1 cursor-pointer">
                  {fetchCars?.links
                    .filter((link) => link.url !== null)
                    .map((link, index) => {
                      if (link.url) {
                        return (
                          <PaginationItem key={index}>
                            {link.label === "&laquo; Previous" ? (
                              <PaginationPrevious
                                className="hover:bg-white hover:text-black"
                                onClick={() => handleMore(link.url as string)}
                              />
                            ) : link.label === "Next &raquo;" ? (
                              <PaginationNext
                                className="hover:bg-white hover:text-black"
                                onClick={() => handleMore(link.url as string)}
                              />
                            ) : (
                              <PaginationLink
                                className="hover:bg-white hover:text-black"
                                isActive={link.active}
                                onClick={() => handleMore(link.url as string)}
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: link.label,
                                  }}
                                ></div>
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
