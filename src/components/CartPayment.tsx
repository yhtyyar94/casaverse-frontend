import FormattedPrice from "./FormattedPrice";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

const CartPayment = ({ setActiveIndex }: { setActiveIndex: any }) => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const toast = useToast();
  useEffect(() => {
    let amt = 0;
    productData?.map((item: StoreProduct) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [productData]);
  // Striep payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const handleCheckout = async () => {
    // check the user info and shipping address
    if (
      userInfo?.address?.attributes?.street_name === "" ||
      userInfo?.address?.attributes?.house_number === "" ||
      userInfo?.address?.attributes?.postal_code === "" ||
      userInfo?.address?.attributes?.city === "" ||
      userInfo?.address?.attributes?.country === ""
    ) {
      toast({
        title: "Error",
        description: "Vul uw adresgegevens in",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
      setActiveIndex(2);
      return;
    }
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: productData,
        email: userInfo?.email,
        totalAmount: totalAmount,
        userId: userInfo?.id,
        addressId: userInfo?.address?.id,
        phone: userInfo?.phone,
      }),
    });
    const checkoutSession = await response.json();

    // Redirecting user/customer to Stripe Checkout
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      alert(result?.error.message);
    }
  };
  return (
    <Stack
      w={"100%"}
      className="flex flex-col gap-4 col-span-1"
      boxShadow={"lg"}
      borderRadius={"5px"}
      p={4}
    >
      <Stack>
        <Text fontSize={"22px"} fontWeight={"bold"}>
          Overzicht
        </Text>
        <Flex w={"100%"}>
          <Box w={"50%"}>
            <Text fontSize={"16px"} fontWeight={"semibold"}>
              Artikelen(
              {productData?.reduce((a: any, c: any) => a + c?.quantity, 0)})
            </Text>
            <Text fontSize={"16px"} fontWeight={"semibold"}>
              Verzendkosten
            </Text>
          </Box>
          <Spacer />
          <Box w={"50%"}>
            <Text textAlign={"right"}>
              <FormattedPrice amount={totalAmount} />
            </Text>
            <Text textAlign={"right"}>€ 0,00</Text>
          </Box>
        </Flex>
      </Stack>

      <Divider />
      <Stack>
        <Text w={"100%"} fontSize={"16px"} fontWeight={"semibold"}>
          Voeg kortingsbon toe
        </Text>
        <InputGroup>
          <Input type="text" placeholder="Kortingscode" />
          <InputRightAddon p={0}>
            <Button
              _hover={{ bgColor: "#febd00" }}
              bgColor={"orange"}
              w={"100%"}
              onClick={() =>
                toast({
                  title: "Kortingscode",
                  description: "Ongeldige kortingsbon",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                })
              }
            >
              +
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Stack>
      <p className="flex items-center justify-between px-2 font-semibold">
        Totaal:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>
      {userInfo ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleCheckout}
            className="w-full h-10 text-sm font-semibold  text-black rounded-lg hover:bg-amazon_yellow hover:text-white duration-300"
            style={{ backgroundColor: "orange" }}
          >
            Bestellen
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Bestellen
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Log in om verder te gaan
          </p>
        </div>
      )}
    </Stack>
  );
};

export default CartPayment;
