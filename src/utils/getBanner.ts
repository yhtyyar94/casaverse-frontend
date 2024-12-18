import axios from "axios";

const getBannerImages = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/banners?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    const images = response.data.data.map(
      (image: any) => image.attributes?.image?.data?.attributes?.url
    );
    console.log(images);
    return images;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.error?.message;
    /* const dutchMessage = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/translate`,
      {
        text: errorMessage,
      }
    ); */
    return { message: error };
  }
};

export default getBannerImages;
