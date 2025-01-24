"use client";
import endpoints from "@/api/endpoints";
import { useFetchPromoActive } from "@/api/services/promos/useViewPromos";
import PromoCard from "@/components/cards/PromoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Promo() {
  const { data: promos } = useFetchPromoActive(endpoints.promosActive);
  return (
    <>
      <section id="promo" className="mx-auto py-8">
        <div className="flex w-full flex-col justity-center items-center px-12 md:px-8">
          <Carousel className="w-full mt-4">
            <CarouselContent className="w-full py-2">
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
      </section>
    </>
  );
}
