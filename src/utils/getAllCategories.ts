import axios from "axios";

const getAllCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=*&pagination[pageSize]=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    // filter the categories if the category has no products
    const res = response.data.data;

    const filteredCategories = res.filter(
      (category: any) => category.attributes.products.data
    );
    return { ...response.data, data: filteredCategories };
  } catch (error: any) {
    console.log(error);
    // const errorMessage = error.response?.data?.error?.message;
    /* const dutchMessage = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/translate`,
      {
        text: errorMessage,
      }
    ); */
    return { message: error };
  }
};

export default getAllCategories;
