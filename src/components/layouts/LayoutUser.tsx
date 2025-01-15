import Footer from "./footer/page";
import { HeaderUser } from "./header/HeaderUser";

export const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderUser />
      <div className="mx-auto w-full bg-[#F6F7F9] px-6 lg:px-16">
        {children}
      </div>
      <Footer />
    </>
  );
};