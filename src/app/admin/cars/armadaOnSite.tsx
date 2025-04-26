"use client";

import endpoints from "@/api/endpoints";
import { useFetchCarsInWay } from "@/api/services/cars/useViewCars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ArmadaOnSite = () => {
  const { data: mobilDijalan } = useFetchCarsInWay(endpoints.carsOtw);
  console.log(mobilDijalan);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="p-4 bg-white rounded-lg">
        <h1>Armada Berjalan</h1>
      </div>
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Mobil</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Mulai</TableHead>
            <TableHead>Selesai</TableHead>
            <TableHead>Days Go</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mobilDijalan?.data.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>
                Rp. {book.price_per_day.toLocaleString("id-ID")}
              </TableCell>
              <TableCell>{book.bookings[0].start_date}</TableCell>
              <TableCell>{book.bookings[0].end_date}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    book.bookings[0].late_days.toString().startsWith("T")
                      ? "bg-warning-500"
                      : "bg-success-500"
                  }`}
                >
                  {book.bookings[0].late_days}
                </Badge>
              </TableCell>
              <TableCell>
                <Button>Sampai</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
