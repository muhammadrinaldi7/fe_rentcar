"use client";
import endpoints from "@/api/endpoints";
import { useLoginService } from "@/api/services/auth/authService";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function LoginPage() {
  const { login } = useLoginService(endpoints.login);
  const [message, setMessage] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  setTimeout(() => {
    if (message) {
      setMessage("");
    }
  }, 3000);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        email: payload.email,
        password: payload.password,
      },

      {
        onError: (err) => {
          console.log(err);
          setMessage(err.message);
        },
      }
    );
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            width={1000}
            height={1000}
            alt=""
            src="https://plus.unsplash.com/premium_photo-1693828618541-e8071e37c296?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <h1 className="text-2xl font-bold text-info-500">MORENT.</h1>
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to MORENT.
            </h2>

            {/* <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p> */}
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full lg:max-w-3xl">
            <div className="relative -mt-16">
              <Link
                className="inline-flex lg:hidden w-[8rem] h-[3.5rem] items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <h1 className="text-2xl h-8 sm:h-10 font-bold text-info-500">
                  MORENT.
                </h1>
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-primary-500 sm:text-3xl md:text-4xl">
                LOGIN
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Login untuk melanjutkan.
              </p>
            </div>
            {message && (
              <div
                role="alert"
                className="rounded border-s-4 border-red-500 bg-red-50 p-4"
              >
                <div className="flex items-center gap-2 text-red-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <strong className="block font-medium">
                    {" "}
                    Something went wrong{" "}
                  </strong>
                </div>
                <p className="mt-2 text-sm text-red-700">{message}</p>
              </div>
            )}
            <form
              onSubmit={handleLogin}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  onChange={handleChange}
                  required
                  value={payload.email}
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  required
                  name="password"
                  value={payload.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Not have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-gray-700 underline"
                  >
                    Register
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
