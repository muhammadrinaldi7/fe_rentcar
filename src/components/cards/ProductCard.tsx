import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faGears,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  type: string;
  transmission: string;
  capacity: number;
  fuel: number;
  price: number;
  available: number;
}
export const ProductCard = (props: ProductCardProps) => {
  return (
    <Card className="w-full hover:shadow-xl shadow-md shadow-info-400">
      <CardHeader className="py-2 bg-transparent shadow-none border-none">
        <div className="flex items-center justify-between">
          <p className="text-lg">{props.title} </p>
          <Badge
            variant={"outline"}
            className={`text-xs ${
              props.available === 1 ? "bg-info-500" : "bg-gray-500"
            } text-white`}
          >
            {props.available === 1 ? "Ready" : "Not Ready"}
          </Badge>
        </div>
        <p className="text-seccond-400 text-base">{props.type}</p>
      </CardHeader>
      <CardContent className="bg-white w-full flex flex-col md:justify-center md:items-center md:flex-row gap-4 py-2 rounded-xl">
        <Image
          src={props.image}
          alt="cars"
          width={1000}
          height={1000}
          className="w-full md:w-[70%] drop-shadow-lg rounded-2xl h-full"
        />
        <div className="flex flex-row md:flex-col text-gray-500 md:items-start gap-2 items-center">
          <div className="flex flex-row gap-2">
            <FontAwesomeIcon icon={faGasPump} className=" size-4" />
            <p className="text-sm font-normal"> {props.fuel}L</p>
          </div>
          <div className="flex flex-row gap-2">
            <FontAwesomeIcon icon={faGears} className=" size-4" />
            <p className="text-sm font-normal"> {props.transmission}</p>
          </div>

          <div className="flex flex-row gap-2">
            <FontAwesomeIcon icon={faPeopleGroup} className=" size-4" />
            <p className="text-sm font-normal">{props.capacity} Person</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 items-center w-full justify-between">
          <p className="text-base text-seccond-500 font-bold">
            Rp. {props.price.toLocaleString("id-ID")} /{" "}
            <span className="text-gray-500">hari</span>
          </p>
          <Link href={`/user/bookings/create/${props.id}`}>
            <Button
              disabled={props.available === 0}
              className="bg-primary-500 text-white hover:bg-primary-400"
            >
              Rental Now
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
