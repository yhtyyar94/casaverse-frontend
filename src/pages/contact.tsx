import {
  Button,
  Divider,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { StateProps } from "../../type";

const Contact = ({ checkout }: { checkout: boolean }) => {
  const { userInfo } = useSelector((state: StateProps) => state.next);
  const [name, setName] = useState(userInfo?.firstname);
  const [lastname, setLastname] = useState(userInfo?.lastname);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.phone ? userInfo?.phone : "");
  const [message, setMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/contact",
        {
          name: `${name} ${lastname}`,
          email: email,
          phone: phone,
          message: message,
          order_number: orderNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        toast({
          title: "Success",
          description: "Uw bericht is verzonden",
          status: "success",
          duration: 10000,
          isClosable: true,
          position: "top",
        });
        setLastname("");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setOrderNumber("");
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.data?.message) {
        toast({
          title: "Error",
          description: error.response?.data?.message,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top",
        });

        return;
      } else {
        toast({
          title: "Error",
          description: "Er is iets fout gegaan",
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    }
  };

  return (
    <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <VStack w={{ sm: "80%", md: "60%" }} mx={{ base: 5, sm: 5, md: 0 }}>
        <Text fontSize={"24px"} fontWeight={"bold"} mt={5} mb={10}>
          Contact
        </Text>

        <Text fontSize={"20px"} fontWeight={"semibold"}>
          Heeft u een vraag? Neem contact met ons op.
        </Text>
        <Text fontSize={"14px"} textAlign={"center"}>
          Mocht u vragen hebben, extra informatie willen of problemen ervaren
          kunt u ons op weekdagen telefonisch bereiken van 09.00 tot 17.00 uur.
          Wij zullen proberen om u zo snel mogelijk te woord te staan.
        </Text>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormLabel mb={1}>Voornaam</FormLabel>
          <Input
            placeholder="Voornaam"
            type="text"
            mb={3}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormLabel mb={1}>Achternaam</FormLabel>
          <Input
            placeholder="Achternaam"
            type="text"
            mb={3}
            defaultValue={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <FormLabel mb={1}>Email</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            mb={3}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormLabel mb={1}>Bestelnummer</FormLabel>
          <Input
            placeholder="Bestelnummer"
            type="text"
            mb={3}
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormLabel mb={1}>Telefoonnummer</FormLabel>
          <Input
            placeholder="Telefoonnummer"
            type="text"
            mb={3}
            defaultValue={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <FormLabel mb={1}>Uw bericht</FormLabel>
          <Textarea
            placeholder="Uw bericht"
            mb={3}
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <Button
            type="submit"
            mb={3}
            w={"100%"}
            bgColor={"#febd00"}
            _hover={{ bgColor: "#22c35e", color: "white" }}
          >
            Verzenden
          </Button>
        </form>
      </VStack>
    </Stack>
  );
};

export default Contact;
