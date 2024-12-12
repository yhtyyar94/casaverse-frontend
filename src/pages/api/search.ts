import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { searchQuery } = req.body;
    console.log(searchQuery);

    const dashedQuery = searchQuery.replace(/\s+/g, "-");
    const splitQuery = searchQuery.split(" ");

    const res1 = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/products?filters[$or][0][title][$containsi]=${searchQuery}&filters[$or][1][description][$containsi]=${searchQuery}&filters[$or][2][title][$containsi]=${dashedQuery}&filters[$or][3][description][$containsi]=${dashedQuery}&${splitQuery
        ?.map(
          (query: string, index: number) =>
            `filters[$or][${
              index + 4
            }][title][$containsi]=${query}&filters[$or][${
              index + 5
            }][description][$containsi]=${query}&`
        )
        .join("")}populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );
    const products = res1.data.data;
    return res.status(200).json(products);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
