"use client";
import endpoints from "@/api/endpoints";
import { useViewBook } from "@/api/services/bookings/useViewBook";
import { LayoutUser } from "@/components/layouts/LayoutUser";
import SimpleLoading from "@/components/loading/SimpleLoading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Bookings() {
  const { data: myBook, isLoading } = useViewBook(endpoints.myBook);
  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <LayoutUser>
        <div className="rounded-lg p-3 bg-white">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Bookings</h2>
            <hr className="my-2 border-2" />
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">No</TableHead>
                  <TableHead>Nama Mobil</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Lama</TableHead>
                  <TableHead>Bayar</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      <SimpleLoading />
                    </TableCell>
                  </TableRow>
                ) : (
                  myBook?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-10">{index + 1}</TableCell>
                      <TableCell>{item.car.name}</TableCell>
                      <TableCell>
                        {item.start_date}, {item.end_date}
                      </TableCell>
                      <TableCell>
                        {calculateDays(item.start_date, item.end_date) +
                          " Hari"}
                      </TableCell>
                      <TableCell>
                        {item.final_price.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center justify-center rounded-full border ${
                            item.status == "pending"
                              ? "border-amber-500"
                              : "border-emerald-500"
                          } px-2.5 py-0.5 ${
                            item.status == "pending"
                              ? "text-amber-700"
                              : "text-emerald-700"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={
                              item.status == "pending" ? faClock : faCheckCircle
                            }
                            className="-ms-1 me-1.5 size-4"
                          />
                          <p className="whitespace-nowrap text-sm">
                            {item.status}
                          </p>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link
                          className={`${
                            item.status != "pending"
                              ? "pointer-events-none"
                              : ""
                          }`}
                          href={`/user/payments/pay/${item.id}`}
                        >
                          <Button
                            size="sm"
                            className="w-full bg-info-500 text-white hover:text-seccond-400 hover:bg-info-600"
                            disabled={item.status != "pending"}
                          >
                            Bayar
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </LayoutUser>
    </>
  );
}
