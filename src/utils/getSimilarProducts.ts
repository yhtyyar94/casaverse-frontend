import axios from "axios";

const getSimilarProducts = async (category: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[category][title][$eq]=${category}&pagination[pageSize]=10&filters[$and][0][imageUrls][$notNull]=true&filters[$and][1][image][id][$notNull]=true&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return { message: error.message };
  }
};

export default getSimilarProducts;
