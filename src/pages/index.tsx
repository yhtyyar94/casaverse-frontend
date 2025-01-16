import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { ProductProps } from "../../type";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addCategories, setAllProducts } from "@/store/nextSlice";
import MainPageCategories from "@/components/MainPageCategories";
import getAllCategories from "@/utils/getAllCategories";
import getFeaturedProducts from "@/utils/getFeaturedProducts";
import { GetServerSideProps } from "next";
import getBannerImages from "@/utils/getBanner";
import LocationOnGoogleMaps from "@/components/LocationOnGoogleMaps";
import CookieSettings from "@/components/Cookiesettings";

interface Props {
  productData: ProductProps;
  categories: { name: string; id: string | number }[];
  images: string[];
}

export default function Home({ productData, categories, images }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllProducts({ allProducts: productData }));
    dispatch(addCategories(categories));
  }, [productData, categories]);

  return (
    <main>
      <div className="mx-auto sm:w-full md:w-[80%]">
        {images && <Banner images={images} />}

        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-30 mb-10">
          <MainPageCategories categoriesData={categories} />

          <Products productData={productData} />
          <LocationOnGoogleMaps />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    // const images = await getBannerImages();
    const res = await getFeaturedProducts();

    const categoriesRes = await getAllCategories();
    const categories = categoriesRes?.data?.map((category: any) => ({
      name: category?.attributes?.title,
      id: category?.id,
      url:
        category.attributes?.image?.data !== null
          ? category?.attributes?.image?.data?.attributes?.url
          : "",
    }));

    return {
      props: {
        productData: res,
        categories,
        // images: images,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { productData: [] } };
  }
};
