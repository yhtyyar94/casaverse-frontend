import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { page } = req.body;
    const res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?fields[0]=id&fields[1]=title&fields[2]=bolDetails&filters[$and][0][imageUrls][$notNull]=true&filters[$and][1][image][id][$notNull]=true&pagination[pageSize]=100&pagination[page]=${page}`,
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
