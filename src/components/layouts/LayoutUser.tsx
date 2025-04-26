import Footer from "./footer/page";
import Header from "./header/page";
// import { HeaderUser } from "./header/HeaderUser";

export const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="mx-auto container w-full bg-[#F6F7F9] px-6 py-3 lg:px-16">
        {children}
      </div>
      <Footer />
    </>
  );
};
