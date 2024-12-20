import { StateProps } from "../../../type";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react";

const BottomHeader = () => {
  const { categories } = useSelector((state: StateProps) => state.next);

  return (
    <div className="w-full h-10 bg-white text-sm text-black px-4 flex items-center justify-evenly hidden sm:hidden md:inline-flex mb-1">
      <Stack
        w={{ base: "100%", md: "86.5%" }}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        className="border-b border-gray-300 "
        alignItems={"center"}
      >
        <HStack spacing={"0px"}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon color={"black"} />}
              colorScheme="transparent"
            />
            <MenuList zIndex={50}>
              {categories?.length > 0 &&
                categories?.map((category: any, id: number) => (
                  <MenuItem key={"menu items " + id} textColor={"black"}>
                    <Link
                      passHref
                      key={"category " + id}
                      href={`/category/${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </MenuItem>
                ))}
            </MenuList>
            <Link href={"/all-products"}>Alle</Link>
          </Menu>
        </HStack>
        {categories?.length > 0 &&
          categories.slice(0, 7)?.map((category: any, id: number) => (
            <Link
              passHref
              key={"category " + id}
              href={`/category/${category.name}`}
            >
              <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-gray cursor-pointer duration-300">
                {category.name}
              </p>
            </Link>
          ))}
      </Stack>
    </div>
  );
};

export default BottomHeader;
