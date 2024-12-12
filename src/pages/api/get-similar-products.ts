import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { category } = req.body;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[category][title][$eq]=${category}&pagination[pageSize]=10&filters[$and][0][imageUrls][$notNull]=true&filters[$and][1][image][id][$notNull]=true&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default handler;
