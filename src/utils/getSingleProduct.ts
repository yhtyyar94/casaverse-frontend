import axios from "axios";

const getSingleProduct = async (id: number | string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/?populate=*&filters[$and][0][publishedAt][$nei]=null&filters[$and][1][id][$eq]=${id}&filters[$and][2][voorraad][$ne]=0`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    if (response.data) {
      return { data: response.data.data[0] };
    }
    return { data: [] };
  } catch (error: any) {
    console.log(error);
    return { data: [] };
  }
};

export default getSingleProduct;
