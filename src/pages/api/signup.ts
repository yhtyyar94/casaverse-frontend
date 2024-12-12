import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Method not allowed" });

    const { username, password, firstname, lastname, email } = req.body;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        firstname,
        lastname,
        email,
        password,
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );

    // create user address
    const addressResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-addresses`,
      {
        data: {
          user: {
            connect: [response.data.user.id],
          },
          street_name: "",
          city: "",
          postal_code: "",
          house_number: "",
          country: "",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );

    res
      .status(200)
      .json({ ...response.data.user, address: addressResponse.data?.data });
  } catch (error: any) {
    console.log("erroor", error);
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
