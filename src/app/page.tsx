"use client";

import LayoutPage from "@/components/layouts/LayoutPage";
import Banner from "./landingpage/Banner";
import Promo from "./landingpage/Promo";
import { ProductPage } from "./landingpage/Product";
import { AboutPage } from "./landingpage/About";
import { useEffect } from "react";
import AOS from "aos";
export default function Home() {
  useEffect(() => {
    AOS.init({
      easing: "ease-out",
      duration: 2000, // Durasi animasi dalam milidetik
      once: false,
      delay: 0,
    });
  }, []);
  return (
    <>
      <LayoutPage>
        <div className="text-3xl font-bold">
          <Banner />
          <ProductPage />
          <Promo />
          <AboutPage />
        </div>
      </LayoutPage>
    </>
  );
}
