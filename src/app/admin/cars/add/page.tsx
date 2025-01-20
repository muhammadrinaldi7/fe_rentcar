"use client";
import endpoints from "@/api/endpoints";
import { useActionCar } from "@/api/services/cars/useActionCar";
import { useUploadImageService } from "@/api/services/upload-image/uploadService";
import { LayoutAdmin } from "@/components/layouts/LayoutAdmin";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddCars() {
  const route = useRouter();
  const [payload, setPayload] = useState({
    name: "",
    brand: "",
    model: "",
    fuel: 0,
    capacity: 0,
    transmission: "",
    year: 0,
    price_per_day: 0,
    available: 0,
    image_urls: [] as string[],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };
  const { uploadImage } = useUploadImageService();
  const { createCar } = useActionCar(endpoints.createCar);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      uploadImage(files, {
        onSuccess: (data) => {
          console.log(data);
          setPayload((prev) => ({
            ...prev,
            image_urls: [...prev.image_urls, ...data.urls],
          }));
        },
      });
    }
  };
  console.log(payload);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCar(payload, {
      onSuccess: (data) => {
        toast.success(data.message, {
          duration: 5000,
        });
        setPayload({
          name: "",
          brand: "",
          model: "",
          fuel: 0,
          capacity: 0,
          transmission: "",
          year: 0,
          price_per_day: 0,
          available: 0,
          image_urls: [],
        });
        route.push("/admin/cars");
      },
    });
  };
  return (
    <LayoutAdmin title="Cars">
      <h1>Add Cars</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Nama Mobil
            </label>
            <Input
              type="text"
              id="Name"
              onChange={handleChange}
              value={payload.name}
              name="name"
              placeholder="Nama Mobil"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Merek Mobil
            </label>
            <Input
              type="text"
              id="Brand"
              onChange={handleChange}
              value={payload.brand}
              name="brand"
              placeholder="Merek Mobil"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Model Mobil
            </label>
            <Input
              type="text"
              id="Model"
              value={payload.model}
              onChange={handleChange}
              name="model"
              placeholder="Model Mobil"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Fuel
            </label>
            <Input
              type="number"
              id="fuel"
              value={payload.fuel}
              onChange={handleChange}
              name="fuel"
              placeholder="Fuel"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Kapasitas Mobil
            </label>
            <Input
              type="text"
              id="Capacity"
              value={payload.capacity}
              onChange={handleChange}
              name="capacity"
              placeholder="Kapasitas Mobil"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Transmisi Mobil
            </label>
            <Select
              name="transmission"
              onValueChange={(e) =>
                setPayload((prev) => ({ ...prev, transmission: e }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Tahun Mobil
            </label>
            <Input
              type="number"
              id="Tahun"
              value={payload.year}
              onChange={handleChange}
              name="year"
              placeholder="Tahun Mobil"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Harga per Hari
            </label>
            <Input
              type="number"
              id="Price"
              value={payload.price_per_day}
              onChange={handleChange}
              name="price_per_day"
              placeholder="Harga Per Hari"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Status Mobil
            </label>
            <Select
              name="available"
              onValueChange={(e) =>
                setPayload((prev) => ({ ...prev, available: Number(e) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Available</SelectItem>
                <SelectItem value="0">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="Name">
              Foto Mobil
            </label>
            <Carousel>
              <CarouselContent>
                {payload.image_urls.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className=" gap-2 flex items-center basis-1/3 h-32 justify-center rounded-lg"
                  >
                    <Image
                      src={image}
                      alt="image"
                      width={1000}
                      height={1000}
                      className="object-contain object-center aspect-video p-1 w-64"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <Input
              type="file"
              id="Image"
              multiple
              onChange={handleUpload}
              name="image"
              placeholder="Foto Mobil"
            />
          </div>
        </div>
        <div className="flex self-end gap-4">
          <Link href="/admin/cars">
            <Button className=" bg-gray-400 text-white hover:bg-gray-400/70">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className=" bg-black text-white hover:bg-black/70"
          >
            Submit
          </Button>
        </div>
      </form>
    </LayoutAdmin>
  );
}
