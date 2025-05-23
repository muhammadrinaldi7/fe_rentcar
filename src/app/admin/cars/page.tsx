"use client";
import endpoints from "@/api/endpoints";
import { useFetchAllCars } from "@/api/services/cars/useViewCars";
import { LayoutAdmin } from "@/components/layouts/LayoutAdmin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { ArmadaOnSite } from "./armadaOnSite";

export default function Cars() {
  const { data: fetchCars } = useFetchAllCars(endpoints.cars);
  const [filterData, setFilterData] = useState({
    status: "All",
    active: false,
    available: null as number | null,
  });
  const filteredItems = fetchCars?.data.filter((item) => {
    if (filterData.available === null) {
      // Jika filterData.available null (All), tampilkan semua item
      return true;
    }
    return item.available === filterData.available;
  });

  return (
    <>
      <LayoutAdmin title="Cars">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 bg-white p-4 rounded-lg w-full flex-col">
            <h1>Data Armada</h1>
            <Link href="/admin/cars/add" className="w-fit">
              <Button className="w-fit  bg-success-400">
                {" "}
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                {} Add Cars
              </Button>
            </Link>
            <div>
              <div className="sm:hidden">
                <label htmlFor="Tab" className="sr-only">
                  Tab
                </label>

                <select id="Tab" className="w-full rounded-md border-gray-200">
                  <option>Settings</option>
                  <option>Messages</option>
                  <option>Archive</option>
                </select>
              </div>

              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex gap-6" aria-label="Tabs">
                    <div
                      onClick={() =>
                        setFilterData({
                          ...filterData,
                          status: "All",
                          available: null,
                        })
                      }
                      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${
                        filterData.status == "All"
                          ? "text-sky-500 hover:border-sky-300 border-sky-300 hover:text-sky-700"
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      All
                    </div>

                    <div
                      onClick={() =>
                        setFilterData({
                          ...filterData,
                          status: "Ready",
                          available: 1,
                        })
                      }
                      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${
                        filterData.status == "Ready"
                          ? "text-sky-500 hover:border-sky-300 border-sky-300 hover:text-sky-700"
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                        />
                      </svg>
                      Ready
                    </div>

                    <div
                      onClick={() =>
                        setFilterData({
                          ...filterData,
                          status: "Booked",
                          available: 0,
                        })
                      }
                      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${
                        filterData.status == "Booked"
                          ? "text-sky-500 hover:border-sky-300 border-sky-300 hover:text-sky-700"
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                      Booked
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Tahun</TableHead>
                  <TableHead>Transmisi</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems?.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
                {filteredItems?.map((car, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{car.name}</TableCell>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{car.transmission}</TableCell>
                    <TableCell>{car.price_per_day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ArmadaOnSite />
        </div>
      </LayoutAdmin>
    </>
  );
}
