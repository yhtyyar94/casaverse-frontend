import initStripe from "@/utils/stripe";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Get raw body as string
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const endpointSecret = "whsec_6b4ETNEWZWO14pEt4uuDgQnJGLylcGE2";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sig = req.headers["stripe-signature"] as string;
    const buf = await getRawBody(req);
    const event = await initStripe.webhooks.constructEventAsync(
      buf,
      sig,
      endpointSecret
    );
    if (
      (event.type === "checkout.session.completed" &&
        (event.data.object as any)?.payment_status === "paid") ||
      (event.type === "invoice.payment_succeeded" &&
        (event.data.object as any)?.payment_status === "paid")
    ) {
      // update the order in the database
      const orderId = (event?.data?.object as any)?.metadata?.orderId;

      if (orderId) {
        const updateOrder = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order-details/${orderId}`,
          {
            data: {
              payment_status: "paid",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
            },
          }
        );
      }
    }

    res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error?.response?.data?.error?.message);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
