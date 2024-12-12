import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { name, email, phone, message, order_number } = req.body;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/customer-services`,
      {
        data: {
          name: name,
          email: email,
          phone: phone,
          message: message,
          order_number: order_number,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

export default handler;
