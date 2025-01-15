"use client";

import LayoutPage from "@/components/layouts/LayoutPage";
import Banner from "./landingpage/Banner";
import Promo from "./landingpage/Promo";
import { ProductPage } from "./landingpage/Product";
import { AboutPage } from "./landingpage/About";

export default function Home() {
  return (
    <>
      <LayoutPage>
        <div className="text-3xl font-bold">
          <Banner />
          <Promo />
          <ProductPage />
          <AboutPage />
        </div>
      </LayoutPage>
    </>
  );
}
