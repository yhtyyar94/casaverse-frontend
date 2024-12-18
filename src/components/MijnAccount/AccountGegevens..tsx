import {
  Button,
  Divider,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { StateProps } from "../../../type";
import { useState } from "react";
import axios from "axios";

const Accountgegevens = ({ checkout }: { checkout: boolean }) => {
  const { userInfo } = useSelector((state: StateProps) => state.next);
  const [firstname, setFirstname] = useState(userInfo?.firstname);
  const [lastname, setLastname] = useState(userInfo?.lastname);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.phone ? userInfo?.phone : "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== "" && newPassword !== "" && confirmPassword !== "") {
      if (newPassword !== confirmPassword) {
        toast({
          title: "Error",
          description: "Wachtwoorden komen niet overeen",
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      // check if password is correct
      try {
        const username = email.split("@")[0];
        await axios.post("/api/signin", {
          username,
          password,
        });
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
          return;
        } else {
          toast({
            title: "Error",
            description: "Er is iets fout gegaan. Probeer het opnieuw!",
            status: "error",
            duration: 10000,
            isClosable: true,
            position: "top",
          });
          return;
        }
      }
    }
    try {
      if (password === "") {
        await axios.post("/api/change-account-details", {
          firstname,
          lastname,
          email,
          phone,
          id: userInfo?.id,
        });
      } else {
        await axios.post("/api/change-account-details", {
          firstname,
          lastname,
          email,
          phone,
          id: userInfo?.id,
          password: newPassword,
        });
      }

      toast({
        title: "Succes",
        description: "Accountgegevens zijn succesvol gewijzigd",
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
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
    <Stack w={{ sm: "80%", lg: "60%" }}>
      <VStack>
        {!checkout && (
          <Text fontSize={"24px"} fontWeight={"bold"} mb={5}>
            Accountgegevens
          </Text>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormLabel mb={1}>Voornaam</FormLabel>
          <Input
            placeholder="Voornaam"
            type="text"
            mb={3}
            defaultValue={firstname}
            onChange={(e) => setFirstname(e.target.value)}
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
          <FormLabel mb={1}>Telefoonnummer</FormLabel>
          <Input
            placeholder="Telefoonnummer"
            type="text"
            mb={3}
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {!checkout && (
            <>
              <Text
                textAlign={"center"}
                fontSize={"24px"}
                fontWeight={"bold"}
                mb={5}
              >
                Wachtwoord wijzigen
              </Text>
              <FormLabel mb={1}>Huidig wachtwoord</FormLabel>
              <Input
                placeholder="Huidig wachtwoord (laat leeg om niet te wijzigen)"
                type="password"
                mb={3}
                _placeholder={{ fontSize: "small" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormLabel mb={1}>Nieuw wachtwoord</FormLabel>
              <Input
                placeholder="Nieuw wachtwoord (laat leeg om niet te wijzigen)"
                type="password"
                mb={3}
                _placeholder={{ fontSize: "small" }}
                onChange={(e) => setNewPassword(e.target.value)}
                min={6}
              />
              <FormLabel mb={1}>Bevestig nieuw wachtwoord</FormLabel>
              <Input
                placeholder="Bevestig nieuw wachtwoord"
                type="password"
                mb={3}
                _placeholder={{ fontSize: "small" }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                min={6}
              />
            </>
          )}

          <Button
            type="submit"
            mb={3}
            w={"100%"}
            bgColor={"#20a2c6"}
            color={"white"}
            _hover={{ bgColor: "#2e849e", color: "white" }}
          >
            Opslaan
          </Button>
        </form>
      </VStack>
    </Stack>
  );
};

export default Accountgegevens;
