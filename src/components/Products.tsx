import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/router";

const Products = ({ productData, similar }: any) => {
  const [products, setProducts] = useState(productData);
  const [similarProducts, setSimilarProducts] = useState(similar);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    setProducts(productData);
  }, [productData]);

  useEffect(() => {
    setSimilarProducts(similar);
  }, [similar]);
  useEffect(() => {
    setLoading(false);
    setClicked(undefined);
  }, [router]);

  const dispatch = useDispatch();

  return (
    <div
      className={
        similar
          ? "w-full px-6 md:px-1 lg:px-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          : "w-full px-6 md:px-1 lg:px-6 grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 gap-6"
      }
    >
      {products?.map((product: any, i: number) => (
        <div
          key={similar ? "similar " + product.id : "product " + product.id}
          className="w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden"
        >
          <div className="w-full h-[260px] relative">
            <Link
              onClick={() => {
                setLoading(true);
                setClicked(i);
              }}
              passHref
              href={{
                pathname: `/product/${product.id}?title=${encodeURIComponent(
                  product.attributes.showBolComData
                    ? product.attributes.bolDetails.attributes.find(
                        (item: any) => item.id === "Titel"
                      )["values"][0].value
                    : product.attributes?.title
                )}`,
              }}
            >
              <Image
                className="w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300 object-fill"
                layout="fill"
                objectFit="contain"
                color="white"
                src={
                  product?.attributes?.image?.data
                    ? product?.attributes?.image?.data[0]?.attributes?.url
                    : product.attributes?.imageUrls
                    ? product.attributes?.imageUrls[0]
                    : "/images/casaverse.jpeg"
                }
                alt="productImage"
              />
            </Link>

            <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
              <span
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      brand: product.attributes?.brand,
                      category:
                        product.attributes?.category?.data?.attributes?.title,
                      description: product.attributes.showBolComData
                        ? product.attributes.showBolComData
                        : product.attributes?.description,
                      image: product?.attributes?.image?.data
                        ? product?.attributes?.image?.data[0]?.attributes?.url
                        : product.attributes.imageUrls[0],
                      isNew: product.attributes?.isNew,
                      oldPrice: product.attributes?.oldPrice,
                      price: product.attributes?.price,
                      title: product.attributes.showBolComData
                        ? product.attributes.bolDetails.attributes.find(
                            (item: any) => item.id === "Titel"
                          )["values"][0].value
                        : product.attributes?.title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    addToFavorite({
                      id: product.id,
                      brand: product.attributes?.brand,
                      category:
                        product.attributes?.category?.data?.attributes?.title,
                      description: product.attributes.showBolComData
                        ? product.attributes.showBolComData
                        : product.attributes?.description,
                      image: product?.attributes?.image?.data
                        ? product?.attributes?.image?.data[0]?.attributes?.url
                        : product.attributes.imageUrls[0],
                      isNew: product.attributes?.isNew,
                      oldPrice: product.attributes?.oldPrice,
                      price: product.attributes?.price,
                      title: product.attributes.showBolComData
                        ? product.attributes.bolDetails.attributes.find(
                            (item: any) => item.id === "Titel"
                          )["values"][0].value
                        : product.attributes?.title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>
            {product.attributes?.oldPrice && (
              <p className="absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce">
                bespaar{" "}
                <FormattedPrice
                  amount={
                    product.attributes?.oldPrice - product.attributes?.price
                  }
                />
              </p>
            )}
          </div>
          {loading && clicked === i && (
            <div className="w-full flex items-center justify-center">
              <BeatLoader color="#131921" size={40} />
            </div>
          )}
          <hr />
          <Link
            onClick={() => {
              setLoading(true);
              setClicked(i);
            }}
            passHref
            href={{
              pathname: `/product/${product.id}?title=${encodeURIComponent(
                product.attributes.showBolComData
                  ? product.attributes.bolDetails.attributes.find(
                      (item: any) => item.id === "Titel"
                    )["values"][0].value
                  : product.attributes?.title
              )}`,
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <p className="text-xs text-gray-500 tracking-wide">
                {product.attributes?.category?.data?.attributes?.title}
              </p>
              <p className="text-base font-medium">
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
              <p className="flex items-center gap-2">
                {product.attributes?.oldPrice && (
                  <span className="text-sm line-through">
                    <FormattedPrice amount={product.attributes?.oldPrice} />
                  </span>
                )}
                <span className="text-amazon_blue font-semibold">
                  <FormattedPrice amount={product.attributes?.price} />
                </span>
              </p>
            </div>
          </Link>
          <div className="px-4 py-3 flex flex-col gap-1 mt-auto">
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    brand: product.attributes?.brand,
                    category:
                      product.attributes?.category?.data?.attributes?.title,
                    description: product.attributes.showBolComData
                      ? product.attributes.showBolComData
                      : product.attributes?.description,
                    image: product?.attributes?.image?.data
                      ? product?.attributes?.image?.data[0]?.attributes?.url
                      : product.attributes.imageUrls[0],
                    isNew: product.attributes?.isNew,
                    oldPrice: product.attributes?.oldPrice,
                    price: product.attributes?.price,
                    title: product.attributes.showBolComData
                      ? product.attributes.bolDetails.attributes.find(
                          (item: any) => item.id === "Titel"
                        )["values"][0].value
                      : product.attributes?.title,
                    quantity: 1,
                  })
                )
              }
              className="h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
            >
              In winkelwagen
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
