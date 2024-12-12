import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { category, page } = req.body;
    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[category][title][$eq]=${category}&filters[$and][0][imageUrls][$notNull]=true&filters[$and][1][image][id][$notNull]=true&populate=*&pagination[pageSize]=100&pagination[page]=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    const products = res1.data;
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
