// components/PromoCard.js
import React from "react";
import { PromoCardProps } from "./PromoCard";
import toast from "react-hot-toast";

const PromoCard1 = (props: PromoCardProps) => {
  const handlePutPromo = () => {
    navigator.clipboard.writeText(props.code);
    toast.success("Promo code copied to clipboard!");
  };
  const start_date = new Date(props.startDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const end_date = new Date(props.endDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{props.code}</h2>
        <p className="mt-2 text-sm text-gray-600">{props.desc}!</p>
        <p className="text-sm text-gray-600">
          {start_date} - {end_date}
        </p>
        <div className="mt-2">
          <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {props.type == "%"
              ? `Diskon ${props.value}%`
              : `Potongan Rp. ${props.value.toLocaleString()}`}
          </span>
        </div>
        <button
          onClick={handlePutPromo}
          className="mt-4 w-full bg-blue-500 text-base text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Ambil Promo
        </button>
      </div>
    </div>
  );
};

export default PromoCard1;
