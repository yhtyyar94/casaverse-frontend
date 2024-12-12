import Products from "@/components/Products";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductsByCategory = ({ products }: { products: any }) => {
  const [productData, setProductData] = useState(products);
  const router = useRouter();
  useEffect(() => {
    setProductData(products);
  }, [products]);
  return (
    <div className="mx-auto sm:w-full md:w-[80%]">
      <Breadcrumb mt={3} separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink>Zoekresultaten</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="mt-5 lg:min-h-[80vh] sm:min-h-[80vh]">
        {productData && productData?.length !== 0 ? (
          <Products productData={productData} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-3xl font-bold">Geen producten gevonden</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;

export const getStaticPaths = async () => {
  try {
    return {
      paths: [],
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  try {
    const query = params.query;
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/search`,
      {
        searchQuery: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      props: {
        products: [...res.data],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return { props: { productData: [] } };
  }
};
