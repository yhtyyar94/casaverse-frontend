import { Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import SignIn from "@/components/auth/signin";
import SignUp from "@/components/auth/signup";
import ForgotPassword from "@/components/auth/forgotPassword";

// i am creating a login page for the user to login wit chakra ui, this login page as to be responseive

const Login = () => {
  const [process, setProcess] = useState<
    "sign-in" | "sign-up" | "forgot-password"
  >("sign-in");
  return (
    <Stack
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      shadow={"md"}
    >
      <VStack
        w={{ base: "100%", md: "70%", lg: "50%", xl: "30%" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // border={"1px solid gray"}
        // borderRadius={"10px"}
        p={5}
        bgColor={"white"}
        borderRadius={"5px"}
        boxShadow={"2xl"}
      >
        {process === "sign-in" && <SignIn setProcess={setProcess} />}

        {process === "sign-up" && <SignUp setProcess={setProcess} />}

        {process === "forgot-password" && (
          <ForgotPassword setProcess={setProcess} />
        )}
      </VStack>
    </Stack>
  );
};

export default Login;
