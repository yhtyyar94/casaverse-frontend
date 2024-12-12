import React from "react";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import FavoriteProduct from "@/components/FavoriteProduct";
import ResetFavoriteItems from "@/components/ResetFavoriteItems";
import Link from "next/link";

const FavoritePage = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.next);

  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4 lg:h-[80vh]">
      {favoriteData?.length > 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold text-amazon_blue">
              Favoriete artikelen
            </p>
          </div>
          <div>
            {favoriteData?.map((item: StoreProduct) => (
              <div key={item.id} className="mt-2">
                <FavoriteProduct item={item} />
              </div>
            ))}
            <ResetFavoriteItems />
          </div>
        </div>
      ) : (
        <div className="bg-white h-96  flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1>Er is niets beschikbaar in de favorietenlijst</h1>
          <Link passHref href="/">
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
              Gaan winkelen
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
