import Image from "next/image";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, deleteFavorite } from "@/store/nextSlice";
interface Item {
  id: number;
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  quantity: number;
}
interface cartProductProps {
  item: Item;
}

const FavoriteProduct = ({ item }: cartProductProps) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-white p-2 shadow-lg rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2">
      <Image src={item.image} alt="Product image" width={150} height={150} />
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-sm text-gray-600">
            Eenheid prijs:{" "}
            <span className="font-semibold text-amazon_blue">
              <FormattedPrice amount={item.price} />
            </span>
          </p>
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id: item.id,
                  brand: item.brand,
                  category: item.category,
                  description: item.description,
                  image: item.image,
                  isNew: item.isNew,
                  oldPrice: item.oldPrice,
                  price: item.price,
                  title: item.title,
                  quantity: 1,
                })
              ) && dispatch(deleteFavorite(item.id));
            }}
            className="w-[max-content] p-1 h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow duration-300 hover:text-black mt-2"
          >
            Voeg toe aan winkelwagen
          </button>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          <FormattedPrice amount={item.price * item.quantity} />
        </div>
      </div>
    </div>
  );
};

export default FavoriteProduct;
