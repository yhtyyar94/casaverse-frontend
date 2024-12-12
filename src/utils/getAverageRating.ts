import axios from "axios";

const getAverageRating = async (productId: number | string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?filters[product][id][$eq]=${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    if (response.data?.data?.length > 0) {
      const averageRating =
        response.data.data.reduce((acc: number, review: any) => {
          return acc + review?.attributes?.stars;
        }, 0) / response.data.data?.length;
      return { averageRating, totalReviews: response.data.data?.length };
    }
    return response.data;
  } catch (error: any) {
    return { message: error?.message };
  }
};

export default getAverageRating;
