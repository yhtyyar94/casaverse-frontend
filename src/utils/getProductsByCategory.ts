import axios from "axios";
import qs from "qs";

const getProductsByCategory = async (
  category: string,
  page: number | string
) => {
  try {
    const query = {
      filters: {
        category: {
          title: {
            $eq: category,
          },
        },
        $or: [
          {
            imageUrls: {
              $notNull: true,
            },
          },
          {
            image: {
              id: {
                $notNull: true,
              },
            },
          },
        ],
      },
      populate: "*",
      pagination: {
        pageSize: 100,
        page: page,
      },
    };

    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qs.stringify(query)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    console.log(res1.data);
    const products = res1.data;
    return products;
  } catch (error) {
    console.log(error);
    return { message: "Internal server error" };
  }
};

export default getProductsByCategory;
