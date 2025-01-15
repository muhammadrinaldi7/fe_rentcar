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

export default function Cars() {
  const { data: fetchCars } = useFetchAllCars(endpoints.createCar);
  console.log(fetchCars?.data);
  return (
    <>
      <LayoutAdmin title="Cars">
        <div className="flex gap-4 flex-col">
          <h1>Data Armada</h1>
          <Link href="/admin/cars/add" className="w-fit">
            <Button className="w-fit  bg-success-400">
              {" "}
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              {} Add Cars
            </Button>
          </Link>
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
              {fetchCars?.data?.map((car, index) => (
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
      </LayoutAdmin>
    </>
  );
}
