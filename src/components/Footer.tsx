import Image from "next/image";
// import logo from "../images/orion.png";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import ideal from "../images/payment/ideal.png";
import applepay from "../images/payment/applepay.svg";
import paypal from "../images/payment/paypal.svg";
import visa from "../images/payment/visa.png";
import mastercard from "../images/payment/mastercard.svg";
import googlepay from "../images/payment/googlepay.svg";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    if (isValidEmail(email)) {
      axios
        .post("/api/email-subscription", { email })
        .then((res) => {
          toast({
            title: "Succesvol aangemeld",
            description: "Je bent succesvol aangemeld voor de nieuwsbrief",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.log(error);
        });

      setEmail("");
    } else {
      toast({
        title: "Ongeldig e-mailadres",
        description: "Voer een geldig e-mailadres in",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full  bg-gray-300 text-#677279 mt-3">
      <HStack
        p={10}
        justifyContent={"space-between"}
        alignItems={"start"}
        w={"100%"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <Text fontWeight={"semibold"} mb={5}>
            Contact
          </Text>
          <Text>
            <Text as={"span"} fontWeight={"semibold"} lineHeight={1.7}>
              Email:
            </Text>{" "}
            orionstore.nl@gmail.com | info@orionhome.nl
          </Text>
          <Text>
            <Text as={"span"} fontWeight={"semibold"} lineHeight={1.7}>
              Telefoon:
            </Text>{" "}
            +31619103508
          </Text>
          <Text>
            <Text as={"span"} fontWeight={"semibold"} lineHeight={1.7}>
              Whatsapp:
            </Text>{" "}
            619103508
          </Text>
          <Text mt={2}>Bereikbaar op werkdagen tussen 09:00 en 17:00 uur</Text>
          {/* <Image className="w-24 m-0 p-0 " src={logo} alt="logo" /> */}
        </Box>
        <Box>
          <Text fontWeight={"semibold"} mb={5}>
            Klantenservice
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={"/mijn-account"} passHref>
              Mijn Account
            </Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={"/veelgestelde-vragen"}>Veelgestelde vragen</Link>
          </Text>

          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={"/retourneren"}>Retourneren & Levertijd</Link>
          </Text>

          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={"/algemene-voorwaarden"}>Algemene Voorwaarden</Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={"/cookies"}>Cookiebeleid</Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={"/contact"} passHref>
              Contact
            </Link>
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"semibold"} mb={5}>
            Categorieën
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={`/category/Fashion`} passHref>
              Fashion
            </Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={`/category/Tuin`} passHref>
              Tuin
            </Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={`/category/Huisdieren`} passHref>
              Huisdieren
            </Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={`/category/Sport`} passHref>
              Sport
            </Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={`/category/Wonen`} passHref>
              {" "}
              Wonen
            </Link>
          </Text>
          <Text
            lineHeight={1.7}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            <Link href={`/category/Huishouden`} passHref>
              Huishouden
            </Link>
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"semibold"} mb={5}>
            Schrijf je in voor onze nieuwsbrief!
          </Text>
          <Text lineHeight={1.7} mb={3}>
            Als eerst op de hoogte van onze nieuwste artikelen.
          </Text>
          <Box>
            <InputGroup>
              <Input
                type="email"
                placeholder="E-mail Adres"
                bgColor={"white"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <InputRightAddon p={0} borderRadius={"6px"} bgColor={"#febd00"}>
                <Button
                  bgColor={"black"}
                  color={"white"}
                  w={"100%"}
                  onClick={handleSubscribe}
                >
                  Aanmelden
                </Button>
              </InputRightAddon>
            </InputGroup>
          </Box>
          <Text fontWeight={"semibold"} mt={5} lineHeight={1.7}>
            Volg ons op social media
          </Text>
          <HStack mt={3}>
            <TiSocialFacebook size={"24px"} cursor={"pointer"} />
            <TiSocialInstagram size={"24px"} cursor={"pointer"} />
            <TiSocialTwitter size={"24px"} cursor={"pointer"} />
          </HStack>
        </Box>
      </HStack>
      <Box
        p={5}
        px={10}
        borderTop={"1px solid #febd00"}
        className=" bg-gray-300 text-#677279 flex items-center justify-center gap-4"
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <p className="text-sm text-start">All rights reserved Orion Home</p>
        <HStack spacing={"12px"}>
          <Image src={ideal} alt="logo" width={50} height={50} />
          <Image src={visa} alt="logo" width={50} height={50} />
          <Image src={mastercard} alt="logo" width={50} height={50} />
          <Image src={applepay} alt="logo" width={50} height={50} />
          <Image src={paypal} alt="logo" width={50} height={50} />
          <Image src={googlepay} alt="logo" width={50} height={50} />
        </HStack>
      </Box>
    </div>
  );
};

export default Footer;
