import Footer from "./footer/page";
import Header from "./header/page";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-xl bg-[#F6F7F9]">{children}</div>
      <Footer />
    </>
  );
}
