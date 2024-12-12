import { HStack, Image, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { StateProps } from "../../../type";
import { useEffect, useState } from "react";
import axios from "axios";

const Bestellingen = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next);
  const [orders, setOrders] = useState([]);

  const toast = useToast();

  useEffect(() => {
    axios
      .post(`/api/get-user-orders`, {
        userId: userInfo?.id,
      })
      .then((res) => {
        if (res?.data?.data?.length > 0) {
          setOrders(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description:
            "Er is een fout opgetreden bij het ophalen van de bestellingen",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);
  return (
    <Stack w={{ sm: "80%", lg: "80%" }}>
      <Text textAlign={"center"} fontSize={"24px"} fontWeight={"bold"} mb={5}>
        Bestellingen
      </Text>
      {orders?.length === 0 && <Text>Geen bestellingen gevonden</Text>}
      {orders?.map((order: any, index: number) => (
        <Stack key={index + "bestellingen"}>
          <Text mt={5}>
            {new Date(order?.attributes?.createdAt).toLocaleDateString("nl-NL")}{" "}
            | Bestelnummer {order?.attributes?.order_number}
          </Text>
          {order?.attributes?.order_items?.data?.map(
            (item: any, index: number) => (
              <HStack
                key={index + "bestellingenItems"}
                borderRadius={"5px"}
                boxShadow={
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                }
                p={2}
              >
                <Image
                  src={
                    item?.attributes?.product?.data?.attributes?.image.data
                      ? item?.attributes?.product?.data?.attributes?.image
                          .data[0]?.attributes?.url
                      : item?.attributes?.product?.data?.attributes
                          ?.imageUrls[0]
                  }
                  alt={item?.attributes?.name}
                  w={"100px"}
                  h={"100px"}
                />
                <VStack>
                  <Text>
                    {item?.attributes?.product?.data?.attributes?.title
                      ? item?.attributes?.product?.data?.attributes?.title
                      : item?.attributes?.product?.data?.attributes?.bolDetails?.attributes?.find(
                          (detail: any) => detail?.id === "Titel"
                        )["values"][0]?.value}
                  </Text>
                  <Text w={"100%"} textAlign={"start"}>
                    Hoeveelheid: {item?.attributes?.quantity}
                  </Text>
                </VStack>
              </HStack>
            )
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default Bestellingen;
