import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      return res.status(400).json({ message: "Method not allowed" });

    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[$and][0][isFeatured][$eq]=true&filters[$and][1][imageUrls][$notNull]=true&filters[$and][2][image][id][$notNull]=true&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    const products = res1.data?.data;
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
