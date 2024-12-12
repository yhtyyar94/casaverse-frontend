import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { email } = req.body;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message;
    const dutchMessage = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/translate`,
      {
        text: errorMessage,
      }
    );
    console.log(dutchMessage.data.result);
    return res.status(500).json({ message: dutchMessage.data.result });
  }
};

export default handler;
