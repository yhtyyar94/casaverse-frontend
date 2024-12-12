import axios from "axios";

const getReviews = async (productId: number | string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?filters[product][id][$eq]=${productId}&pagination[pageSize]=10&populate=*&sort=createdAt:desc`,
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

export default getReviews;
