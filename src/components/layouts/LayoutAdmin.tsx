"use client";
import Link from "next/link";
import Footer from "./footer/page";
import { HeaderAdmin } from "./header/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faFileInvoice,
  faHouse,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export const LayoutAdmin = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const router = useRouter();
  const onLogout = () => {
    toast(
      () => (
        <div className="rounded-lg p-2">
          <h2 className="text-lg font-bold">
            Are you sure you want to Log Out?
          </h2>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleLogout}
              type="button"
              className="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => toast.dismiss()}
              className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
            >
              No, go back
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 3000,
      }
    );
  };
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
    toast.dismiss();
  };
  return (
    <>
      <HeaderAdmin />
      <div className="mx-auto container w-full flex justify-start bg-[#F6F7F9]">
        <div className="w-1/6  hidden h-full py-4 px-6 justify-between lg:flex flex-col gap-32 bg-white">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-sm text-seccond-400">Main Menu</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/admin/dashboard">
                  <div
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm ${
                      title === "Dashboard"
                        ? "bg-primary-500 text-white shadow-md"
                        : "text-seccond-400"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHouse} className="size-4" />
                    <p className="text-center mt-1">Dashboard</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin/cars">
                  <div
                    className={` flex items-center gap-2 px-2 py-2 rounded-lg text-sm ${
                      title === "Cars"
                        ? "bg-primary-500 text-white shadow-md"
                        : "text-seccond-400"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCar} className="size-4" />
                    <p className="text-center mt-1">Cars</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <div
                    className={` flex items-center gap-2 px-2 py-2 rounded-lg text-sm ${
                      title === "Transaction"
                        ? "bg-primary-500 text-white shadow-md"
                        : "text-seccond-400"
                    }`}
                  >
                    <FontAwesomeIcon icon={faFileInvoice} className="size-4" />
                    <p className="text-center mt-1">Transaction</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <div
                    className={` flex items-center gap-2 px-2 py-2 rounded-lg text-sm ${
                      title === "Users"
                        ? "bg-primary-500 text-white shadow-md"
                        : "text-seccond-400"
                    }`}
                  >
                    <FontAwesomeIcon icon={faUsers} className="size-4" />
                    <p className="text-center mt-1">Users</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <Button
            onClick={onLogout}
            className={`flex items-center bg-red-600 hover:bg-red-400 text-white gap-2 px-2 py-2 rounded-lg text-sm `}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="size-4 scale-x-[-1]"
            />
            <p className="text-center mt-1">Log Out</p>
          </Button>
        </div>
        <div className=" m-4 lg:m-8 p-6 w-full bg-white rounded-lg">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};
