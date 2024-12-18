import {
  Button,
  Divider,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// i am creating a login page for the user to login wit chakra ui, this login page as to be responseive

const ForgotPassword = ({ setProcess }: { setProcess: any }) => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/forgot-password", {
        email,
      });
      toast({
        description:
          "We hebben een link naar uw e-mailadres gestuurd om uw wachtwoord opnieuw in te stellen. Als u geen e-mail heeft ontvangen, controleer dan de door u ingevoerde gegevens en probeer het opnieuw!",
        status: "success",
        duration: 15000,
        isClosable: true,
        position: "top",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: "Er is iets fout gegaan. Probeer het opnieuw!",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <VStack
        // w={"100%"}
        h={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          w={"100%"}
          fontSize={"large"}
          fontWeight={"semibold"}
          mb={5}
          textAlign={"center"}
        >
          Stel je wachtwoord opnieuw in
        </Text>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Email"
            type="email"
            mb={4}
            required
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <Button w={"100%"} bgColor={"#20a2c6"} type="submit">
            Versturen
          </Button>
        </form>
        <Divider lineHeight={"10px"} />

        <Button
          w={"100%"}
          onClick={() => setProcess("sign-in")}
          colorScheme="yellow"
        >
          Log in
        </Button>
      </VStack>
    </Stack>
  );
};

export default ForgotPassword;
