import axios from "axios";

const getFeaturedProducts = async () => {
  try {
    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[$and][0][isFeatured][$eq]=true&filters[$and][1][imageUrls][$notNull]=true&filters[$and][2][image][id][$notNull]=true&filters[$and][2][voorraad][$nei]=0&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    const products = res1.data?.data;
    return products;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error" };
  }
};

export default getFeaturedProducts;
