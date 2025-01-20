"use client";
import { useHeaderStore } from "@/stores/headerStore";
import Image from "next/image";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
export default function Header() {
  const { logged, setLogged } = useAuthStore();

  useEffect(() => {
    const cookieValue = Cookies.get("token");
    if (cookieValue) {
      setLogged(true);
    }
  }, [setLogged]); // Hanya dijalankan sekali di client

  const { isOpen, toggle } = useHeaderStore();
  const handleLogout = () => {
    setLogged(false);
    Cookies.remove("token");
  };
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-primary-500" href="/user/home">
              <h1 className="text-2xl drop-shadow-lg font-bold">MORENT</h1>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            {/* <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-seccond-500 transition hover:text-seccond-500/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-seccond-500 transition hover:text-seccond-500/75"
                    href="#"
                  >
                    {" "}
                    Careers{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-seccond-500 transition hover:text-seccond-500/75"
                    href="#"
                  >
                    {" "}
                    History{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-seccond-500 transition hover:text-seccond-500/75"
                    href="#"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-seccond-500 transition hover:text-seccond-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-seccond-500 transition hover:text-seccond-500/75"
                    href="#"
                  >
                    {" "}
                    Blog{" "}
                  </a>
                </li>
              </ul>
            </nav> */}

            {logged ? (
              <div className="hidden md:relative md:block">
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
                    className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
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
                        onClick={handleLogout}
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
            ) : (
              <div className="flex gap-3">
                <Link href={"auth/login"}>
                  <Button className="bg-primary-600 hover:bg-white hover:text-black shadow-md text-white">
                    Login
                  </Button>
                </Link>
                <Link href={"auth/register"}>
                  <Button className="bg-success-600 hover:bg-white hover:text-black shadow-md text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
            {/* <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
