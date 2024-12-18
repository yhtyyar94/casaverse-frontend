import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { id, firstname, lastname, email, phone, password } = req.body;

    // check the password exists or not
    if (password) {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          firstname,
          lastname,
          email,
          phone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
          },
        }
      );
      res.status(200).json(response.data);
    } else {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          firstname,
          lastname,
          email,
          phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
          },
        }
      );
      res.status(200).json(response.data);
    }
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.error?.message;
    /* const dutchMessage = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/translate`,
      {
        text: errorMessage,
      }
    ); */
    return res.status(500).json({ message: error });
  }
};

export default handler;
