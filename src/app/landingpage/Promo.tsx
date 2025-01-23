import { PromoCard } from "@/components/cards/PromoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Promo() {
  return (
    <>
      <section id="promo" className="mx-auto py-8">
        <div className="flex w-full flex-col justity-center items-center px-12 md:px-8">
          <Carousel className="w-full mt-4">
            <CarouselContent className="w-full py-2">
              <CarouselItem className="md:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <PromoCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <PromoCard />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </>
  );
}
