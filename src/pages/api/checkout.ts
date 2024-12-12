import { NextApiRequest, NextApiResponse } from "next";
import { StoreProduct } from "../../../type";
import axios from "axios";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { items, email, totalAmount, userId, addressId, phone } = req.body;
    const paymentMethods = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
        },
      }
    );

    const createOrderItem = items?.map((item: any) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order-items`,
        {
          data: {
            product: {
              connect: [item.id],
            },
            quantity: item.quantity,
            total: item.price * item.quantity,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
          },
        }
      )
    );

    Promise.all(createOrderItem)
      .then((values) => {
        const orderItemIds = values?.map((value) => value.data?.data?.id);

        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order-details`,
            {
              data: {
                total: totalAmount,
                user: {
                  connect: [userId],
                },
                order_items: {
                  connect: orderItemIds,
                },
                user_address: {
                  connect: [addressId],
                },
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + process.env.NEXT_API_TOKEN,
              },
            }
          )
          .then((order) => {
            const modifiedItems = items?.map((item: StoreProduct) => ({
              quantity: item.quantity,

              price_data: {
                currency: "eur",
                unit_amount: Math.round(item.price * 100),
                product_data: {
                  name: item.title,
                  description: item.description,
                  images: [item.image],
                },
              },
            }));

            const checkoutConfig = {
              payment_method_types: paymentMethods?.data?.data
                ? paymentMethods?.data?.data.map((method: any) => method?.title)
                : ["card", "ideal"],
              locale: "nl",
              line_items: modifiedItems,
              mode: "payment",
              success_url: `${process.env.NEXT_PUBLIC_AUTH_URL}/success`,
              cancel_url: `${process.env.NEXT_PUBLIC_AUTH_URL}/cart`,
              metadata: {
                email,
                images: JSON.stringify(items?.map((item: any) => item.image)),
                id: JSON.stringify(items?.map((item: any) => item.id)),
                orderId: "",
              },
              customer_email: email,
              invoice_creation: {
                enabled: true,
              },
              customer_creation: "always",
            };

            checkoutConfig.metadata.orderId = order.data?.data?.id;
            stripe.checkout.sessions
              .create(checkoutConfig)
              .then((session: any) => {
                res.status(200).json({
                  id: session.id,
                });
              })
              .catch((err: any) => {
                console.log(err);
                res.status(400).json({ message: err.message });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err.message });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err.message });
      });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
