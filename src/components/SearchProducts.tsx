import React from "react";
import FormattedPrice from "./FormattedPrice";
import Image from "next/image";

interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  id: number;
}

const SearchProducts = ({ product }: { product: any }) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        className="w-24"
        src={
          product?.attributes?.image?.data
            ? product?.attributes?.image?.data[0]?.attributes?.url
            : product.attributes.imageUrls[0]
        }
        width={150}
        height={150}
        alt="productImage"
      />
      <div>
        <p className="text-xs -mb-1">
          {product.attributes?.brand} -
          {product.attributes?.category?.data?.attributes?.title}
        </p>
        <p className="text-lg font-medium">
          {product.attributes.showBolComData
            ? product.attributes.bolDetails.attributes
                .find((item: any) => item.id === "Titel")
                ["values"][0].value.substring(0, 57)
            : product.attributes?.title.substring(0, 57)}
          {product.attributes.bolDetails.attributes.find(
            (item: any) => item.id === "Titel"
          )["values"][0].value?.length > 57 ||
          product.attributes?.title?.length > 57
            ? " ..."
            : ""}
        </p>

        <p className="text-sm flex products-center gap-1">
          prijs:{" "}
          <span className="font-semibold">
            <FormattedPrice amount={product.attributes?.price} />
          </span>
          {product.attributes?.oldPrice && (
            <span className="text-gray-600 line-through">
              <FormattedPrice amount={product.attributes?.oldPrice} />
            </span>
          )}
        </p>
      </div>
      {product.attributes?.oldPrice && (
        <div className="flex-1 text-right px-4">
          <p className="text-base font-semibold animate-bounce text-amazon_blue">
            bespaar{" "}
            <FormattedPrice
              amount={product.attributes?.oldPrice - product.attributes?.price}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
