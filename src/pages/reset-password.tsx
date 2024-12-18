import { addUser } from "@/store/nextSlice";
import {
  Button,
  Divider,
  FormControl,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

// i am creating a login page for the user to login wit chakra ui, this login page as to be responseive

const ResetPassword = ({ setProcess }: { setProcess: any }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/reset-password",
        {
          code: router.query.code,
          password,
          passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        description: "Uw wachtwoord is succesvol opnieuw ingesteld.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        router.push("/inloggen");
      }, 5000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast({
          title: "Error",
          description: error.response?.data?.message,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error",
          description: "Er is iets fout gegaan. Probeer het opnieuw!",
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  if (!router?.query?.code) {
    return (
      <Stack
        h={"100vh"}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"}>
          Er is iets fout gegaan. Probeer het opnieuw!
        </Text>
      </Stack>
    );
  }

  return (
    <Stack
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack
        w={{ base: "100%", md: "50%", lg: "30%", xl: "20%" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"whitesmoke"}
        borderRadius={"5px"}
        boxShadow={"lg"}
        p={5}
      >
        <Text
          w={"100%"}
          fontSize={"large"}
          fontWeight={"semibold"}
          mb={5}
          textAlign={"center"}
        >
          Stel een nieuw wachtwoord in
        </Text>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="password"
            placeholder="Wachtwoord"
            onChange={(e) => setPassword(e.target.value)}
            mb={4}
            required
            name="password"
          />
          <Input
            type="password"
            placeholder="Bevestig uw wachtwoord"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            mb={4}
            required
            name="passwordConfirmation"
          />

          <Button w={"100%"} bgColor={"#20a2c6"} type="submit">
            Opnieuw instellen
          </Button>
        </form>
      </VStack>
    </Stack>
  );
};

export default ResetPassword;
