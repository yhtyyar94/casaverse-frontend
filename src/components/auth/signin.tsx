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

const SignIn = ({ setProcess }: { setProcess: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const username = email.split("@")[0];
      const res = await axios.post("/api/signin", {
        username,
        password,
      });

      dispatch(addUser({ ...res.data?.user, address: res.data?.address }));
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
          Log in op uw account
        </Text>
        <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Email"
            type="email"
            mb={4}
            required
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <Input
            placeholder="Wachtwoord"
            type="password"
            required
            mb={2}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Text
            w={"100%"}
            textAlign={"end"}
            mb={4}
            fontSize={"14px"}
            onClick={() => setProcess("forgot-password")}
            cursor={"pointer"}
            color={"gray"}
          >
            Wachtwoord vergeten?
          </Text>
          <Button w={"100%"} bgColor={"#febd00"} type="submit">
            Log in
          </Button>
        </form>
        <Divider lineHeight={"10px"} />

        <Button
          w={"100%"}
          onClick={() => setProcess("sign-up")}
          colorScheme="yellow"
        >
          Register
        </Button>
      </VStack>
    </Stack>
  );
};

export default SignIn;
