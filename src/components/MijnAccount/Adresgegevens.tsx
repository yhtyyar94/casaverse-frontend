import {
  Button,
  Divider,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../../type";
import { useState } from "react";
import axios from "axios";
import { addUser } from "@/store/nextSlice";

const Adresgegevens = ({ checkout }: { checkout: boolean }) => {
  const { userInfo } = useSelector((state: StateProps) => state.next);
  const [street_name, setStreet_name] = useState(
    userInfo?.address?.attributes?.street_name
  );
  const [house_number, setHouse_number] = useState(
    userInfo?.address?.attributes?.house_number
  );
  const [postal_code, setPostal_code] = useState(
    userInfo?.address?.attributes?.postal_code
  );
  const [city, setCity] = useState(userInfo?.address?.attributes?.city);
  const [country, setCountry] = useState(
    userInfo?.address?.attributes?.country
  );

  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/address`, {
        street_name,
        house_number,
        postal_code,
        city,
        country,
        id: userInfo?.address?.id,
      });
      dispatch(addUser({ ...userInfo, address: res.data?.data }));
      toast({
        description: "Uw adresgegevens zijn succesvol aangepast.",
        status: "success",
        duration: 5000,
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
      <VStack w={"100%"}>
        {!checkout && (
          <Text
            textAlign={"center"}
            fontSize={"24px"}
            fontWeight={"bold"}
            mb={5}
          >
            Adresgegevens
          </Text>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormLabel mb={1}>Straatnaam</FormLabel>
          <Input
            placeholder="Straatnaam"
            type="text"
            mb={3}
            defaultValue={street_name}
            onChange={(e) => setStreet_name(e.target.value)}
            required
            _placeholder={{ fontSize: "small" }}
            name="street name"
          />
          <FormLabel mb={1}>Huisnummer</FormLabel>
          <Input
            placeholder="Huistnummer"
            type="text"
            mb={3}
            defaultValue={house_number}
            onChange={(e) => setHouse_number(e.target.value)}
            required
            _placeholder={{ fontSize: "small" }}
            name="house number"
          />
          <FormLabel mb={1}>Postcode</FormLabel>
          <Input
            placeholder="Postcode"
            type="text"
            mb={3}
            defaultValue={postal_code}
            onChange={(e) => setPostal_code(e.target.value)}
            required
            _placeholder={{ fontSize: "small" }}
            name="postal code"
          />
          <FormLabel mb={1}>Stad</FormLabel>
          <Input
            placeholder="Stad"
            type="text"
            mb={3}
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            required
            _placeholder={{ fontSize: "small" }}
            name="city"
          />
          {/* country has to be select element and it has to have 2 options Nederland and Belgie */}
          <FormLabel mb={1}>Land</FormLabel>
          <Select
            placeholder="Land"
            mb={3}
            required
            _placeholder={{ fontSize: "small" }}
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
          >
            <option value="Nederland">Nederland</option>
            <option value="Belgie">Belgie</option>
          </Select>

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

export default Adresgegevens;
