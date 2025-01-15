"use client";
import { Input } from "@/components/ui/input";
import { useHeaderStore } from "@/stores/headerStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faFileInvoice,
  faHamburger,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export const HeaderAdmin = () => {
  const { isOpen, toggle } = useHeaderStore();
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
      <div className="w-full mx-auto container bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-4 items-center gap-8 lg:py-10 py-8 lg:px-14 px-6">
          <Link
            href="/"
            className="lg:flex hidden lg:order-1 grid-cols-1 items-center"
          >
            <h1 className="text-2xl font-bold text-primary-500">MORENT</h1>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="grid-cols-1 lg:hidden items-center w-fit"
            >
              <Button variant="outline">
                <FontAwesomeIcon icon={faHamburger} />{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-3 rounded-lg bg-white shadow-md z-20 absolute -left-7 top-6 ">
              <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2 bg-gray-400 text-gray-400" />
              <DropdownMenuGroup className="flex flex-col gap-3 mb-4">
                <DropdownMenuItem>
                  <Link
                    href={"/admin/dashboard"}
                    className="flex gap-2 items-center"
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    <p className="mt-1">Dashboard</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/admin/cars"}
                    className="flex gap-2 items-center"
                  >
                    <FontAwesomeIcon icon={faCar} />
                    <p className="mt-1">Cars</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/admin/dashboard"}
                    className="flex gap-2 items-center"
                  >
                    <FontAwesomeIcon icon={faFileInvoice} />
                    <p className="mt-1">Transaction</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/admin/dashboard"}
                    className="flex gap-2 items-center"
                  >
                    <FontAwesomeIcon icon={faUsers} />
                    <p className="mt-1">Users</p>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  className="w-full hover:bg-red-400 bg-red-600 text-white"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-full lg:order-3 flex items-center justify-end">
            <button
              type="button"
              className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
              onClick={toggle}
            >
              <span className="sr-only">Toggle dashboard menu</span>

              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                width={1000}
                height={1000}
                className="size-10 object-cover"
              />
            </button>

            {isOpen && (
              <div
                className="absolute end-8 z-10 top-24 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-seccond-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    My profile
                  </a>

                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-seccond-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    Billing summary
                  </a>

                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-seccond-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    Team settings
                  </a>
                </div>

                <div className="p-2">
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:order-2 relative col-span-2 lg:col-span-1">
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
            <Input
              type="text"
              placeholder="Search"
              className="rounded-full focus:scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
};
