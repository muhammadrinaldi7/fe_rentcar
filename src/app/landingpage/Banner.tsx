import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <>
      <section className="w-full">
        <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-primary-500 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  The Best Platform for Car Rental
                </h2>

                <p className="hidden text-white/90 sm:mt-4 sm:block">
                  Ease of doing a car rental safely and reliably. Of course at a
                  low price.
                </p>

                <div className="mt-4 md:mt-8">
                  <Link
                    href="/product"
                    className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <Image
                alt="mobil"
                src="https://plus.unsplash.com/premium_photo-1664360971127-4afa228e90aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcnN8ZW58MHwxfDB8fHww"
                width={1000}
                height={1000}
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />

              <Image
                alt="Mobil"
                width={1000}
                height={1000}
                src="https://images.unsplash.com/photo-1507767439269-2c64f107e609?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
