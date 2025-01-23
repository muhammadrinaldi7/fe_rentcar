"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <>
      <section className="w-full bg-primary-500">
        <div className="flex flex-col w-full h-full py-12 px-8">
          <div className="w-full lg:w-1/2">
            <h1 className="text-white text-3xl">
              Sewa mobil dan mulai perjalanan anda.
            </h1>
            <p className="text-white  text-sm">
              Mulai petualangan Anda sekarang, pilih mobil impian Anda dan
              nikmati perjalanan tanpa khawatir. Pengalaman berkendara yang tak
              terlupakan dimulai di sini.
            </p>
          </div>
          <Image
            data-aos="fade-left"
            src={"/hrv.png"}
            className="self-end hidden object-contain drop-shadow-lg lg:block animate-out absolute w-64 h-fit"
            alt="logo"
            width={1000}
            height={1000}
          />
        </div>
      </section>
    </>
  );
}
