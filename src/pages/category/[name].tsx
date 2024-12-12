import Products from "@/components/Products";
import getAllCategories from "@/utils/getAllCategories";
import getProductsByCategory from "@/utils/getProductsByCategory";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ProductsByCategory = ({ products }: { products: any }) => {
  const [productData, setProductData] = useState(products);
  const router = useRouter();
  useEffect(() => {
    setProductData(products);
  }, [products]);

  if (!productData) {
    return (
      <div className="w-full md:h-[80vh] flex flex-col gap-6 items-center justify-center py-20">
        <p>Loading...</p>
        <BeatLoader color="#131921" size={40} />
      </div>
    );
  }

  if (Object.keys(productData).length === 0) {
    return (
      <div className="flex justify-center items-center sm:h-[80vh] lg:h-[80vh]">
        <h1 className="text-3xl font-bold">Geen product gevonden</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto sm:w-full md:w-[80%] h-full">
      <Breadcrumb mt={3} separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink>Categorie</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{router.query.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mt={5}>{productData && <Products productData={productData} />}</Box>
      <div>
        {productData && productData?.length === 0 && (
          <div className="flex justify-center items-center sm:h-[80vh] lg:h-[80vh]">
            <h1 className="text-3xl font-bold">Geen producten gevonden</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params && (params.name as string);
    if (!name) {
      return { props: { products: [] } };
    }
    const res = await getProductsByCategory(name, 1);

    const totalItems = [...res.data];

    const totalPages = res.meta?.pageCount;

    for (let i = 2; i <= totalPages; i++) {
      getProductsByCategory(name, i)
        .then((res) => {
          totalItems.push(...res?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      props: {
        products: totalItems,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { productData: [] } };
  }
};
