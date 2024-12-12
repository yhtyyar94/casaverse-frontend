import Products from "@/components/Products";
import getAllProducts from "@/utils/getAllProducts";
import qs from "qs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Select,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/router";

const AllProducts = ({ products }: { products: any }) => {
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
    <div className="mx-auto sm:w-full md:w-[85%] h-full">
      <Stack
        display={"flex"}
        flexDirection={{ base: "row" }}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <Breadcrumb mt={3} separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Alle producten</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {/* Filter and sort the products according to their prices and names. Do this by sing router */}
        <Stack display={"flex"} alignItems={"end"}>
          <Select
            mt={1.5}
            placeholder="Sorteer op"
            onChange={(e) => {
              router.push({
                pathname: "/all-products",
                query: {
                  sort: e.target.value,
                },
              });
            }}
            border={"none"}
            textAlign={"end"}
          >
            <option value="price:asc">Prijs oplopend</option>
            <option value="price:desc">Prijs aflopend</option>
            <option value="title:asc">Naam oplopend</option>
            <option value="title:desc">Naam aflopend</option>
            {/* add date filter */}
            <option value="createdAt:desc">Nieuwste</option>
            <option value="createdAt:asc">Oudste</option>
          </Select>
        </Stack>
      </Stack>
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

export default AllProducts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    console.log(query);

    const res = await getAllProducts(
      1,
      qs.stringify({
        sort: [query.sort],
      })
    );

    const totalItems = [...res.data];

    const totalPages = res.meta?.pageCount;

    for (let i = 2; i <= totalPages; i++) {
      getAllProducts(
        i,
        qs.stringify({
          sort: [query.sort],
        })
      )
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
