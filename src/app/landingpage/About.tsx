import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  faCar,
  faPhoneVolume,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccordionItem } from "@radix-ui/react-accordion";

export const AboutPage = () => {
  return (
    <section className="py-2 px-4">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col p-6 gap-4 bg-blue-600 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-32 items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-blue-200 text-x;">Our Service</h1>
              <p className="text-white text-4xl">
                Our Premier Service for your car rental needs
              </p>
            </div>
            <p className="text-sm text-info-400  lg:w-1/2 ">
              We take pride in providing top-notch solutions! Our premier
              services ensure a seamless & simple car rental experience.
              Offering cars that suit your prefences.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex bg-white p-4 rounded-2xl flex-col basis-1/3 gap-4">
              <div className="flex justify-center">
                <div className="rounded-full p-2 bg-blue-600">
                  <div className="rounded-full bg-blue-500 px-3 py-2">
                    <FontAwesomeIcon
                      icon={faCar}
                      className="text-3xl text-white"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-lg text-info-600 mt-3">
                Well-maintananed Cars
              </h1>
              <p className="text-sm text-info-400">
                Enjoy your trip in peace and comfort with our car rental which
                offers a well-maintananed fleet, prioritized the health and
                safety of our vehicles.
              </p>
            </div>
            <div className="flex bg-white p-4 rounded-2xl flex-col basis-1/3 gap-4">
              <div className="flex justify-center">
                <div className="rounded-full p-2 bg-blue-600">
                  <div className="rounded-full bg-blue-500 px-3 py-2">
                    <FontAwesomeIcon
                      icon={faShield}
                      className="text-3xl text-white"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-lg text-info-600 mt-3">Secure Payments</h1>
              <p className="text-sm text-info-400">
                With a safe and reliable payment system, you can continue your
                journey with peace of mind, without worrying about transaction
                security.
              </p>
            </div>
            <div className="flex bg-white p-4 rounded-2xl flex-col basis-1/3 gap-4">
              <div className="flex justify-center">
                <div className="rounded-full p-2 bg-blue-600">
                  <div className="rounded-full bg-blue-500 px-3 py-2">
                    <FontAwesomeIcon
                      icon={faPhoneVolume}
                      className="text-2xl text-white"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-lg text-info-600 mt-3">24/7 Support</h1>
              <p className="text-sm text-info-400">
                We understand that the journey doesn&apos;t always run smoothly.
                Therefore our costumer support team is ready to help you 24/7.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Syarat dan Ketentuan ?</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside">
                  <li>Jaminan Motor + STNK Minimal Tahun 2015 (Dititipkan)</li>
                  <li>Wajib Memiliki SIM A</li>
                  <li>Menunjukan Data Diri Lain (KTP/KK/SIM C/NPWP)</li>
                  <li>Pembayaran Sewa Mobil Di Bayar Full</li>
                  <li>Penyewa Mobil Wajib Di Foto Saat Pengambilan Unit</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
