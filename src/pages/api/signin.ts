import axios from "axios";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { username, password } = req.body;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local?populates=*`,
      {
        identifier: username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    const addressResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-addresses?filters[user][id][$eq]=${response.data?.user?.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    res
      .status(200)
      .json({ ...response.data, address: addressResponse.data?.data[0] });
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message;
    /* const dutchMessage = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/translate`,
      {
        text: errorMessage,
      }
    ); */
    console.log(errorMessage);
    return res.status(500).json({ message: errorMessage });
  }
};

export default handler;
