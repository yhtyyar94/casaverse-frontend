import { addUser } from "@/store/nextSlice";
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
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

// i am creating a login page for the user to login wit chakra ui, this login page as to be responseive

const SignUp = ({ setProcess }: { setProcess: any }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const username = email.split("@")[0];
      const res = await axios.post("/api/signup", {
        firstname,
        lastname,
        email,
        password,
        username,
      });
      dispatch(addUser(res.data));
      toast({
        description: "Uw account is succesvol aangemaakt.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      router.push("/");
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

  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <VStack
        w={"100%"}
        h={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text w={"100%"} fontSize={"large"} fontWeight={"semibold"} mb={5}>
          Registreer een account
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Voornaam"
            type="text"
            required
            mb={4}
            onChange={(e) => setFirstname(e.target.value)}
            name="firstname"
          />
          <Input
            placeholder="Achternaam"
            type="text"
            required
            mb={4}
            onChange={(e) => setLastname(e.target.value)}
            name="lastname"
          />
          <Input
            placeholder="Email"
            type="email"
            required
            mb={4}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <Input
            placeholder="Wachtwoord"
            type="password"
            required
            mb={4}
            onChange={(e) => setPassword(e.target.value)}
            min={6}
            name="password"
          />

          <Button type="submit" w={"100%"} bgColor={"#20a2c6"}>
            Register
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

export default SignUp;
