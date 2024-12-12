import Accountgegevens from "@/components/MijnAccount/AccountGegevens.";
import Adresgegevens from "@/components/MijnAccount/Adresgegevens";
import Bestellingen from "@/components/MijnAccount/Bestellingen";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MijnAccount = () => {
  const [active, setActive] = useState("Accountgegevens");
  const { userInfo } = useSelector((state: any) => state.next);
  const router = useRouter();

  useEffect(() => {
    if (router.query?.bestellingen === "") {
      setActive("Bestellingen");
    }
  }, [router.query]);

  // check the user is logged in or not. If not, redirect to login page
  if (!userInfo) {
    router.push("/inloggen");
    return <div></div>;
  }

  return (
    <Stack w={"100%"}>
      <HStack
        h={"100%"}
        display={"flex"}
        alignItems={"center"}
        w={"100%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <VStack display={"flex"} alignItems={"center"} w={{ lg: "15%" }}>
          <Text fontSize={"24px"} fontWeight={"bold"} mb={5}>
            Hallo, {userInfo?.firstname} {userInfo?.lastname}
          </Text>
          <Button
            w={"100%"}
            justifyContent={"flex-start"}
            onClick={(e) => setActive(e.currentTarget.innerText.trim())}
            bgColor={active === "Accountgegevens" ? "#febd00" : "whitesmoke"}
            _hover={{ bgColor: "#febd00" }}
          >
            Accountgegevens
          </Button>
          <Button
            w={"100%"}
            justifyContent={"flex-start"}
            onClick={(e) => setActive(e.currentTarget.innerText.trim())}
            bgColor={active === "Bestellingen" ? "#febd00" : "whitesmoke"}
            _hover={{ bgColor: "#febd00" }}
          >
            Bestellingen
          </Button>
          <Button
            w={"100%"}
            justifyContent={"flex-start"}
            onClick={(e) => setActive(e.currentTarget.innerText.trim())}
            bgColor={active === "Adresgegevens" ? "#febd00" : "whitesmoke"}
            _hover={{ bgColor: "#febd00" }}
          >
            Adresgegevens
          </Button>
          <Button
            w={"100%"}
            justifyContent={"flex-start"}
            bgColor={active === "Uitloggen" ? "#febd00" : "whitesmoke"}
            _hover={{ bgColor: "#febd00" }}
          >
            Uitloggen
          </Button>
        </VStack>
        <VStack w={{ lg: "60%" }} p={2}>
          {active === "Accountgegevens" && <Accountgegevens checkout={false} />}
          {active === "Adresgegevens" && <Adresgegevens checkout={false} />}
          {active === "Bestellingen" && <Bestellingen />}
        </VStack>
      </HStack>
    </Stack>
  );
};

export default MijnAccount;
