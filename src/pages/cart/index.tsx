import React, { use } from "react";
import { StateProps, StoreProduct } from "../../../type";
import { useSelector } from "react-redux";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import Link from "next/link";
import CartPayment from "@/components/CartPayment";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Accountgegevens from "@/components/MijnAccount/AccountGegevens.";
import Adresgegevens from "@/components/MijnAccount/Adresgegevens";
import ideal from "../../images/payment/ideal.png";
import apple from "../../images/payment/apple.png";
import paypal from "../../images/payment/paypal.svg";
import visa from "../../images/payment/visa.png";
import mastercard from "../../images/payment/mastercard.svg";
import googlepay from "../../images/payment/googlepay.svg";
import Image from "next/image";

const CartPage = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [height, setHeight] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <div
      className={`${
        productData?.length === 0 && "items-center justify-center"
      } mx-auto px-6 grid grid-cols-6 md:grid-cols-9 gap-10 md:gap-0 py-4 sm:grid-cols-1`}
    >
      {productData?.length > 0 ? (
        <>
          <div className="bg-white col-span-4 md:col-span-6 sm:col-span-1 p-4 rounded-lg">
            <Accordion allowToggle index={activeIndex}>
              <AccordionItem>
                <AccordionButton
                  _expanded={{ bg: "#20a2c6", color: "white" }}
                  onClick={() => setActiveIndex(0)}
                >
                  <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
                    Shopping Cart
                  </Box>
                  {/* <AccordionIcon /> */}
                </AccordionButton>
                <AccordionPanel>
                  {productData?.map((item: StoreProduct) => (
                    <div key={item.id} className="sm:mb-5">
                      <CartProduct item={item} />
                    </div>
                  ))}
                  {userInfo && (
                    <Text textAlign={"right"}>
                      <Button
                        color={"white"}
                        bgColor={"#20a2c6"}
                        _hover={{ bgColor: "orange" }}
                        onClick={() => setActiveIndex(1)}
                      >
                        Volgende stap
                      </Button>
                    </Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
              {userInfo && (
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: "#20a2c6", color: "white" }}
                    onClick={() => setActiveIndex(1)}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      fontWeight={"bold"}
                    >
                      Contactgegevens
                    </Box>
                    {/* <AccordionIcon /> */}
                  </AccordionButton>
                  <AccordionPanel>
                    <Text textAlign={"right"}>
                      <Button
                        bgColor={"#20a2c6"}
                        color={"white"}
                        _hover={{ bgColor: "orange" }}
                        onClick={() => setActiveIndex(0)}
                      >
                        Vorige stap
                      </Button>
                    </Text>
                    <Accountgegevens checkout={true} />
                    <Text textAlign={"right"}>
                      <Button
                        color={"white"}
                        bgColor={"#20a2c6"}
                        _hover={{ bgColor: "orange" }}
                        onClick={() => setActiveIndex(2)}
                      >
                        Volgende stap
                      </Button>
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              )}
              {userInfo && (
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: "#20a2c6", color: "white" }}
                    onClick={() => setActiveIndex(2)}
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      fontWeight={"bold"}
                    >
                      Adresgegevens
                    </Box>
                    {/* <AccordionIcon /> */}
                  </AccordionButton>
                  <AccordionPanel>
                    <Text textAlign={"right"}>
                      <Button
                        bgColor={"#20a2c6"}
                        color={"white"}
                        _hover={{ bgColor: "orange" }}
                        onClick={() => setActiveIndex(1)}
                      >
                        Vorige stap
                      </Button>
                    </Text>
                    <Adresgegevens checkout={true} />
                  </AccordionPanel>
                </AccordionItem>
              )}
            </Accordion>
          </div>
          <div className="bg-white col-span-2 md:col-span-3 sm:col-span-1 p-4 rounded-lg ">
            <CartPayment setActiveIndex={setActiveIndex} />
            <HStack
              spacing={"12px"}
              w={"100%"}
              boxShadow={"lg"}
              borderRadius={"5px"}
              className="col-span-1"
              justifyContent={{
                base: "center",
                md: "center",
                xl: "space-between",
              }}
              flexWrap={"wrap"}
              p={4}
            >
              <Image src={ideal} alt="logo" width={50} height={50} />
              <Image src={visa} alt="logo" width={50} height={50} />
              <Image src={mastercard} alt="logo" width={50} height={50} />
              <Image src={apple} alt="logo" width={50} height={50} />
              <Image src={paypal} alt="logo" width={50} height={50} />
              <Image src={googlepay} alt="logo" width={50} height={50} />
            </HStack>
          </div>
        </>
      ) : (
        <div className="bg-white h-64 col-span-9 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium">Uw winkelwagen is leeg!</h1>
          <Link passHref href={"/"}>
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black">
              Gaan winkelen
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
