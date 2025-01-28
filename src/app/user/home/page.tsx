"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllCars } from "@/api/services/cars/useViewCars";
import { useFetchPromoActive } from "@/api/services/promos/useViewPromos";
import { ProductCard } from "@/components/cards/ProductCard";
import PromoCard from "@/components/cards/PromoCard";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: promos } = useFetchPromoActive(endpoints.promosActive);
  const [perPage, setPerPage] = useState(5);
  const {
    data: fetchCars,
    isLoading,
    refetch,
  } = useFetchAllCars(endpoints.cars + `?perPage=${perPage}`);

  const handleMore = () => {
    setPerPage(perPage + 5);
    refetch();
  };
  console.log(fetchCars);
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
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-seccond-400">Armada Kami</h1>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 justify-center items-center">
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
            <Button onClick={handleMore}>More</Button>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
