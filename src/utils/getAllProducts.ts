import axios from "axios";

const getAllProducts = async (page?: number, query?: string) => {
  try {
    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${
        query ? query : ""
      }&filters[$and][0][imageUrls][$notNull]=true&filters[$and][1][image][id][$notNull]=true&pagination[pageSize]=100&pagination[page]=${
        page ? page : 1
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    const products = res1.data;
    return products;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error" };
  }
};

export default getAllProducts;
