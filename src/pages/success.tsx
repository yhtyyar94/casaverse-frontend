import { resetCart } from "@/store/nextSlice";
import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
const SuccessPage = () => {
  const dispatch = useDispatch();
  dispatch(resetCart());
  return (
    <div className="flex sm:h-[80vh] lg:h-[80vh] flex-col gap-2 items-center justify-center py-20">
      <h1
        className="text-2xl text-hoverBg font-semibold"
        style={{ color: "green" }}
      >
        Uw bestelling is succesvol ontvangen
      </h1>
      <Text w={{ lg: "40%" }} fontSize={"18px"} textAlign={"justify"}>
        Hartelijk dank voor uw aankoop bij Casa Verse. We waarderen uw
        vertrouwen in onze producten. <br /> Uw bestelling is succesvol
        ontvangen en wordt nu verwerkt. Zodra uw bestelling is verzonden,
        ontvangt u een e-mail met de trackinginformatie. <br /> Als u nog vragen
        heeft, neem dan gerust contact met ons op. We staan klaar om u te
        helpen!
      </Text>
      <Link
        passHref
        className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
        href={"/"}
      >
        <Button
          bgColor={"#febd00"}
          _hover={{ color: "white", bgColor: "#22c35e" }}
        >
          Doorgaan met winkelen
        </Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
