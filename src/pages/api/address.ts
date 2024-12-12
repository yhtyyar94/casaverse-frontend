import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "PUT" && req.method !== "GET")
      return res.status(400).json({ message: "Method not allowed" });

    const { id, street_name, city, postal_code, house_number, country } =
      req.body;

    const { addressId } = req.query;

    if (req.method === "GET") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-addresses/${addressId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
          },
        }
      );
      return res.status(200).json(response.data?.data);
    }

    if (
      street_name === "" ||
      city === "" ||
      postal_code === "" ||
      house_number === "" ||
      country === ""
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-addresses/${id}`,
      {
        data: {
          street_name,
          city,
          postal_code,
          house_number,
          country,
        },
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
    return res.status(500).json({ message: dutchMessage.data.result });
  }
};

export default handler;
